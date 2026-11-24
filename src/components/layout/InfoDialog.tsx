import { useId, useRef } from 'react'
import { formatDate } from '../../shared/format'
import { concepts } from '../../content/concepts'
import { editorialReview, lessonMeta, primarySource } from '../../content/lesson'
import { fr } from '../../content/locales/fr'
import { useFocusTrap } from '../../shared/useFocusTrap'

export type InfoKind = 'glossaire' | 'sources'

type InfoDialogProps = {
  kind: InfoKind
  onClose: () => void
}

const titles: Record<InfoKind, string> = {
  glossaire: fr.dialogs.glossary,
  sources: fr.dialogs.sources,
}

function conceptAnchor(term: string) {
  return `concept-${term.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-')}`
}

export function InfoDialog({ kind, onClose }: InfoDialogProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  useFocusTrap(dialogRef, true, onClose)

  return (
    <div className="modal-layer">
      <div className="modal-scrim" aria-hidden="true" onClick={onClose} />
      <div ref={dialogRef} className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className="modal-head">
          <h2 id={titleId}>{titles[kind]}</h2>
          <button className="icon-button small" type="button" aria-label={fr.dialogs.close} onClick={onClose}>
            <span aria-hidden="true">✕</span>
          </button>
        </header>

        <div className="modal-body">
          {kind === 'glossaire' ? (
            <ul className="glossary">
              {concepts.map((concept) => (
                <li id={conceptAnchor(concept.term)} key={concept.term}>
                  <h3>{concept.term}</h3>
                  <p>{concept.simpleDefinition}</p>
                  {concept.example && <p className="glossary-extra"><strong>{fr.dialogs.conceptExample} </strong>{concept.example}</p>}
                  {concept.method && <p className="glossary-extra"><strong>{fr.dialogs.method} </strong>{concept.method}</p>}
                  {concept.limit && <p className="glossary-extra"><strong>{fr.dialogs.limit} </strong>{concept.limit}</p>}
                  {concept.relatedTerms.length > 0 && (
                    <p className="glossary-extra glossary-related">
                      <strong>{fr.dialogs.relatedConcepts} : </strong>
                      {concept.relatedTerms.map((term, index) => (
                        <span key={term}>{index > 0 ? ', ' : ''}<a href={`#${conceptAnchor(term)}`}>{term}</a></span>
                      ))}
                    </p>
                  )}
                  <small>
                    {concept.source} · {fr.concepts.reviewed} {concept.reviewed}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <div className="sources">
              <p>
                {fr.dialogs.officialSources}
              </p>
              <dl>
                <dt>{fr.dialogs.editor}</dt>
                <dd>{primarySource.publisher}</dd>
                <dt>{fr.dialogs.publication}</dt>
                <dd>{primarySource.title}</dd>
                <dt>{fr.dialogs.referencePeriod}</dt>
                <dd>{primarySource.referencePeriod}</dd>
                <dt>{fr.dialogs.publicationDate}</dt>
                <dd>{formatDate(primarySource.publicationDate)}</dd>
                <dt>{fr.dialogs.lastVerified}</dt>
                <dd>{formatDate(primarySource.checkedAt)}</dd>
                <dt>{fr.dialogs.editorialRevision}</dt>
                <dd>{formatDate(lessonMeta.revision)}</dd>
                <dt>{fr.dialogs.editorialStatus}</dt>
                <dd>{fr.dialogs.editorialToReview} ({formatDate(editorialReview.reviewedAt)})</dd>
              </dl>
              <a href={primarySource.url} target="_blank" rel="noopener noreferrer">
                {fr.dialogs.consultHcp}
              </a>
              <p className="sources-note">
                {fr.dialogs.sourcesDisclaimer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
