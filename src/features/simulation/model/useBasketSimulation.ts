import { useMemo, useState } from 'react'
import { calculateBasket, calculateBreakdown } from './calculateBasket'
import type { BasketSimulationInput } from './calculateBasket'

export type BasketField = keyof BasketSimulationInput

export const INITIAL_SCENARIO: BasketSimulationInput = {
  foodPercent: 8,
  transportPercent: 5,
  housingPercent: 2,
}

const fields: BasketField[] = ['foodPercent', 'transportPercent', 'housingPercent']

/** État partagé entre la scène centrale et le panneau d'étape. */
export function useBasketSimulation() {
  const [variant, setVariant] = useState<BasketSimulationInput>(INITIAL_SCENARIO)

  const result = useMemo(() => calculateBasket(variant), [variant])
  const breakdown = useMemo(() => calculateBreakdown(variant), [variant])
  const isInitial = fields.every((field) => variant[field] === INITIAL_SCENARIO[field])

  function setField(field: BasketField, value: number) {
    setVariant((current) => ({ ...current, [field]: value }))
  }

  function reset() {
    setVariant(INITIAL_SCENARIO)
  }

  return { variant, result, breakdown, isInitial, setField, reset }
}
