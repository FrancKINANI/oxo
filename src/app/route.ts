import type { StepId } from '../shared/steps'
import { STEPS } from '../shared/steps'

const PARAM = 'etape'

/** Lit l'étape demandée dans l'URL, pour des liens partageables. */
export function readStepFromUrl(search: string): StepId | null {
  const value = new URLSearchParams(search).get(PARAM)
  return STEPS.some((step) => step.id === value) ? (value as StepId) : null
}

/** Reflète l'étape courante sans empiler d'historique ni recharger. */
export function writeStepToUrl(step: StepId) {
  const url = new URL(window.location.href)
  if (step === 'observer') url.searchParams.delete(PARAM)
  else url.searchParams.set(PARAM, step)
  window.history.replaceState(null, '', url)
}

export function stepSharePath(step: StepId) {
  return step === 'observer' ? '/' : `/?${PARAM}=${step}`
}
