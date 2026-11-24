import { describe, expect, it } from 'vitest'
import { readStepFromUrl, stepSharePath } from './route'

describe('route', () => {
  it('lit une étape valide depuis l’URL', () => {
    expect(readStepFromUrl('?etape=manipuler')).toBe('manipuler')
    expect(readStepFromUrl('?etape=observer')).toBe('observer')
  })

  it('ignore une valeur inconnue ou absente', () => {
    expect(readStepFromUrl('?etape=pirate')).toBeNull()
    expect(readStepFromUrl('')).toBeNull()
    expect(readStepFromUrl('?autre=1')).toBeNull()
  })

  it('construit un chemin partageable', () => {
    expect(stepSharePath('observer')).toBe('/')
    expect(stepSharePath('manipuler')).toBe('/?etape=manipuler')
  })
})
