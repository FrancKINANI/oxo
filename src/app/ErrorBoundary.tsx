import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { fr } from '../content/locales/fr'

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
    console.error(fr.error.log, error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <div className="app">
        <section className="fallback" role="alert">
          <h1>{fr.error.title}</h1>
          <p>{fr.error.body}</p>
          <button className="primary-button" type="button" onClick={() => window.location.reload()}>
            {fr.error.reload}
          </button>
        </section>
      </div>
    )
  }
}
