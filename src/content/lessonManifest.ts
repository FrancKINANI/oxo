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
  quiz: Array<{
    id: string
    prompt: string
    choices: Array<{
      id: string
      text: string
      isCorrect: boolean
      misconception: string | null
      feedback: string
    }>
  }>
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
      { id: 'foodPercent', min: 0, max: 30, default: 8, isHypothesis: true },
      { id: 'transportPercent', min: 0, max: 30, default: 5, isHypothesis: true },
      { id: 'housingPercent', min: 0, max: 30, default: 2, isHypothesis: true },
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
  quiz: [
    {
      id: 'one-price-is-not-inflation',
      prompt: 'Le prix des tomates augmente. Que peut-on conclure sur l’inflation ?',
      choices: [
        { id: 'one-price-correct', text: 'Il faut observer un ensemble de prix sur une période.', isCorrect: true, misconception: null, feedback: 'Exact : l’inflation porte sur l’évolution générale des prix, pas sur un seul produit.' },
        { id: 'single-price', text: 'L’inflation générale a forcément augmenté.', isCorrect: false, misconception: 'hausse-un-prix-egale-inflation', feedback: 'Un seul prix peut augmenter pour des raisons propres à ce produit. Il ne suffit pas à mesurer l’évolution générale.' },
      ],
    },
    {
      id: 'ipc-is-not-my-basket',
      prompt: 'Pourquoi votre panier peut-il évoluer autrement que l’IPC national ?',
      choices: [
        { id: 'basket-correct', text: 'Votre composition et vos quantités peuvent différer du panier de référence.', isCorrect: true, misconception: null, feedback: 'Exact : l’IPC est une moyenne pondérée; chaque ménage peut avoir d’autres dépenses.' },
        { id: 'basket-equals-ipc', text: 'L’IPC reproduit exactement les achats de chaque ménage.', isCorrect: false, misconception: 'mon-panier-egale-ipc', feedback: 'L’IPC est une mesure nationale construite à partir d’un panier de référence. Il ne décrit pas chaque ménage.' },
      ],
    },
    {
      id: 'weights-change-impact',
      prompt: 'Deux postes connaissent la même hausse. Pourquoi leur effet sur un panier peut-il différer ?',
      choices: [
        { id: 'weight-correct', text: 'Leur poids dans le panier peut être différent.', isCorrect: true, misconception: null, feedback: 'Exact : à variation égale, un poste plus lourd contribue davantage au résultat pondéré.' },
        { id: 'weight-ignored', text: 'Le poids ne change jamais l’effet d’une hausse.', isCorrect: false, misconception: 'poids-sans-effet', feedback: 'Le poids compte : une variation identique a une contribution différente selon la part du poste.' },
      ],
    },
    {
      id: 'simulation-is-not-forecast',
      prompt: 'Que signifie le résultat du simulateur OXO ?',
      choices: [
        { id: 'simulation-correct', text: 'C’est le résultat des hypothèses choisies dans un modèle simplifié.', isCorrect: true, misconception: null, feedback: 'Exact : le résultat dépend des hypothèses saisies; ce n’est ni une prévision ni l’IPC officiel.' },
        { id: 'simulation-forecast', text: 'C’est une prévision officielle des prix à venir.', isCorrect: false, misconception: 'simulation-egale-prevision', feedback: 'Le simulateur applique des hypothèses pédagogiques. Il ne prédit pas les prix et ne remplace pas une publication du HCP.' },
      ],
    },
  ],
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
  if (!Array.isArray(quiz) || !quiz.length) throw new Error('Manifeste de leçon invalide : quiz incomplet')
  for (const item of quiz) {
    if (!item.id?.trim() || !item.prompt.trim() || !Array.isArray(item.choices) || item.choices.length < 2 || item.choices.filter((choice) => choice.isCorrect).length !== 1) {
      throw new Error(`Manifeste de leçon invalide : quiz incomplet (${item.id || 'sans identifiant'})`)
    }
    if (item.choices.some((choice) => !choice.id.trim() || !choice.text.trim() || !choice.feedback.trim() || (!choice.isCorrect && !choice.misconception))) {
      throw new Error(`Manifeste de leçon invalide : feedback ou misconception manquant (${item.id})`)
    }
  }
  const review = manifest.review
  if (!review?.author?.trim() || !review.nextReviewDue || !['draft', 'to_review', 'verified'].includes(review.status)) throw new Error('Manifeste de leçon invalide : revue éditoriale incomplète')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(review.nextReviewDue)) throw new Error('Manifeste de leçon invalide : prochaine revue au format AAAA-MM-JJ requise')
  if (review.status === 'verified' && (!review.reviewer || !review.reviewedAt)) {
    throw new Error('Manifeste de leçon invalide : une leçon vérifiée exige un réviseur et une date de revue')
  }
}

validateLessonManifest(lessonManifest)
