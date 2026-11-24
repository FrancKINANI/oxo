export type BasketSimulationInput = {
  foodPercent: number
  transportPercent: number
  housingPercent: number
}

export type BasketSimulationResult = {
  resultDh: number
  weightedChange: number
}

export type BasketCategoryId = 'food' | 'transport' | 'housing'

export type BasketBreakdownItem = {
  id: BasketCategoryId
  label: string
  weight: number
  baseDh: number
  currentDh: number
}

export const BASE_BASKET_DH = 240

export const BASKET_CATEGORIES: ReadonlyArray<{
  id: BasketCategoryId
  label: string
  weight: number
  field: keyof BasketSimulationInput
}> = [
  { id: 'food', label: 'Alimentation', weight: 0.4, field: 'foodPercent' },
  { id: 'transport', label: 'Transport', weight: 0.25, field: 'transportPercent' },
  { id: 'housing', label: 'Logement', weight: 0.35, field: 'housingPercent' },
]

function validateInput(input: BasketSimulationInput) {
  for (const field of ['foodPercent', 'transportPercent', 'housingPercent'] as const) {
    const value = input[field]
    if (!Number.isFinite(value)) throw new RangeError(`${field} doit être un nombre fini`)
    if (value < 0 || value > 100) throw new RangeError(`${field} doit être compris entre 0 et 100`)
  }
}

export function calculateBasket(input: BasketSimulationInput): BasketSimulationResult {
  validateInput(input)
  const values = [input.foodPercent, input.transportPercent, input.housingPercent]
  const weightedChange = values.reduce(
    (total, value, index) => total + value * BASKET_CATEGORIES[index].weight,
    0,
  )
  const resultDh = Math.round(BASE_BASKET_DH * (1 + weightedChange / 100))

  return { resultDh, weightedChange }
}

/** Montant par poste, avant et après la variation simulée. */
export function calculateBreakdown(input: BasketSimulationInput): BasketBreakdownItem[] {
  validateInput(input)
  return BASKET_CATEGORIES.map(({ id, label, weight, field }) => {
    const baseDh = BASE_BASKET_DH * weight
    return {
      id,
      label,
      weight,
      baseDh,
      currentDh: baseDh * (1 + input[field] / 100),
    }
  })
}
