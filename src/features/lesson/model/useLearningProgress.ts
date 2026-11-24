import { useCallback, useState } from 'react'
import { readLearningEvents, recordLearningEvent } from './learningEvents'
import type { LearningEventInput } from './learningEvents'

export function useLearningProgress() {
  const [events, setEvents] = useState(readLearningEvents)

  const record = useCallback((event: LearningEventInput) => {
    setEvents(recordLearningEvent(event))
  }, [])

  return { events, record }
}
