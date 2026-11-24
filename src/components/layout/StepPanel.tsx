import { formatDate } from '../../shared/format'
import { stepNumber } from '../../shared/steps'
import type { StepId } from '../../shared/steps'
import { lessonMeta, primarySource, steps } from '../../content/lesson'

type StepPanelProps = {
  step: StepId
  onSelectStep: (step: StepId) => void
  onRestart: () => void
  onOpenTutor: () => void
}

const pills: Record<StepId, string> = {
  observer: 'Observer',
  manipuler: 'Manipuler',
}

export function StepPanel({ step, onSelectStep, onRestart, onOpenTutor }: StepPanelProps) {
  const current = steps[step]
  const number = stepNumber(step)

  return (
    <aside className="step-panel" aria-labelledby="step-panel-title">
      <div className="step-panel-head">
        <span className="step-panel-kicker">Étape {number} / 2</span>
        <span className="pill">{pills[step]}</span>
      </div>

      <h2 id="step-panel-title">{current.narration.title}</h2>
      <p className="step-panel-body">{current.narration.body}</p>

      <div className="key-idea">
        <span className="key-idea-label">✦ Idée clé</span>
        <p>{current.narration.keyIdea}</p>
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
          {current.narration.learn.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="panel-source">
        <span className="stat-label">Source principale</span>
        <p>
          <strong>{primarySource.publisher}</strong> — {primarySource.title}
        </p>
        <small>
          Référence : {primarySource.referencePeriod} · vérifiée le{' '}
          {formatDate(primarySource.checkedAt)}
        </small>
        <small>Publiée le {formatDate(primarySource.publicationDate)} · snapshot {primarySource.snapshotId}</small>
        <small>Révision éditoriale : {formatDate(lessonMeta.revision)}</small>
        <a href={primarySource.url} target="_blank" rel="noopener noreferrer">
          Consulter la source
        </a>
      </div>
    </aside>
  )
}
