import { formatNumber, formatPercent } from '../../app/format'
import { stepNumber } from '../../app/steps'
import type { StepId } from '../../app/steps'
import { BASE_BASKET_DH } from '../../features/simulation/model/calculateBasket'
import type { BasketSimulationResult } from '../../features/simulation/model/calculateBasket'

type Stat = { label: string; value: string; hint: string }

type LessonHeaderProps = {
  step: StepId
  result: BasketSimulationResult
  isInitial: boolean
  onReset: () => void
}

const observerStats: Stat[] = [
  { label: 'Panier exemple', value: '240 DH', hint: 'votre choix' },
  { label: 'IPC national', value: 'Moyenne', hint: 'pondérée par le HCP' },
  { label: 'Source', value: 'HCP', hint: 'donnée officielle' },
  { label: 'Révision', value: '20 nov. 2026', hint: 'avant publication' },
]

const titles: Record<StepId, { title: string; lead: string }> = {
  observer: {
    title: 'Pourquoi mon panier devient-il plus cher ?',
    lead: 'Votre panier et l’indice des prix ne mesurent pas la même chose. Repérez qui publie quoi avant de manipuler des chiffres.',
  },
  manipuler: {
    title: 'Faites varier votre panier',
    lead: 'Chaque curseur modifie une hypothèse. Le résultat est une simulation pédagogique, pas une prévision.',
  },
}

export function LessonHeader({ step, result, isInitial, onReset }: LessonHeaderProps) {
  const current = titles[step]
  const number = stepNumber(step)
  const stats: Stat[] =
    step === 'observer'
      ? observerStats
      : [
          {
            label: 'Coût simulé',
            value: `${formatNumber(result.resultDh)} DH`,
            hint: `${BASE_BASKET_DH} DH au départ`,
          },
          {
            label: 'Variation',
            value: formatPercent(result.percentChange),
            hint: 'pondérée par les poids',
          },
          { label: 'Alimentation', value: '40 %', hint: 'du panier' },
          { label: 'Transport', value: '25 %', hint: 'du panier' },
        ]

  return (
    <header className="lesson-header" id="lesson">
      <nav className="breadcrumb" aria-label="Fil d’Ariane">
        <span>01. Prix et inflation</span>
        <span aria-hidden="true">/</span>
        <span>Étape {number} sur 2</span>
      </nav>

      <div className="lesson-title-row">
        <div>
          <h1>{current.title}</h1>
          <p className="lesson-lead">{current.lead}</p>
        </div>
        <div className="lesson-meta">
          <span className="meta-chip">6 min</span>
          <span className="meta-chip">Débutant</span>
          <span className="meta-chip">Étape {number} / 2</span>
        </div>
      </div>

      <section className="stat-strip" aria-label="Chiffres de l’étape">
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
              Réinitialiser
            </button>
          </div>
        )}
      </section>
    </header>
  )
}
