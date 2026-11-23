import { describe, expect, it } from 'vitest'
import { BASE_BASKET_DH, calculateBasket, calculateBreakdown } from './calculateBasket'

describe('calculateBasket', () => {
  it('calcule le résultat initial à partir des poids pondérés', () => {
    expect(calculateBasket({
      foodPercent: 8,
      transportPercent: 5,
      housingPercent: 2,
    })).toEqual({
      resultDh: 252,
      percentChange: 5.15,
      weightedChange: 5.15,
    })
  })

  it('retourne une diminution lorsque toutes les variations sont négatives', () => {
    const result = calculateBasket({
      foodPercent: -10,
      transportPercent: -10,
      housingPercent: -10,
    })
    expect(result.resultDh).toBe(216)
    expect(result.percentChange).toBeLessThan(0)
  })
})

describe('calculateBreakdown', () => {
  it('couvre tout le panier de départ', () => {
    const total = calculateBreakdown({
      foodPercent: 0,
      transportPercent: 0,
      housingPercent: 0,
    }).reduce((sum, item) => sum + item.baseDh, 0)

    expect(total).toBe(BASE_BASKET_DH)
  })

  it('reste cohérent avec le total arrondi de calculateBasket', () => {
    const scenario = { foodPercent: 8, transportPercent: 5, housingPercent: 2 }
    const total = calculateBreakdown(scenario).reduce((sum, item) => sum + item.currentDh, 0)

    expect(Math.round(total)).toBe(calculateBasket(scenario).resultDh)
  })
})
