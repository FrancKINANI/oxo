import { formatNumber, formatPercent } from '../../shared/format'
import { STEPS, stepNumber } from '../../shared/steps'
import type { StepId } from '../../shared/steps'
import { lessonMeta, steps } from '../../content/lesson'
import type { StatContent } from '../../content/lesson'
import { BASE_BASKET_DH } from '../../features/simulation/model/calculateBasket'
import type { BasketSimulationResult } from '../../features/simulation/model/calculateBasket'
import { fr } from '../../content/locales/fr'

type LessonHeaderProps = {
  step: StepId
  result: BasketSimulationResult
  isInitial: boolean
  onReset: () => void
}

export function LessonHeader({ step, result, isInitial, onReset }: LessonHeaderProps) {
  const current = steps[step]
  const number = stepNumber(step)

  const stats: StatContent[] =
    current.stats ??
    [
      {
        label: fr.lesson.simulatedCost,
        value: `${formatNumber(result.resultDh)} DH`,
        hint: fr.lesson.startingAmount(BASE_BASKET_DH),
      },
      {
        label: fr.lesson.variation,
        value: formatPercent(result.percentChange),
        hint: fr.lesson.weighted,
      },
      { label: fr.lesson.food, value: '40 %', hint: fr.lesson.basket },
      { label: fr.lesson.transport, value: '25 %', hint: fr.lesson.basket },
    ]

  return (
    <header className="lesson-header" id="lesson">
      <nav className="breadcrumb" aria-label={fr.lesson.breadcrumb}>
        <span>{lessonMeta.moduleIndex}. {lessonMeta.moduleTitle}</span>
        <span aria-hidden="true">/</span>
          <span>{fr.lesson.stepOf(number, STEPS.length)}</span>
      </nav>

      <div className="lesson-title-row">
        <div>
          <h1>{current.title}</h1>
          <p className="lesson-lead">{current.lead}</p>
        </div>
        <div className="lesson-meta">
          <span className="meta-chip">{current.durationMinutes} min</span>
          <span className="meta-chip">{current.level}</span>
          <span className="meta-chip">{fr.lesson.stepSlash(number, STEPS.length)}</span>
        </div>
      </div>

      <section className="stat-strip" aria-label={fr.lesson.statStrip}>
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span className="stat-label">{stat.label}</span>
            <strong className="stat-value">{stat.value}</strong>
            <span className="stat-hint">{stat.hint}</span>
          </div>
        ))}
        {step === 'manipuler' && (
          <div className="stat-reset">
            <button className="ghost-button" type="button" onClick={onReset} disabled={isInitial}>
              {fr.lesson.reset}
            </button>
          </div>
        )}
      </section>
    </header>
  )
}
