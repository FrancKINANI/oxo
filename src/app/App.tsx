import { useState } from 'react'
import { applyTheme, readTheme } from '../app/theme'
import type { Theme } from '../app/theme'
import type { StepId } from '../app/steps'
import { Topbar } from '../components/layout/Topbar'
import { CourseNav } from '../components/layout/CourseNav'
import { LessonHeader } from '../components/layout/LessonHeader'
import { LessonStepper } from '../components/layout/LessonStepper'
import { StepPanel } from '../components/layout/StepPanel'
import { TutorDock } from '../components/layout/TutorDock'
import { PriceStage } from '../features/prices/components/PriceStage'
import { BasketStage } from '../features/simulation/components/BasketStage'
import { useBasketSimulation } from '../features/simulation/model/useBasketSimulation'

export function App() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [step, setStep] = useState<StepId>('observer')
  const [navOpen, setNavOpen] = useState(false)
  const [tutorOpen, setTutorOpen] = useState(false)
  const basket = useBasketSimulation()

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  function selectStep(next: StepId) {
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
      <a className="skip-link" href="#lesson">Aller au contenu</a>

      <Topbar
        step={step}
        navOpen={navOpen}
        theme={theme}
        onSelectStep={selectStep}
        onOpenNav={() => setNavOpen(true)}
        onThemeToggle={toggleTheme}
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
          ) : (
            <BasketStage
              variant={basket.variant}
              breakdown={basket.breakdown}
              totalDh={basket.result.resultDh}
              onChange={basket.setField}
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
      />
    </div>
  )
}
