import { fr } from './locales/fr.ts'

export type ConceptId = keyof typeof fr.concepts.ids

export type ConceptNode = {
  id: ConceptId
  term: string
  prerequisites: ConceptId[]
}

export const conceptGraph: Record<ConceptId, ConceptNode> = {
  inflation: {
    id: 'inflation',
    term: fr.concepts.terms.inflation,
    prerequisites: [...fr.concepts.prerequisites.inflation],
  },
  ipc: {
    id: 'ipc',
    term: fr.concepts.terms.ipc,
    prerequisites: [...fr.concepts.prerequisites.ipc],
  },
}

export function validateConceptGraph(graph: Record<ConceptId, ConceptNode> = conceptGraph): void {
  for (const [id, node] of Object.entries(graph)) {
    if (node.id !== id) throw new Error(`Concept invalide : l’identifiant de nœud ne correspond pas à ${id}`)
    if (!node.term.trim()) throw new Error(`Concept invalide (${id}) : terme manquant`)
    for (const prerequisite of node.prerequisites) {
      if (!graph[prerequisite]) throw new Error(`Concept invalide (${id}) : prérequis inconnu ${prerequisite}`)
      if (prerequisite === id) throw new Error(`Concept invalide (${id}) : prérequis circulaire`)
    }
  }
}

validateConceptGraph()
