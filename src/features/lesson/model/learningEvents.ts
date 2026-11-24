import type { ConceptId } from '../../../content/conceptGraph'
import type { StepId } from '../../../shared/steps'

export const LEARNING_STORAGE_KEY = 'oxo-learning-events-v1'
const STORE_VERSION = 1
const MAX_EVENTS = 500

export type LearningEventInput =
  | { type: 'step_completed'; stepId: StepId; conceptIds: ConceptId[] }
  | { type: 'quiz_answered'; itemId: string; choiceId: string; correct: boolean; misconceptionId: string | null }
  | { type: 'hypothesis_changed'; field: string; value: number }
  | { type: 'tutor_abstention'; reason: 'outside_corpus' }

export type LearningEvent = LearningEventInput & { occurredAt: string }

type LearningStore = { version: typeof STORE_VERSION; events: LearningEvent[] }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isLearningEvent(value: unknown): value is LearningEvent {
  if (!isRecord(value) || typeof value.occurredAt !== 'string' || !Number.isFinite(Date.parse(value.occurredAt))) return false
  switch (value.type) {
    case 'step_completed':
      return ['observer', 'manipuler', 'interpreter', 'synthese'].includes(String(value.stepId))
        && Array.isArray(value.conceptIds)
        && value.conceptIds.every((id) => id === 'inflation' || id === 'ipc')
    case 'quiz_answered':
      return typeof value.itemId === 'string' && typeof value.choiceId === 'string'
        && typeof value.correct === 'boolean'
        && (value.misconceptionId === null || typeof value.misconceptionId === 'string')
    case 'hypothesis_changed':
      return typeof value.field === 'string' && Number.isFinite(value.value)
    case 'tutor_abstention':
      return value.reason === 'outside_corpus'
    default:
      return false
  }
}

function storage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

export function readLearningEvents(): LearningEvent[] {
  const store = storage()
  if (!store) return []
  try {
    const raw = store.getItem(LEARNING_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!isRecord(parsed) || parsed.version !== STORE_VERSION || !Array.isArray(parsed.events) || !parsed.events.every(isLearningEvent)) {
      store.removeItem(LEARNING_STORAGE_KEY)
      return []
    }
    return parsed.events
  } catch {
    try { store.removeItem(LEARNING_STORAGE_KEY) } catch { /* Storage peut être désactivé. */ }
    return []
  }
}

export function recordLearningEvent(event: LearningEventInput): LearningEvent[] {
  const events = [...readLearningEvents(), { ...event, occurredAt: new Date().toISOString() } as LearningEvent].slice(-MAX_EVENTS)
  const store = storage()
  if (store) {
    try {
      const value: LearningStore = { version: STORE_VERSION, events }
      store.setItem(LEARNING_STORAGE_KEY, JSON.stringify(value))
    } catch { /* Une panne du stockage ne bloque pas la leçon. */ }
  }
  return events
}

export function summarizeQuizProgress(events: LearningEvent[], quizIds: string[]) {
  const latestAnswers = new Map<string, Extract<LearningEvent, { type: 'quiz_answered' }>>()
  for (const event of events) {
    if (event.type === 'quiz_answered') latestAnswers.set(event.itemId, event)
  }
  return {
    passed: [...latestAnswers.values()].filter((answer) => answer.correct).length,
    toReview: quizIds.filter((id) => latestAnswers.get(id)?.correct === false),
    unanswered: quizIds.filter((id) => !latestAnswers.has(id)),
  }
}
