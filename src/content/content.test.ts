import { describe, expect, it } from 'vitest'
import { concepts, parseConceptMarkdown } from './concepts'
import { dataPoints, dataSnapshots, isReferencePeriodConsistent, snapshotFor } from './dataSnapshots'
import { conceptGraph, validateConceptGraph } from './conceptGraph'
import { lessonManifest, validateLessonManifest } from './lessonManifest'
import { defaultLocale, getLocale, locale } from './locales/fr'

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

  it('fait échouer une fiche incomplète avec le nom du champ manquant', () => {
    expect(() => parseConceptMarkdown('test.md', '# Test'))
      .toThrow(/Définition simple, Source, Date de revue/)
    expect(() => parseConceptMarkdown('sans-titre.md', ''))
      .toThrow(/titre, Définition simple, Source, Date de revue/)
  })

  it('expose les prérequis typés du graphe de concepts', () => {
    expect(conceptGraph.inflation.prerequisites).toEqual([])
    expect(conceptGraph.ipc.prerequisites).toEqual(['inflation'])
    expect(() => validateConceptGraph()).not.toThrow()
  })
})

describe('LessonManifest', () => {
  it('contient les blocs, données, paramètres, quiz et revue nécessaires', () => {
    expect(() => validateLessonManifest(lessonManifest)).not.toThrow()
    expect(Object.keys(lessonManifest.blocks)).toEqual([
      'observation', 'mechanism', 'formalization', 'limits', 'retrieval',
    ])
    expect(lessonManifest.review.status).toBe('to_review')
    expect(lessonManifest.review.reviewedAt).toBeNull()
  })

  it('refuse un manifeste incomplet et une référence de donnée inconnue', () => {
    expect(() => validateLessonManifest({ id: 'incomplet' })).toThrow(/champ\(s\) manquant\(s\)/)
    const invalid = { ...lessonManifest, dataRefs: ['snapshot-inconnu'] }
    expect(() => validateLessonManifest(invalid)).toThrow(/snapshot inconnu/)
  })

  it('refuse un bloc vide, un paramètre hors limites et une revue vérifiée sans approbation', () => {
    const emptyBlock = { ...lessonManifest, blocks: { ...lessonManifest.blocks, limits: { title: 'Limites', body: ' ' } } }
    expect(() => validateLessonManifest(emptyBlock)).toThrow(/bloc limits incomplet/)

    const invalidParameter = { ...lessonManifest, simulation: { ...lessonManifest.simulation, params: [{ ...lessonManifest.simulation.params[0], default: 31 }] } }
    expect(() => validateLessonManifest(invalidParameter)).toThrow(/bornes incompatibles/)

    const unreviewedVerified = { ...lessonManifest, review: { ...lessonManifest.review, status: 'verified' as const } }
    expect(() => validateLessonManifest(unreviewedVerified)).toThrow(/réviseur et une date de revue/)
  })
})

describe('catalogue de locale', () => {
  it('ne livre que le français et utilise fr comme repli', () => {
    expect(defaultLocale).toBe('fr')
    expect(Object.keys(locale)).toEqual(['fr'])
    expect(getLocale('locale-inconnue')).toBe(locale.fr)
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
