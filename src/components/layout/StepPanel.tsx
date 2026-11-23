import { stepNumber } from '../../app/steps'
import type { StepId } from '../../app/steps'

type StepPanelProps = {
  step: StepId
  onSelectStep: (step: StepId) => void
  onRestart: () => void
  onOpenTutor: () => void
}

const content: Record<StepId, {
  pill: string
  title: string
  body: string
  keyIdea: string
  learn: string[]
}> = {
  observer: {
    pill: 'Observer',
    title: 'Deux mesures, deux usages',
    body: 'Votre panier décrit ce que vous achetez, aux prix que vous payez. L’IPC décrit l’évolution moyenne des prix pour une sélection représentative de ménages, avec des poids publiés par le HCP. Une hausse de votre panier ne prouve donc pas, à elle seule, une hausse générale des prix.',
    keyIdea: 'Votre panier est un cas particulier. L’IPC est une moyenne nationale pondérée.',
    learn: [
      'Distinguer votre panier de l’IPC',
      'Reconnaître une donnée observée d’une hypothèse',
      'Retrouver la source officielle',
    ],
  },
  manipuler: {
    pill: 'Manipuler',
    title: 'Ce que fait chaque curseur',
    body: 'La variation s’applique à la part du poste dans le panier. Alimentation pèse 40 %, transport 25 %, logement 35 % : la même hausse ne produit donc pas le même effet selon le poste modifié.',
    keyIdea: 'Un poste lourd pèse plus qu’un poste léger, même à variation identique.',
    learn: [
      'Calculer une variation pondérée',
      'Voir l’effet d’un poids dans le panier',
      'Séparer hypothèse et donnée officielle',
    ],
  },
}

export function StepPanel({ step, onSelectStep, onRestart, onOpenTutor }: StepPanelProps) {
  const current = content[step]
  const number = stepNumber(step)

  return (
    <aside className="step-panel" aria-labelledby="step-panel-title">
      <div className="step-panel-head">
        <span className="step-panel-kicker">Étape {number} / 2</span>
        <span className="pill">{current.pill}</span>
      </div>

      <h2 id="step-panel-title">{current.title}</h2>
      <p className="step-panel-body">{current.body}</p>

      <div className="key-idea">
        <span className="key-idea-label">✦ Idée clé</span>
        <p>{current.keyIdea}</p>
      </div>

      <div className="step-actions">
        <button
          className="ghost-button"
          type="button"
          disabled={number === 1}
          onClick={() => onSelectStep('observer')}
        >
          ← Précédent
        </button>
        {number === 1 ? (
          <button className="primary-button" type="button" onClick={() => onSelectStep('manipuler')}>
            Suivant →
          </button>
        ) : (
          <button className="primary-button" type="button" onClick={onRestart}>
            Recommencer
          </button>
        )}
      </div>

      <button className="tutor-cta" type="button" onClick={onOpenTutor}>
        <span aria-hidden="true">✦</span> Demander au tuteur
      </button>

      <section className="youll-learn">
        <h3>Vous allez apprendre</h3>
        <ul>
          {current.learn.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="panel-source">
        <span className="stat-label">Source principale</span>
        <p>
          <strong>Haut-Commissariat au Plan</strong> — Indices des prix à la consommation
        </p>
        <small>Référence : novembre 2026 · à vérifier avant publication</small>
        <a
          href="https://www.hcp.ma/Indices-des-prix-a-la-consommation-IPC_r348.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consulter la source
        </a>
      </div>
    </aside>
  )
}
