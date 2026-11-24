import { useEffect, useState } from 'react'
import { readStepFromUrl, writeStepToUrl } from '../app/route'
import { applyTheme, readTheme } from '../shared/theme'
import type { Theme } from '../shared/theme'
import type { StepId } from '../shared/steps'
import { Topbar } from '../components/layout/Topbar'
import { CourseNav } from '../components/layout/CourseNav'
import { InfoDialog } from '../components/layout/InfoDialog'
import type { InfoKind } from '../components/layout/InfoDialog'
import { LessonHeader } from '../components/layout/LessonHeader'
import { LessonStepper } from '../components/layout/LessonStepper'
import { StepPanel } from '../components/layout/StepPanel'
import { TutorDock } from '../components/layout/TutorDock'
import { PriceStage } from '../features/prices/components/PriceStage'
import { BasketStage } from '../features/simulation/components/BasketStage'
import { useBasketSimulation } from '../features/simulation/model/useBasketSimulation'
import { fr } from '../content/locales/fr'
import { STEPS } from '../shared/steps'
import { InterpretStage } from '../features/lesson/components/InterpretStage'
import { SynthesisStage } from '../features/lesson/components/SynthesisStage'
import { useLearningProgress } from '../features/lesson/model/useLearningProgress'

export function App() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [step, setStep] = useState<StepId>(() => readStepFromUrl(window.location.search) ?? 'observer')
  const [navOpen, setNavOpen] = useState(false)
  const [tutorOpen, setTutorOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState<InfoKind | null>(null)
  const basket = useBasketSimulation()
  const learning = useLearningProgress()

  useEffect(() => {
    writeStepToUrl(step)
  }, [step])

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  function selectStep(next: StepId) {
    const currentIndex = STEPS.findIndex((item) => item.id === step)
    const nextIndex = STEPS.findIndex((item) => item.id === next)
    if (nextIndex === currentIndex + 1) {
      learning.record({ type: 'step_completed', stepId: step, conceptIds: ['inflation', 'ipc'] })
    }
    setStep(next)
    setNavOpen(false)
    document.getElementById('lesson')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function restart() {
    basket.reset()
    selectStep('observer')
  }

  return (
    <div className="app">
      <a className="skip-link" href="#lesson">{fr.app.skipToContent}</a>

      <Topbar
        step={step}
        navOpen={navOpen}
        theme={theme}
        onSelectStep={selectStep}
        onOpenNav={() => setNavOpen(true)}
        onThemeToggle={toggleTheme}
        onOpenInfo={setInfoOpen}
      />

      <div className="shell">
        <CourseNav
          step={step}
          open={navOpen}
          onSelectStep={selectStep}
          onClose={() => setNavOpen(false)}
        />

        <main className="lesson-column">
          <LessonHeader
            step={step}
            result={basket.result}
            isInitial={basket.isInitial}
            onReset={basket.reset}
          />

          {step === 'observer' ? (
            <PriceStage />
          ) : step === 'manipuler' ? (
            <BasketStage
              variant={basket.variant}
              breakdown={basket.breakdown}
              totalDh={basket.result.resultDh}
              onChange={(field, value) => {
                basket.setField(field, value)
                learning.record({ type: 'hypothesis_changed', field, value })
              }}
              onUseOctober2026Scenario={basket.useOctober2026Scenario}
              scenarioMode={basket.scenarioMode}
            />
          ) : step === 'interpreter' ? (
            <InterpretStage onAnswer={learning.record} />
          ) : (
            <SynthesisStage
              events={learning.events}
              onFinish={() => learning.record({ type: 'step_completed', stepId: 'synthese', conceptIds: ['inflation', 'ipc'] })}
            />
          )}

          <LessonStepper step={step} onSelectStep={selectStep} />
        </main>

        <StepPanel
          step={step}
          onSelectStep={selectStep}
          onRestart={restart}
          onOpenTutor={() => setTutorOpen(true)}
        />
      </div>

      <TutorDock
        open={tutorOpen}
        onOpen={() => setTutorOpen(true)}
        onClose={() => setTutorOpen(false)}
        onAbstention={() => learning.record({ type: 'tutor_abstention', reason: 'outside_corpus' })}
      />

      {infoOpen && <InfoDialog kind={infoOpen} onClose={() => setInfoOpen(null)} />}
    </div>
  )
}
