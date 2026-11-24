import { describe, expect, it } from 'vitest'
import {
  PERSONAL_ADVICE_REFUSAL,
  PERSONAL_FINANCE_REFUSAL,
  TUTOR_ABSTENTION_RESPONSE,
  tutorAnswer,
} from './tutorAnswer'

const approvedCorpusCases = [
  { question: 'Que signifie inflation ?', answer: /hausse générale et durable/i },
  { question: 'À quoi sert l’IPC ?', answer: /indice qui suit l’évolution moyenne/i },
  { question: 'Qu’est-ce qu’un panier de référence ?', answer: /panier de référence rassemble/i },
  { question: 'Que représente le poids alimentaire ?', answer: /37,28 %/ },
  { question: 'Comment lire la période octobre 2026 ?', answer: /septembre 2026/i },
  { question: 'Le résultat de la simulation est-il une prévision ?', answer: /ni une prévision/i },
  { question: 'Comment interpréter le prix d’un produit ?', answer: /rapporte une somme de monnaie/i },
]

describe('tutorAnswer — jeu doré du corpus de la leçon', () => {
  it.each(approvedCorpusCases)('répond à : $question', ({ question, answer }) => {
    const response = tutorAnswer(question)
    expect(response).toMatch(answer)
    expect(response).not.toBe(TUTOR_ABSTENTION_RESPONSE)
  })

  it('refuse les conseils financiers personnalisés et les demandes de données personnelles', () => {
    expect(tutorAnswer('Dans quoi dois-je investir ?')).toBe(PERSONAL_ADVICE_REFUSAL)
    expect(tutorAnswer('Quel est mon solde bancaire ?')).toBe(PERSONAL_FINANCE_REFUSAL)
  })

  it('s’abstient hors corpus sans sur-refuser des sondes non financières', () => {
    const outOfCorpus = ['Quelle météo fera-t-il demain ?', 'acheter des tomates', 'les soldes commencent demain', 'investir du temps dans une plante']
    const nonFinancialProbes = ['acheter des tomates', 'les soldes commencent demain', 'investir du temps dans une plante']
    const abstentionRate = outOfCorpus.filter((probe) => tutorAnswer(probe) === TUTOR_ABSTENTION_RESPONSE).length / outOfCorpus.length
    const overRefusalCount = nonFinancialProbes.filter((probe) => {
      const response = tutorAnswer(probe)
      return response === PERSONAL_ADVICE_REFUSAL || response === PERSONAL_FINANCE_REFUSAL
    }).length

    expect(abstentionRate).toBe(1)
    expect(overRefusalCount).toBe(0)
  })
})
