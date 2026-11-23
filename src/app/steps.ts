export type StepId = 'observer' | 'manipuler'

export const STEPS: ReadonlyArray<{ id: StepId; label: string }> = [
  { id: 'observer', label: 'Observer' },
  { id: 'manipuler', label: 'Manipuler' },
]

export function stepNumber(step: StepId) {
  return STEPS.findIndex((item) => item.id === step) + 1
}
