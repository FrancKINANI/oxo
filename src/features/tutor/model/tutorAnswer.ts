export const TUTOR_ABSTENTION_RESPONSE = 'Je ne dispose pas d’une source vérifiée dans le corpus approuvé pour répondre précisément à cette question. Reformulez-la autour de l’inflation, de l’IPC ou du scénario du panier.'

export const PERSONAL_FINANCE_REFUSAL = 'Ne partagez ici aucun revenu, solde, identifiant ou mot de passe. Je peux répondre à une question générale sans données financières personnelles.'

export const PERSONAL_ADVICE_REFUSAL = 'Je peux expliquer les mécanismes économiques, mais je ne peux pas recommander un placement adapté à une personne. Les décisions financières personnelles nécessitent des informations professionnelles indépendantes.'

function normalize(value: string) {
  return value.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’'\-–—]/g, ' ')
}

function contains(text: string, pattern: RegExp) {
  return pattern.test(text)
}

function isPersonalDataRequest(text: string) {
  return contains(text, /\b(mon|ma|mes)\s+(revenu|revenus|salaire|salaires|solde|compte|epargne|identifiant|mot de passe)\b/)
    || contains(text, /\bsolde bancaire\b|\bsolde de mon compte\b|\bidentifiant bancaire\b|\bnumero de compte\b/)
}

function isFinancialAdviceRequest(text: string) {
  const adviceIntent = contains(text, /\b(dois je|devrais je|conseille moi|me conseilles tu|recommande moi|me recommandes tu|quel placement|ou placer|comment investir|dans quoi investir|quel produit financier)\b/)
  const financialTopic = contains(text, /\b(investir|investissement|placement|epargne|bourse|action|actions|crypto|cryptomonnaie|obligation|titre financier|rendement|credit|pret|assurance|immobilier)\b/)
  const explicitlyNonFinancial = contains(text, /\b(temps|plante|plantes|agriculture|competence|competences|projet associatif)\b/)
  const buyingFinancialAsset = contains(text, /\bacheter\b.*\b(action|actions|crypto|cryptomonnaie|obligation|appartement|maison|terrain|logement)\b/)

  return buyingFinancialAsset || (adviceIntent && financialTopic && !explicitlyNonFinancial)
}

export function tutorAnswer(question: string): string {
  const text = normalize(question)

  if (isPersonalDataRequest(text)) return PERSONAL_FINANCE_REFUSAL
  if (isFinancialAdviceRequest(text)) return PERSONAL_ADVICE_REFUSAL

  if (contains(text, /\bpanier\b/) && contains(text, /\bipc\b|indice des prix/)) {
    return "Votre panier décrit les dépenses que vous choisissez et leurs quantités. L'IPC national mesure l'évolution moyenne des prix pour une sélection représentative de ménages, avec des poids publiés par le HCP. Les deux peuvent donc évoluer différemment."
  }
  if (contains(text, /\bpanier\b/)) {
    return 'Un panier de référence rassemble des biens et services suivis dans le temps. L’IPC combine leurs évolutions avec des poids; votre panier personnel peut avoir une composition différente.'
  }
  if (contains(text, /\bhypothese\b/)) {
    return 'Une hypothèse est une variation choisie dans le modèle pédagogique. Ici, vous choisissez une variation pour l’alimentation, le transport ou le logement. Le résultat dépend directement de ces choix et n’est pas une prévision.'
  }
  if (contains(text, /\bpoids\b|\bpondere\b|\bponderation\b/)) {
    return 'Un poids représente la part d’un poste dans le panier de référence. À variation égale, un poste plus lourd contribue davantage à la moyenne pondérée. Les poids du simulateur sont pédagogiques; le poids alimentaire officiel vérifié est 37,28 % pour le panier HCP base 2017.'
  }
  if (contains(text, /\bsimulation\b|\bsimuler\b|\bprevision\b/)) {
    return 'La simulation applique les variations et les poids simplifiés choisis dans le modèle. Elle montre leur effet sur cet exemple; ce n’est ni une prévision ni l’IPC officiel.'
  }
  if (contains(text, /\bperiode\b|\bpublication\b|\boctobre\b|\bmois\b|\bannee\b|\breference\b/)) {
    return 'Une variation doit toujours être lue avec sa période de référence et sa comparaison. Par exemple, le chiffre HCP d’octobre 2026 compare les prix à septembre 2026 pour le mois, ou à octobre 2025 pour une variation annuelle.'
  }
  if (contains(text, /\binflation\b/)) {
    return "L'inflation correspond à une hausse générale et durable du niveau des prix. Une hausse visible sur un seul produit ne suffit pas à mesurer toute l'inflation. Consultez la méthode et la période publiées par le HCP."
  }
  if (contains(text, /\bipc\b|indice des prix/)) {
    return 'L’IPC est un indice qui suit l’évolution moyenne des prix d’un panier de référence pondéré, publié par le HCP. Il ne décrit pas exactement les achats ni le coût de la vie de chaque ménage.'
  }
  if (contains(text, /\bprix\b/)) {
    return 'Un prix rapporte une somme de monnaie à un bien ou un service. Pour interpréter son évolution, comparez le même produit dans le temps et ne confondez pas un prix isolé avec l’inflation générale.'
  }
  return TUTOR_ABSTENTION_RESPONSE
}
