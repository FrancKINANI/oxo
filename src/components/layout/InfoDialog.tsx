import { useEffect, useId, useRef } from 'react'
import { formatDate } from '../../app/format'
import { concepts } from '../../content/concepts'
import { lessonMeta, primarySource } from '../../content/lesson'

export type InfoKind = 'glossaire' | 'sources'

type InfoDialogProps = {
  kind: InfoKind
  onClose: () => void
}

const titles: Record<InfoKind, string> = {
  glossaire: 'Glossaire',
  sources: 'Sources et méthode',
}

export function InfoDialog({ kind, onClose }: InfoDialogProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="modal-layer">
      <div className="modal-scrim" aria-hidden="true" onClick={onClose} />
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className="modal-head">
          <h2 id={titleId}>{titles[kind]}</h2>
          <button ref={closeRef} className="icon-button small" type="button" aria-label="Fermer" onClick={onClose}>
            <span aria-hidden="true">✕</span>
          </button>
        </header>

        <div className="modal-body">
          {kind === 'glossaire' ? (
            <ul className="glossary">
              {concepts.map((concept) => (
                <li key={concept.term}>
                  <h3>{concept.term}</h3>
                  <p>{concept.simpleDefinition}</p>
                  {concept.example && <p className="glossary-extra"><strong>Exemple marocain · </strong>{concept.example}</p>}
                  {concept.method && <p className="glossary-extra"><strong>Méthode · </strong>{concept.method}</p>}
                  {concept.limit && <p className="glossary-extra"><strong>Limite · </strong>{concept.limit}</p>}
                  <small>
                    {concept.source} · revue le {concept.reviewed}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <div className="sources">
              <p>
                Les chiffres affichés proviennent de publications officielles. Les variations
                du simulateur sont des hypothèses pédagogiques, pas des données publiées.
              </p>
              <dl>
                <dt>Éditeur</dt>
                <dd>{primarySource.publisher}</dd>
                <dt>Publication</dt>
                <dd>{primarySource.title}</dd>
                <dt>Période de référence</dt>
                <dd>{primarySource.referencePeriod}</dd>
                <dt>Dernière vérification</dt>
                <dd>{formatDate(primarySource.checkedAt)}</dd>
                <dt>Révision éditoriale</dt>
                <dd>{formatDate(lessonMeta.revision)}</dd>
              </dl>
              <a href={primarySource.url} target="_blank" rel="noopener noreferrer">
                Consulter la publication du HCP
              </a>
              <p className="sources-note">
                OXO ne fournit ni conseil financier ni prévision. Une donnée non vérifiée
                n’est pas publiée : elle est signalée comme hypothèse.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
