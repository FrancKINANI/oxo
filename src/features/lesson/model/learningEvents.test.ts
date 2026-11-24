// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { LEARNING_STORAGE_KEY, readLearningEvents, recordLearningEvent, summarizeQuizProgress } from './learningEvents'

beforeEach(() => localStorage.removeItem(LEARNING_STORAGE_KEY))

describe('progression locale', () => {
  it('versionne et relit les événements autorisés', () => {
    recordLearningEvent({ type: 'step_completed', stepId: 'observer', conceptIds: ['inflation', 'ipc'] })
    recordLearningEvent({ type: 'quiz_answered', itemId: 'q1', choiceId: 'c1', correct: false, misconceptionId: 'isolated-price' })

    const stored = JSON.parse(localStorage.getItem(LEARNING_STORAGE_KEY) ?? '{}')
    expect(stored.version).toBe(1)
    expect(readLearningEvents()).toHaveLength(2)
    expect(readLearningEvents()[1]).toMatchObject({ type: 'quiz_answered', misconceptionId: 'isolated-price' })
  })

  it('ignore et supprime un état local invalide sans interrompre la lecture', () => {
    localStorage.setItem(LEARNING_STORAGE_KEY, '{ json invalide')
    expect(readLearningEvents()).toEqual([])
    expect(localStorage.getItem(LEARNING_STORAGE_KEY)).toBeNull()

    localStorage.setItem(LEARNING_STORAGE_KEY, JSON.stringify({ version: 2, events: [] }))
    expect(readLearningEvents()).toEqual([])
    expect(localStorage.getItem(LEARNING_STORAGE_KEY)).toBeNull()
  })

  it('compte la dernière réponse et place les erreurs dans la file à revoir', () => {
    const events = [
      { type: 'quiz_answered', itemId: 'q1', choiceId: 'wrong', correct: false, misconceptionId: 'm1', occurredAt: '2026-11-24T10:00:00.000Z' },
      { type: 'quiz_answered', itemId: 'q1', choiceId: 'right', correct: true, misconceptionId: null, occurredAt: '2026-11-24T10:01:00.000Z' },
      { type: 'quiz_answered', itemId: 'q2', choiceId: 'wrong', correct: false, misconceptionId: 'm2', occurredAt: '2026-11-24T10:02:00.000Z' },
    ] as const

    expect(summarizeQuizProgress([...events], ['q1', 'q2', 'q3'])).toEqual({
      passed: 1,
      toReview: ['q2'],
      unanswered: ['q3'],
    })
  })
})
