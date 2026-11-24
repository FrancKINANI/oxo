import { fr } from '../content/locales/fr'

export type StepId = 'observer' | 'manipuler' | 'interpreter' | 'synthese'

export const STEPS: ReadonlyArray<{ id: StepId; label: string }> = [
  { id: 'observer', label: fr.lesson.stepLabels[0] },
  { id: 'manipuler', label: fr.lesson.stepLabels[1] },
  { id: 'interpreter', label: fr.lesson.stepLabels[2] },
  { id: 'synthese', label: fr.lesson.stepLabels[3] },
]

export function stepNumber(step: StepId) {
  return STEPS.findIndex((item) => item.id === step) + 1
}
