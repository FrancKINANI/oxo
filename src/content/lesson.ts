import { formatDate } from '../shared/format'
import type { StepId } from '../shared/steps'
import { dataPoints, dataSnapshots } from './dataSnapshots'
import { lessonManifest } from './lessonManifest'

export type SourceRef = {
  snapshotId: keyof typeof dataSnapshots
  publisher: string
  title: string
  url: string
  referencePeriod: string
  publicationDate: string
  checkedAt: string
}

export type StatContent = { label: string; value: string; hint: string }

export type StageContent = {
  title: string
  badge: string
  note: string
}

export type StepContent = {
  id: StepId
  title: string
  lead: string
  durationMinutes: number
  level: string
  stage: StageContent
  narration: {
    title: string
    body: string
    keyIdea: string
    learn: string[]
  }
  /** Chiffres fixes de l'étape ; l'étape de simulation les calcule. */
  stats?: StatContent[]
}

export const lessonMeta = {
  moduleIndex: '01',
  moduleTitle: 'Prix et inflation',
  revision: '2026-11-24',
} as const

export const primarySource: SourceRef = {
  snapshotId: 'hcp-ipc-2026-10',
  publisher: 'Haut-Commissariat au Plan',
  title: dataSnapshots['hcp-ipc-2026-10'].title,
  url: dataSnapshots['hcp-ipc-2026-10'].url,
  referencePeriod: 'octobre 2026',
  publicationDate: dataSnapshots['hcp-ipc-2026-10'].publicationDate,
  checkedAt: dataSnapshots['hcp-ipc-2026-10'].retrievedAt,
}

export const simulationDisclaimer =
  'Relation simplifiée : les variations sont des hypothèses, pas les valeurs publiées par le HCP. Ce résultat n’est ni une prévision, ni l’IPC officiel.'

export const steps: Record<StepId, StepContent> = {
  observer: {
    id: 'observer',
    title: 'Pourquoi mon panier devient-il plus cher ?',
    lead: 'Votre panier et l’indice des prix ne mesurent pas la même chose. Repérez qui publie quoi avant de manipuler des chiffres.',
    durationMinutes: 6,
    level: 'Débutant',
    stage: {
      title: 'Comparer deux mesures',
      badge: 'Donnée observée · hypothèse',
      note: 'Une hausse visible sur votre panier ne suffit pas à conclure à une hausse générale des prix.',
    },
    narration: {
      title: lessonManifest.blocks.observation.title,
      body: lessonManifest.blocks.observation.body,
      keyIdea: 'Votre panier est un cas particulier. L’IPC est une moyenne nationale pondérée.',
      learn: [
        'Distinguer votre panier de l’IPC',
        'Reconnaître une donnée observée d’une hypothèse',
        'Retrouver la source officielle',
      ],
    },
    stats: [
      { label: 'Panier exemple', value: '240 DH', hint: 'exemple fixe · base mensuelle' },
      { label: 'IPC national', value: '+1,9 %', hint: 'variation annuelle · octobre 2026' },
      { label: 'Source', value: 'HCP', hint: 'donnée officielle' },
      { label: 'Révision', value: formatDate(lessonMeta.revision), hint: 'éditoriale' },
    ],
  },
  manipuler: {
    id: 'manipuler',
    title: 'Faites varier votre panier',
    lead: 'Chaque curseur modifie une hypothèse. Le résultat est une simulation pédagogique, pas une prévision.',
    durationMinutes: 5,
    level: 'Débutant',
    stage: {
      title: 'Votre panier simulé',
      badge: 'Hypothèses modifiables',
      note: simulationDisclaimer,
    },
    narration: {
      title: lessonManifest.blocks.mechanism.title,
      body: lessonManifest.blocks.mechanism.body,
      keyIdea: 'Un poste lourd pèse plus qu’un poste léger, même à variation identique.',
      learn: [
        'Calculer une variation pondérée',
        'Voir l’effet d’un poids dans le panier',
        'Séparer hypothèse et donnée officielle',
      ],
    },
  },
  interpreter: {
    id: 'interpreter',
    title: 'Interprétez les chiffres',
    lead: 'Répondez aux questions puis expliquez le mécanisme avec vos mots.',
    durationMinutes: 5,
    level: 'Débutant',
    stage: {
      title: 'Vérifier votre compréhension',
      badge: 'Réponses expliquées',
      note: 'Chaque réponse incorrecte indique le raisonnement à revoir.',
    },
    narration: {
      title: 'Relier le résultat à ses causes',
      body: 'Un chiffre seul ne suffit pas : vérifiez la période, la composition du panier et le poids de chaque poste avant de l’interpréter.',
      keyIdea: 'L’IPC est une moyenne pondérée; il ne décrit pas exactement chaque panier personnel.',
      learn: ['Repérer les limites d’un chiffre isolé', 'Expliquer le rôle des poids', 'Distinguer simulation et prévision'],
    },
    stats: [],
  },
  synthese: {
    id: 'synthese',
    title: 'Ce qu’il faut retenir',
    lead: 'Retrouvez l’idée clé, les limites et les sources, puis consultez votre progression locale.',
    durationMinutes: 3,
    level: 'Débutant',
    stage: {
      title: 'Synthèse de la leçon',
      badge: 'Sources et progression locale',
      note: 'La progression reste dans le stockage local de ce navigateur.',
    },
    narration: {
      title: 'Une mesure utile, avec ses limites',
      body: lessonManifest.blocks.formalization.body,
      keyIdea: 'Les prix observés, les poids du panier et la période doivent être lus ensemble.',
      learn: ['Vérifier la source et la période', 'Comparer votre panier à la moyenne nationale', 'Nommer les hypothèses du modèle'],
    },
    stats: [],
  },
}

export const panierExample = {
  label: 'Votre panier',
  description: 'Exemple fixe de 240 DH pour illustrer un budget mensuel.',
  tag: 'Cas particulier',
}

export const ipcExample = {
  label: 'IPC national',
  value: '+1,9 %',
  description: `Variation sur un an · octobre 2026 · ${dataPoints['ipc-national-yoy-2026-10'].geography}`,
  tag: 'Mesure officielle',
}

export const observedDataPointIds = [
  'ipc-national-yoy-2026-10',
  'food-yoy-2026-10',
  'transport-yoy-2026-10',
  'vegetables-mom-2026-10',
] as const

export const editorialReview = { status: 'to_review', reviewedAt: '2026-11-24' } as const

export const tutorCopy = {
  initialMessage:
    'Bonjour. Posez une question sur les prix, l’inflation ou la simulation.',
  suggestions: [
    'Quelle est la différence entre mon panier et l’IPC ?',
    'Que signifie une hypothèse ?',
  ],
  scope: 'Réponses limitées au contenu vérifié. Assistant local, sans modèle externe.',
}
