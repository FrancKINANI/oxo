export const fr = {
  app: {
    skipToContent: 'Aller au contenu', brandAria: 'OXO — haut de la leçon', brandTagline: 'Économie au Maroc',
    languageAria: 'Langue du contenu : français', languageShort: 'FR', modes: 'Modes', learn: 'Apprendre', simulate: 'Simuler',
    sources: 'Sources', glossary: 'Glossaire', openCourse: 'Ouvrir le parcours', closeCourse: 'Fermer le parcours',
    switchToLight: 'Passer au thème clair', switchToDark: 'Passer au thème sombre',
  },
  navigation: {
    aria: 'Parcours', title: 'Parcours', module: 'Prix et inflation', steps: ['Observer', 'Manipuler', 'Interpréter', 'Synthèse'],
    progress: 'Progression', upcoming: 'À venir', soon: 'bientôt disponible', moduleInProgress: 'Module en cours : prix et inflation.',
    completedModules: 'Modules terminés', upcomingModules: [
      { index: '02', title: 'Budget public', lessons: '2 activités' },
      { index: '03', title: 'Monnaie et taux', lessons: '2 activités' },
    ],
  },
  lesson: {
    breadcrumb: 'Fil d’Ariane', stepOf: (current: number, total: number) => `Étape ${current} sur ${total}`,
    stepSlash: (current: number, total: number) => `Étape ${current} / ${total}`, statStrip: 'Chiffres de l’étape',
    stepperAria: 'Étapes de la leçon', simulatedCost: 'Coût simulé', startingAmount: (amount: number) => `${amount} DH au départ`, variation: 'Variation',
    weighted: 'pondérée par les poids', food: 'Alimentation', transport: 'Transport', basket: 'du panier', reset: 'Réinitialiser',
    stepLabels: ['Observer', 'Manipuler', 'Interpréter', 'Synthèse'], inThisLesson: 'Dans cette leçon', previous: '← Précédent', next: 'Suivant →', restart: 'Recommencer', idea: '✦ Idée clé',
    learningOutcomes: 'Vous allez apprendre', primarySource: 'Source principale', sourceReference: 'Référence',
    sourceVerified: 'vérifiée le', sourcePublished: 'Publiée le', editorialRevision: 'Révision éditoriale', askTutor: 'Demander au tuteur', consultSource: 'Consulter la source',
  },
  price: {
    observedData: 'Données HCP observées', source: 'Source HCP', fixedExample: 'Exemple fixe de 240 DH pour illustrer un budget mensuel.',
    fictionalBasket: 'Panier fictif simplifié, base mensuelle.', basketLabel: 'Votre panier', ipcLabel: 'IPC national',
    individualCase: 'Cas particulier', officialMeasure: 'Mesure officielle',
  },
  simulation: {
    chooseMode: 'Choisissez des données observées ou construisez une hypothèse libre.', realScenario: 'Scénario réel octobre 2026',
    realScenarioBadge: 'Scénario réel · octobre 2026',
    observedDetail: 'Alimentation +0,3 % et transport +11,6 % sur un an sont observés par le HCP. Logement est laissé à 0 % comme hypothèse pédagogique.',
    freeDetail: 'Mode libre : les variations saisies sont des hypothèses pédagogiques, pas des données observées.',
    weightDisclaimer: (officialWeight: string) => `Poids alimentaire officiel HCP : ${officialWeight} (base 2017). Tous les poids de ce modèle sont des hypothèses pédagogiques. 12 postes officiels vs 3 postes simplifiés.`,
    total: 'Total du panier', weightCaption: 'Poids',
    weight: (weight: number) => `${weight} % · hypothèse`, controlValue: (label: string, value: string, weight: string) => `${label} : variation ${value}, poids ${weight}`,
    lowerBound: '0 %', neutralBound: '+15 %', upperBound: '+30 %',
  },
  course: { moduleIndex: '01', currentCount: '1/2', completedCount: '1 / 4', progressPercent: '25%' },
  dialogs: {
    glossary: 'Glossaire', sources: 'Sources et méthode', close: 'Fermer', editor: 'Éditeur', publication: 'Publication',
    referencePeriod: 'Période de référence', publicationDate: 'Date de publication', lastVerified: 'Dernière vérification',
    editorialRevision: 'Révision éditoriale', editorialStatus: 'Statut éditorial', editorialToReview: 'À valider',
    consultHcp: 'Consulter la publication du HCP',
    officialSources: 'Les chiffres affichés proviennent de publications officielles. Les variations du simulateur sont des hypothèses pédagogiques, pas des données publiées.',
    sourcesDisclaimer: 'OXO ne fournit ni conseil financier ni prévision. Une donnée non vérifiée n’est pas publiée : elle est signalée comme hypothèse.',
    conceptExample: 'Exemple marocain ·', method: 'Méthode ·', limit: 'Limite ·', relatedConcepts: 'Concepts liés',
  },
  tutor: {
    label: 'Tuteur', aria: 'Tuteur local', heading: 'Demander au tuteur', clear: 'Effacer la conversation', close: 'Fermer le tuteur',
    conversation: 'Conversation', question: 'Votre question', placeholder: 'Votre question…', send: 'Envoyer',
    userPrefix: 'Vous : ', assistantPrefix: 'Tuteur : ', privacySuffix: 'Les questions ne sont pas conservées après cette session.',
  },
  learning: {
    quizCount: (count: number) => `${count} questions`,
    checkAnswer: 'Vérifier ma réponse', answerRequired: 'Choisissez une réponse avant de vérifier.',
    correct: 'Bonne réponse.', reflectionTitle: 'Expliquez avec vos mots',
    reflectionLabel: 'Votre explication', reflectionPlaceholder: 'Écrivez votre explication ici…',
    selfCheck: 'Pour vous guider, vérifiez si votre explication mentionne :',
    selfCheckWords: ['panier', 'poids', 'moyenne'], selfCheckFound: 'mentionné', selfCheckMissing: 'à vérifier',
    reflectionPrivacy: 'Votre texte reste dans cette page et n’est pas enregistré dans la progression.',
    synthesisTitle: 'À retenir', limitsTitle: 'Limites du modèle', sourcesTitle: 'Sources', nextTitle: 'Pour continuer',
    nextBody: 'La prochaine fois, comparez une nouvelle publication du HCP à votre propre panier en vérifiant les périodes et les sources.',
    progressTitle: 'Votre progression sur cet appareil', conceptsSeen: 'Concepts vus', quizzesPassed: 'Questions réussies',
    toReview: 'À revoir', noReview: 'Aucun point à revoir pour le moment.', unanswered: 'Questions sans réponse',
    finish: 'Terminer la leçon', finished: 'Leçon terminée sur cet appareil.',
    conceptNames: { inflation: 'Inflation', ipc: 'Indice des prix à la consommation' },
    restartNote: 'Votre progression reste enregistrée sur cet appareil.',
    sourceLink: 'Consulter la publication HCP',
  },
  error: {
    log: 'Erreur de rendu non gérée', title: 'Le contenu n’a pas pu s’afficher',
    body: 'Rechargez la page. Si le problème persiste, revenez plus tard : la leçon reste disponible, aucune donnée n’a été perdue.', reload: 'Recharger la page',
  },
  concepts: {
    ids: { inflation: 'inflation', ipc: 'ipc' }, terms: { inflation: 'Inflation', ipc: 'Indice des prix à la consommation' },
    reviewed: 'revue le', review: '20 novembre 2026',
    prerequisites: { inflation: [], ipc: ['inflation'] },
  },
} as const

export const locale = { fr } as const
export type LocaleId = keyof typeof locale
export const defaultLocale: LocaleId = 'fr'

export function getLocale(localeId: string = defaultLocale) {
  return locale[localeId as LocaleId] ?? fr
}
