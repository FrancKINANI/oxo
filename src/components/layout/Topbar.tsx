import type { StepId } from '../../shared/steps'
import type { Theme } from '../../shared/theme'
import type { InfoKind } from './InfoDialog'

type TopbarProps = {
  step: StepId
  navOpen: boolean
  theme: Theme
  onSelectStep: (step: StepId) => void
  onOpenNav: () => void
  onThemeToggle: () => void
  onOpenInfo: (kind: InfoKind) => void
}

export function Topbar({
  step,
  navOpen,
  theme,
  onSelectStep,
  onOpenNav,
  onThemeToggle,
  onOpenInfo,
}: TopbarProps) {
  const dark = theme === 'dark'

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="nav-toggle"
          type="button"
          aria-label="Ouvrir le parcours"
          aria-expanded={navOpen}
          onClick={onOpenNav}
        >
          <span aria-hidden="true">☰</span>
        </button>
        <a className="brand" href="#lesson" aria-label="OXO — haut de la leçon">
          <span className="brand-mark" aria-hidden="true">
            <span /><span /><span />
          </span>
          <span className="brand-text">
            <strong>OXO</strong>
            <small>Économie au Maroc</small>
          </span>
        </a>
      </div>

      <nav className="mode-tabs" aria-label="Modes">
        <button
          className={`mode-tab ${step === 'observer' ? 'active' : ''}`}
          type="button"
          aria-current={step === 'observer' ? 'page' : undefined}
          onClick={() => onSelectStep('observer')}
        >
          Apprendre
        </button>
        <button
          className={`mode-tab ${step === 'manipuler' ? 'active' : ''}`}
          type="button"
          aria-current={step === 'manipuler' ? 'page' : undefined}
          onClick={() => onSelectStep('manipuler')}
        >
          Simuler
        </button>
        <button className="mode-tab" type="button" onClick={() => onOpenInfo('sources')}>
          Sources
        </button>
        <button className="mode-tab" type="button" onClick={() => onOpenInfo('glossaire')}>
          Glossaire
        </button>
      </nav>

      <div className="topbar-actions">
        <span className="language-pill" aria-label="Langue du contenu : français">
          FR
        </span>
        <button
          className="icon-button"
          type="button"
          aria-label={dark ? 'Passer au thème clair' : 'Passer au thème sombre'}
          aria-pressed={dark}
          onClick={onThemeToggle}
        >
          <span aria-hidden="true">{dark ? '☀' : '☾'}</span>
        </button>
      </div>
    </header>
  )
}
