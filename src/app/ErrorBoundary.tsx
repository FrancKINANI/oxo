import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { failed: boolean }

/**
 * Filet de sécurité de dernier recours : une erreur de rendu ne doit jamais
 * laisser un écran blanc en production. Le point d'ancrage de collecte
 * (Sentry, endpoint interne) se branche dans componentDidCatch.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Erreur de rendu non gérée', error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <div className="app">
        <section className="fallback" role="alert">
          <h1>Le contenu n’a pas pu s’afficher</h1>
          <p>
            Rechargez la page. Si le problème persiste, revenez plus tard : la leçon
            reste disponible, aucune donnée n’a été perdue.
          </p>
          <button className="primary-button" type="button" onClick={() => window.location.reload()}>
            Recharger la page
          </button>
        </section>
      </div>
    )
  }
}
