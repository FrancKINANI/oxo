import { describe, expect, it } from 'vitest'
import { concepts } from './concepts'

const isoDate = /^\d{4}-\d{2}-\d{2}$/

describe('concepts', () => {
  it('charge au moins une fiche', () => {
    expect(concepts.length).toBeGreaterThan(0)
  })

  it('fournit une définition, une source et une date de revue pour chaque fiche', () => {
    for (const concept of concepts) {
      expect(concept.term).not.toBe('')
      expect(concept.simpleDefinition.length).toBeGreaterThan(20)
      expect(concept.source).toMatch(/Haut-Commissariat au Plan|HCP/)
      expect(concept.reviewed.length).toBeGreaterThan(0)
    }
  })
})

describe('lesson', () => {
  it('déclare une révision au format ISO', async () => {
    const { lessonMeta } = await import('./lesson')
    expect(lessonMeta.revision).toMatch(isoDate)
  })

  it('cite une source HTTPS vérifiée', async () => {
    const { primarySource } = await import('./lesson')
    expect(primarySource.url.startsWith('https://')).toBe(true)
    expect(primarySource.checkedAt).toMatch(isoDate)
    expect(primarySource.publisher).toContain('Haut-Commissariat au Plan')
  })

  it('remplit la narration de chaque étape', async () => {
    const { steps } = await import('./lesson')
    for (const step of Object.values(steps)) {
      expect(step.title.length).toBeGreaterThan(10)
      expect(step.narration.body.length).toBeGreaterThan(80)
      expect(step.narration.keyIdea.length).toBeGreaterThan(20)
      expect(step.narration.learn.length).toBeGreaterThan(1)
      expect(step.stage.note.length).toBeGreaterThan(30)
    }
  })
})
