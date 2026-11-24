import { dataSnapshots } from './dataSnapshots.ts'
import type { SnapshotId } from './dataSnapshots'
import { conceptGraph } from './conceptGraph.ts'
import type { ConceptId } from './conceptGraph'

export type LessonBlockId = 'observation' | 'mechanism' | 'formalization' | 'limits' | 'retrieval'

export type LessonManifest = {
  id: string
  locale: 'fr'
  prerequisites: ConceptId[]
  objectives: string[]
  dataRefs: SnapshotId[]
  simulation: {
    modelId: 'weighted-basket'
    params: Array<{ id: string; min: number; max: number; default: number; isHypothesis: boolean }>
  }
  blocks: Record<LessonBlockId, { title: string; body: string }>
  quiz: { id: string; prompt: string; choices: Array<{ id: string; text: string; isCorrect: boolean }> }
  review: {
    author: string
    reviewer: string | null
    reviewedAt: string | null
    nextReviewDue: string
    status: 'draft' | 'to_review' | 'verified'
  }
}

export const lessonManifest: LessonManifest = {
  id: 'prix-et-inflation',
  locale: 'fr',
  prerequisites: [],
  objectives: [
    'Distinguer une variation de son panier d’un indice national.',
    'Relier une variation de prix au poids du poste dans un panier.',
    'Reconnaître une observation sourcée et une hypothèse de simulation.',
  ],
  dataRefs: ['hcp-ipc-2026-10', 'hcp-ipc-method-2017'],
  simulation: {
    modelId: 'weighted-basket',
    params: [
      { id: 'foodPercent', min: -20, max: 30, default: 8, isHypothesis: true },
      { id: 'transportPercent', min: -20, max: 30, default: 5, isHypothesis: true },
      { id: 'housingPercent', min: -20, max: 30, default: 2, isHypothesis: true },
    ],
  },
  blocks: {
    observation: {
      title: 'Deux mesures, deux usages',
      body: 'Votre panier décrit ce que vous achetez, aux prix que vous payez. L’IPC décrit l’évolution moyenne des prix pour une sélection représentative de ménages, avec des poids publiés par le HCP. Une hausse de votre panier ne prouve donc pas, à elle seule, une hausse générale des prix.',
    },
    mechanism: {
      title: 'Ce que fait chaque curseur',
      body: 'La variation s’applique à la part du poste dans le panier. Alimentation pèse 40 %, transport 25 %, logement 35 % : la même hausse ne produit donc pas le même effet selon le poste modifié.',
    },
    formalization: {
      title: 'Formaliser le calcul',
      body: 'Variation simulée = somme des variations de postes multipliées par leur poids dans le panier pédagogique.',
    },
    limits: {
      title: 'Connaître les limites',
      body: 'Le panier de 240 DH et ses poids simplifiés ne reproduisent pas le panier HCP. Le résultat est un exemple pédagogique, ni prévision ni IPC officiel.',
    },
    retrieval: {
      title: 'Se rappeler',
      body: 'Explique pourquoi deux ménages peuvent ressentir des hausses différentes alors que l’IPC national est une moyenne pondérée.',
    },
  },
  quiz: {
    id: 'inflation-weighting-check',
    prompt: 'Pourquoi une hausse de prix n’a-t-elle pas le même effet sur tous les paniers ?',
    choices: [
      { id: 'weights-matter', text: 'Parce que la part de chaque poste peut différer selon le panier.', isCorrect: true },
      { id: 'all-same', text: 'Parce que tous les paniers augmentent toujours du même montant.', isCorrect: false },
    ],
  },
  review: {
    author: 'OXO',
    reviewer: null,
    reviewedAt: null,
    nextReviewDue: '2027-02-24',
    status: 'to_review',
  },
}

const requiredBlocks: LessonBlockId[] = ['observation', 'mechanism', 'formalization', 'limits', 'retrieval']

export function validateLessonManifest(value: unknown): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Manifeste de leçon invalide : objet requis')
  }
  const manifest = value as Partial<LessonManifest>
  const missing: string[] = []
  for (const field of ['id', 'locale', 'prerequisites', 'objectives', 'dataRefs', 'simulation', 'blocks', 'quiz', 'review'] as const) {
    if (manifest[field] === undefined || manifest[field] === null) missing.push(field)
  }
  if (missing.length) throw new Error(`Manifeste de leçon invalide : champ(s) manquant(s) — ${missing.join(', ')}`)
  if (manifest.locale !== 'fr') throw new Error('Manifeste de leçon invalide : locale fr requise pour cette livraison')
  if (!manifest.id?.trim()) throw new Error('Manifeste de leçon invalide : identifiant vide')
  if (!manifest.objectives?.length || manifest.objectives.some((objective) => !objective.trim())) {
    throw new Error('Manifeste de leçon invalide : objectifs incomplets')
  }
  for (const block of requiredBlocks) {
    const content = manifest.blocks?.[block]
    if (!content?.title?.trim() || !content.body?.trim()) throw new Error(`Manifeste de leçon invalide : bloc ${block} incomplet`)
  }
  if (!Array.isArray(manifest.dataRefs)) throw new Error('Manifeste de leçon invalide : dataRefs doit être une liste')
  for (const id of manifest.dataRefs) {
    if (!dataSnapshots[id]) throw new Error(`Manifeste de leçon invalide : snapshot inconnu ${id}`)
  }
  if (!Array.isArray(manifest.prerequisites)) throw new Error('Manifeste de leçon invalide : prerequisites doit être une liste')
  for (const id of manifest.prerequisites) {
    if (!conceptGraph[id]) throw new Error(`Manifeste de leçon invalide : prérequis concept inconnu ${id}`)
  }
  const simulation = manifest.simulation
  if (!simulation || simulation.modelId !== 'weighted-basket' || !Array.isArray(simulation.params) || !simulation.params.length) {
    throw new Error('Manifeste de leçon invalide : simulation ou modèle absent')
  }
  for (const param of simulation.params) {
    if (!param.id || !Number.isFinite(param.min) || !Number.isFinite(param.max) || !Number.isFinite(param.default)) {
      throw new Error(`Manifeste de leçon invalide : paramètre incomplet (${param.id || 'sans identifiant'})`)
    }
    if (param.min > param.max || param.default < param.min || param.default > param.max) {
      throw new Error(`Manifeste de leçon invalide : bornes incompatibles (${param.id})`)
    }
  }
  const quiz = manifest.quiz
  if (!quiz?.id?.trim() || !quiz.prompt.trim() || !Array.isArray(quiz.choices) || quiz.choices.length < 2 || !quiz.choices.some((choice) => choice.isCorrect && choice.text.trim())) {
    throw new Error('Manifeste de leçon invalide : quiz incomplet')
  }
  const review = manifest.review
  if (!review?.author?.trim() || !review.nextReviewDue || !['draft', 'to_review', 'verified'].includes(review.status)) throw new Error('Manifeste de leçon invalide : revue éditoriale incomplète')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(review.nextReviewDue)) throw new Error('Manifeste de leçon invalide : prochaine revue au format AAAA-MM-JJ requise')
  if (review.status === 'verified' && (!review.reviewer || !review.reviewedAt)) {
    throw new Error('Manifeste de leçon invalide : une leçon vérifiée exige un réviseur et une date de revue')
  }
}

validateLessonManifest(lessonManifest)
