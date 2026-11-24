import { dataSnapshots } from '../../../content/dataSnapshots'
import { lessonManifest } from '../../../content/lessonManifest'
import { steps } from '../../../content/lesson'
import { primarySource } from '../../../content/lesson'
import { fr } from '../../../content/locales/fr'
import type { LearningEvent } from '../model/learningEvents'
import { summarizeQuizProgress } from '../model/learningEvents'

type SynthesisStageProps = { events: LearningEvent[]; onFinish: () => void }

export function SynthesisStage({ events, onFinish }: SynthesisStageProps) {
  const seenConcepts = new Set<string>()
  for (const event of events) {
    if (event.type === 'step_completed') event.conceptIds.forEach((id) => seenConcepts.add(id))
  }
  const quizProgress = summarizeQuizProgress(events, lessonManifest.quiz.map((item) => item.id))
  const completed = events.some((event) => event.type === 'step_completed' && event.stepId === 'synthese')
  const snapshot = dataSnapshots[primarySource.snapshotId]

  return (
    <section className="stage learning-stage synthesis-stage" aria-labelledby="stage-title">
      <div className="stage-top">
        <span className="stage-label" id="stage-title">{fr.learning.synthesisTitle}</span>
        <span className="scenario-badge">{fr.learning.progressTitle}</span>
      </div>

      <article className="summary-card">
        <h2>{fr.learning.synthesisTitle}</h2>
        <p>{steps.synthese.narration.keyIdea}</p>
        <p>{lessonManifest.blocks.formalization.body}</p>
      </article>

      <article className="summary-card">
        <h2>{fr.learning.limitsTitle}</h2>
        <p>{lessonManifest.blocks.limits.body}</p>
      </article>

      <article className="summary-card source-summary">
        <h2>{fr.learning.sourcesTitle}</h2>
        <p><strong>{snapshot.publisher}</strong> — {snapshot.title}</p>
        <p>{fr.dialogs.referencePeriod} : {primarySource.referencePeriod} · {fr.dialogs.publicationDate} : {snapshot.publicationDate}</p>
        <a href={snapshot.url} target="_blank" rel="noopener noreferrer">{fr.learning.sourceLink}</a>
      </article>

      <article className="summary-card progress-summary">
        <h2>{fr.learning.progressTitle}</h2>
        <h3>{fr.learning.conceptsSeen}</h3>
        {seenConcepts.size ? (
          <ul>{[...seenConcepts].map((id) => <li key={id}>{fr.learning.conceptNames[id as keyof typeof fr.learning.conceptNames]}</li>)}</ul>
        ) : <p>{fr.learning.restartNote}</p>}

        <h3>{fr.learning.quizzesPassed}</h3>
        <p>{quizProgress.passed} / {lessonManifest.quiz.length}</p>

        <h3>{fr.learning.toReview}</h3>
        {quizProgress.toReview.length ? (
          <ul>{quizProgress.toReview.map((id) => <li key={id}>{lessonManifest.quiz.find((item) => item.id === id)?.prompt}</li>)}</ul>
        ) : <p>{fr.learning.noReview}</p>}

        <h3>{fr.learning.unanswered}</h3>
        {quizProgress.unanswered.length ? (
          <ul>{quizProgress.unanswered.map((id) => <li key={id}>{lessonManifest.quiz.find((item) => item.id === id)?.prompt}</li>)}</ul>
        ) : <p>{fr.learning.noReview}</p>}
      </article>

      <article className="summary-card">
        <h2>{fr.learning.nextTitle}</h2>
        <p>{fr.learning.nextBody}</p>
      </article>

      <div className="finish-row">
        <button className="primary-button" type="button" onClick={onFinish} disabled={completed}>
          {completed ? fr.learning.finished : fr.learning.finish}
        </button>
      </div>
    </section>
  )
}
