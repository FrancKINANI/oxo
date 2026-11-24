export const TUTOR_ABSTENTION_RESPONSE = 'Je ne dispose pas d’une source vérifiée dans le corpus approuvé pour répondre précisément à cette question. Reformulez-la autour de l’inflation, de l’IPC ou du scénario du panier.'

export function tutorAnswer(question: string): string {
  const normalized = question.toLocaleLowerCase('fr')

  if (normalized.includes('panier') && normalized.includes('ipc')) {
    return "Votre panier décrit les dépenses que vous choisissez et leurs quantités. L'IPC national mesure l'évolution moyenne d'une sélection représentative de ménages, avec des poids publiés par le HCP. Les deux peuvent donc évoluer différemment."
  }
  if (normalized.includes('hypothèse') || normalized.includes('assumption')) {
    return 'Une hypothèse est une variation choisie dans le modèle pédagogique. Ici, vous choisissez une variation pour l’alimentation, le transport ou le logement. Le résultat dépend directement de ces choix et n’est pas une prévision.'
  }
  if (normalized.includes('inflation')) {
    return "L'inflation correspond à une hausse générale et durable du niveau des prix. Une hausse visible sur un seul produit ne suffit pas à mesurer toute l'inflation. Consultez la méthode et la période publiées par le HCP."
  }
  if (normalized.includes('invest') || normalized.includes('placement') || normalized.includes('acheter')) {
    return 'Je peux expliquer les mécanismes économiques, mais je ne peux pas recommander un placement adapté à une personne. Les décisions financières personnelles nécessitent des informations professionnelles indépendantes.'
  }
  if (
    normalized.includes('revenu') ||
    normalized.includes('solde') ||
    normalized.includes('banque') ||
    normalized.includes('mot de passe')
  ) {
    return 'Ne partagez ici aucun revenu, solde, identifiant ou mot de passe. Je peux répondre à une question générale sans données financières personnelles.'
  }
  return TUTOR_ABSTENTION_RESPONSE
}
