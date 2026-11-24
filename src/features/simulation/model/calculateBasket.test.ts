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
      weightedChange: 5.15,
    })
  })

  it.each([
    { foodPercent: Number.NaN, transportPercent: 0, housingPercent: 0 },
    { foodPercent: -1, transportPercent: 0, housingPercent: 0 },
    { foodPercent: 101, transportPercent: 0, housingPercent: 0 },
  ])('rejette une valeur non finie ou hors bornes', (input) => {
    expect(() => calculateBasket(input)).toThrow(RangeError)
    expect(() => calculateBreakdown(input)).toThrow(RangeError)
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
