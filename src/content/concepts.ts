/**
 * Les fiches de concepts sont rédigées en Markdown dans content/morocco/concepts.
 * Elles sont compilées dans le bundle : le format est donc validé par un test
 * (src/content/concepts.test.ts) qui bloque la CI si une fiche est incomplète.
 */

export type Concept = {
  term: string
  simpleDefinition: string
  example?: string
  method?: string
  source: string
  limit?: string
  reviewed: string
}

const files = import.meta.glob('../../content/morocco/concepts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const requiredFields = ['Définition simple', 'Source', 'Date de revue'] as const

export function parseConceptMarkdown(file: string, raw: string): Concept {
  const lines = raw.split('\n')
  const term = lines.find((line) => line.startsWith('# '))?.slice(2).trim()
  const fields: Record<string, string> = {}

  for (const line of lines) {
    const match = line.match(/^\*\*(.+?)\*\*\s*:\s*(.+)$/)
    if (match) fields[match[1].trim()] = match[2].trim()
  }

  const missing = [term ? null : 'titre', ...requiredFields.filter((field) => !fields[field])]
    .filter(Boolean)
    .join(', ')
  if (missing) {
    throw new Error(`Fiche de concept invalide (${file}) : champ manquant — ${missing}`)
  }

  return {
    term: term as string,
    simpleDefinition: fields['Définition simple'],
    example: fields['Exemple marocain'],
    method: fields['Méthode'],
    source: fields['Source'],
    limit: fields['Limite'],
    reviewed: fields['Date de revue'],
  }
}

export const concepts: Concept[] = Object.entries(files)
  .map(([file, raw]) => parseConceptMarkdown(file, raw))
  .sort((a, b) => a.term.localeCompare(b.term, 'fr'))
