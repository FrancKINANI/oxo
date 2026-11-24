import { describe, expect, it } from 'vitest'
import { concepts } from './concepts'
import { dataPoints, dataSnapshots, isReferencePeriodConsistent, snapshotFor } from './dataSnapshots'

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
    expect(primarySource.publicationDate).toMatch(isoDate)
    expect(primarySource.publisher).toContain('Haut-Commissariat au Plan')
    expect(primarySource.referencePeriod).toBe('octobre 2026')
  })

  it('fournit des chiffres HCP complets, reliés à des snapshots stables', () => {
    const required = [
      'ipc-national-yoy-2026-10', 'food-yoy-2026-10',
      'transport-yoy-2026-10', 'vegetables-mom-2026-10', 'food-weight-2017',
    ] as const
    expect(required).toHaveLength(5)
    for (const id of required) {
      const point = dataPoints[id]
      const snapshot = snapshotFor(point)
      expect(point.id).toBe(id)
      expect(point.series).not.toBe('')
      expect(point.unit).not.toBe('')
      expect(point.geography).not.toBe('')
      expect(point.referencePeriod).not.toBe('')
      expect(point.comparisonPeriod).not.toBe('')
      expect(snapshot.publisher).toContain('Haut-Commissariat au Plan')
      expect(snapshot.url).toMatch(/^https:\/\//)
      expect(snapshot.publicationDate).toMatch(isoDate)
      expect(snapshot.retrievedAt).toMatch(isoDate)
      expect(snapshot.status).toBe('verified')
      expect(isReferencePeriodConsistent(snapshot, point)).toBe(true)
    }
    expect(dataPoints['ipc-national-yoy-2026-10'].value).toBe(1.9)
    expect(dataPoints['food-yoy-2026-10'].value).toBe(0.3)
    expect(dataPoints['transport-yoy-2026-10'].value).toBe(11.6)
    expect(dataPoints['vegetables-mom-2026-10'].value).toBe(6.8)
    expect(Object.keys(dataSnapshots)).toHaveLength(2)
  })

  it('rejette une période de référence postérieure à la publication', () => {
    const snapshot = dataSnapshots['hcp-ipc-2026-10']
    expect(isReferencePeriodConsistent(snapshot, {
      ...dataPoints['ipc-national-yoy-2026-10'], referencePeriod: '2026-12',
    })).toBe(false)
  })

  it('marque le contenu éditorial modifié à revoir', async () => {
    const { editorialReview } = await import('./lesson')
    expect(editorialReview.status).toBe('to_review')
    expect(editorialReview.reviewedAt).toMatch(isoDate)
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
