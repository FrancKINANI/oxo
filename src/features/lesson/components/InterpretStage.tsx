import { useState } from 'react'
import { lessonManifest } from '../../../content/lessonManifest'
import { fr } from '../../../content/locales/fr'
import type { LearningEventInput } from '../model/learningEvents'

type InterpretStageProps = { onAnswer: (event: LearningEventInput) => void }

function normalize(value: string) {
  return value.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function InterpretStage({ onAnswer }: InterpretStageProps) {
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState<Record<string, string>>({})
  const [reflection, setReflection] = useState('')
  const normalizedReflection = normalize(reflection)

  function verify(itemId: string) {
    const item = lessonManifest.quiz.find((question) => question.id === itemId)
    const choice = item?.choices.find((option) => option.id === selected[itemId])
    if (!item || !choice) return
    setChecked((current) => ({ ...current, [itemId]: choice.id }))
    onAnswer({
      type: 'quiz_answered', itemId, choiceId: choice.id, correct: choice.isCorrect,
      misconceptionId: choice.isCorrect ? null : choice.misconception,
    })
  }

  return (
    <section className="stage learning-stage" aria-labelledby="stage-title">
      <div className="stage-top">
        <span className="stage-label" id="stage-title">{fr.learning.checkAnswer}</span>
        <span className="scenario-badge">{fr.learning.quizCount(lessonManifest.quiz.length)}</span>
      </div>

      <div className="quiz-list">
        {lessonManifest.quiz.map((item, index) => {
          const selectedChoice = item.choices.find((choice) => choice.id === checked[item.id])
          return (
            <fieldset className="quiz-card" key={item.id}>
              <legend><span className="quiz-number">{index + 1}</span>{item.prompt}</legend>
              <div className="quiz-choices">
                {item.choices.map((choice) => (
                  <label className="quiz-choice" key={choice.id}>
                    <input
                      type="radio"
                      name={item.id}
                      value={choice.id}
                      checked={selected[item.id] === choice.id}
                      onChange={() => {
                        setSelected((current) => ({ ...current, [item.id]: choice.id }))
                        setChecked((current) => {
                          const next = { ...current }
                          delete next[item.id]
                          return next
                        })
                      }}
                    />
                    <span>{choice.text}</span>
                  </label>
                ))}
              </div>
              <button className="ghost-button quiz-check" type="button" onClick={() => verify(item.id)} disabled={!selected[item.id]}>
                {fr.learning.checkAnswer}
              </button>
              {selectedChoice && (
                <p className={`quiz-feedback ${selectedChoice.isCorrect ? 'is-correct' : 'is-review'}`} role="status">
                  <strong>{selectedChoice.isCorrect ? fr.learning.correct : fr.learning.toReview} </strong>{selectedChoice.feedback}
                </p>
              )}
            </fieldset>
          )
        })}
      </div>

      <section className="reflection-card" aria-labelledby="reflection-title">
        <h2 id="reflection-title">{fr.learning.reflectionTitle}</h2>
        <p>{lessonManifest.blocks.retrieval.body}</p>
        <label htmlFor="reflection-answer">{fr.learning.reflectionLabel}</label>
        <textarea
          id="reflection-answer"
          rows={4}
          maxLength={1000}
          value={reflection}
          onChange={(event) => setReflection(event.target.value)}
          placeholder={fr.learning.reflectionPlaceholder}
        />
        <p className="self-check-title">{fr.learning.selfCheck}</p>
        <ul className="self-check-list">
          {fr.learning.selfCheckWords.map((word) => {
            const found = normalizedReflection.includes(normalize(word))
            return <li key={word} className={found ? 'found' : ''}>{word} — {found ? fr.learning.selfCheckFound : fr.learning.selfCheckMissing}</li>
          })}
        </ul>
        <small>{fr.learning.reflectionPrivacy}</small>
      </section>
    </section>
  )
}
