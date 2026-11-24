import { formatDate } from '../../shared/format'
import { STEPS, stepNumber } from '../../shared/steps'
import type { StepId } from '../../shared/steps'
import { lessonMeta, primarySource, steps } from '../../content/lesson'
import { fr } from '../../content/locales/fr'

type StepPanelProps = {
  step: StepId
  onSelectStep: (step: StepId) => void
  onRestart: () => void
  onOpenTutor: () => void
}

export function StepPanel({ step, onSelectStep, onRestart, onOpenTutor }: StepPanelProps) {
  const current = steps[step]
  const number = stepNumber(step)
  const previous = STEPS[number - 2]?.id
  const next = STEPS[number]?.id

  return (
    <aside className="step-panel" aria-labelledby="step-panel-title">
      <div className="step-panel-head">
        <span className="step-panel-kicker">{fr.lesson.stepSlash(number, STEPS.length)}</span>
        <span className="pill">{STEPS[number - 1].label}</span>
      </div>

      <h2 id="step-panel-title">{current.narration.title}</h2>
      <p className="step-panel-body">{current.narration.body}</p>

      <div className="key-idea">
        <span className="key-idea-label">{fr.lesson.idea}</span>
        <p>{current.narration.keyIdea}</p>
      </div>

      <div className="step-actions">
        {previous && <button className="ghost-button" type="button" onClick={() => onSelectStep(previous)}>{fr.lesson.previous}</button>}
        {next ? (
          <button className="primary-button" type="button" onClick={() => onSelectStep(next)}>{fr.lesson.next}</button>
        ) : (
          <button className="primary-button" type="button" onClick={onRestart}>{fr.lesson.restart}</button>
        )}
      </div>

      <button className="tutor-cta" type="button" onClick={onOpenTutor}>
        <span aria-hidden="true">✦</span> {fr.lesson.askTutor}
      </button>

      <section className="youll-learn">
        <h3>{fr.lesson.learningOutcomes}</h3>
        <ul>
          {current.narration.learn.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="panel-source">
        <span className="stat-label">{fr.lesson.primarySource}</span>
        <p>
          <strong>{primarySource.publisher}</strong> — {primarySource.title}
        </p>
        <small>
          {fr.lesson.sourceReference} : {primarySource.referencePeriod} · {fr.lesson.sourceVerified}{' '}
          {formatDate(primarySource.checkedAt)}
        </small>
        <small>{fr.lesson.sourcePublished} {formatDate(primarySource.publicationDate)} · snapshot {primarySource.snapshotId}</small>
        <small>{fr.lesson.editorialRevision} : {formatDate(lessonMeta.revision)}</small>
        <a href={primarySource.url} target="_blank" rel="noopener noreferrer">
          {fr.lesson.consultSource}
        </a>
      </div>
    </aside>
  )
}
