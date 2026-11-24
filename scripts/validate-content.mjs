import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { lessonManifest, validateLessonManifest } from '../src/content/lessonManifest.ts'
import { conceptGraph, validateConceptGraph } from '../src/content/conceptGraph.ts'

const repositoryRoot = fileURLToPath(new URL('../', import.meta.url))
const conceptsDirectory = join(repositoryRoot, 'content/morocco/concepts')
const files = (await readdir(conceptsDirectory)).filter((file) => file.endsWith('.md'))
const conceptTerms = new Set()

if (files.length === 0) throw new Error('Validation du contenu impossible : aucune fiche de concept trouvée')

for (const file of files) {
  const content = await readFile(join(conceptsDirectory, file), 'utf8')
  const title = content.match(/^#\s+(.+)$/m)?.[1]?.trim()
  const required = ['Définition simple', 'Source', 'Date de revue']
  const missing = required.filter((field) => !new RegExp(`^\\*\\*${field}\\*\\*\\s*:\\s*.+$`, 'm').test(content))
  if (!title || missing.length) {
    throw new Error(`Fiche de concept invalide (${file}) : champ(s) manquant(s) — ${[!title && 'titre', ...missing].filter(Boolean).join(', ')}`)
  }
  conceptTerms.add(title)
}

validateConceptGraph()
for (const node of Object.values(conceptGraph)) {
  if (!conceptTerms.has(node.term)) throw new Error(`Graphe de concepts invalide : fiche absente pour ${node.term}`)
}
validateLessonManifest(lessonManifest)
console.log(`Contenu validé : ${files.length} concepts, ${lessonManifest.blocks ? 5 : 0} blocs de leçon.`)
