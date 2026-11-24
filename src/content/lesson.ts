import { formatDate } from '../app/format'
import type { StepId } from '../app/steps'

export type SourceRef = {
  publisher: string
  title: string
  url: string
  referencePeriod: string
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
  revision: '2026-11-20',
} as const

export const primarySource: SourceRef = {
  publisher: 'Haut-Commissariat au Plan',
  title: 'Indices des prix à la consommation',
  url: 'https://www.hcp.ma/Indices-des-prix-a-la-consommation-IPC_r348.html',
  referencePeriod: 'novembre 2026',
  checkedAt: '2026-11-20',
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
      title: 'Deux mesures, deux usages',
      body: 'Votre panier décrit ce que vous achetez, aux prix que vous payez. L’IPC décrit l’évolution moyenne des prix pour une sélection représentative de ménages, avec des poids publiés par le HCP. Une hausse de votre panier ne prouve donc pas, à elle seule, une hausse générale des prix.',
      keyIdea: 'Votre panier est un cas particulier. L’IPC est une moyenne nationale pondérée.',
      learn: [
        'Distinguer votre panier de l’IPC',
        'Reconnaître une donnée observée d’une hypothèse',
        'Retrouver la source officielle',
      ],
    },
    stats: [
      { label: 'Panier exemple', value: '240 DH', hint: 'votre choix' },
      { label: 'IPC national', value: 'Moyenne', hint: 'pondérée par le HCP' },
      { label: 'Source', value: 'HCP', hint: 'donnée officielle' },
      { label: 'Révision', value: formatDate(lessonMeta.revision), hint: 'avant publication' },
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
      title: 'Ce que fait chaque curseur',
      body: 'La variation s’applique à la part du poste dans le panier. Alimentation pèse 40 %, transport 25 %, logement 35 % : la même hausse ne produit donc pas le même effet selon le poste modifié.',
      keyIdea: 'Un poste lourd pèse plus qu’un poste léger, même à variation identique.',
      learn: [
        'Calculer une variation pondérée',
        'Voir l’effet d’un poids dans le panier',
        'Séparer hypothèse et donnée officielle',
      ],
    },
  },
}

export const panierExample = {
  label: 'Votre panier',
  description: 'Les produits, quantités et prix que vous choisissez.',
  tag: 'Cas particulier',
}

export const ipcExample = {
  label: 'IPC national',
  value: 'Moyenne',
  description: 'Sélection représentative de ménages, avec des poids publiés par le HCP.',
  tag: 'Mesure officielle',
}

export const tutorCopy = {
  initialMessage:
    'Bonjour. Posez une question sur les prix, l’inflation ou la simulation.',
  suggestions: [
    'Quelle est la différence entre mon panier et l’IPC ?',
    'Que signifie une hypothèse ?',
  ],
  scope: 'Réponses limitées au contenu vérifié. Assistant local, sans modèle externe.',
}
