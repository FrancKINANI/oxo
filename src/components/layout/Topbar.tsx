import type { StepId } from '../../shared/steps'
import type { Theme } from '../../shared/theme'
import type { InfoKind } from './InfoDialog'
import { fr } from '../../content/locales/fr'

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
          aria-label={fr.app.openCourse}
          aria-expanded={navOpen}
          onClick={onOpenNav}
        >
          <span aria-hidden="true">☰</span>
        </button>
        <a className="brand" href="#lesson" aria-label={fr.app.brandAria}>
          <span className="brand-mark" aria-hidden="true">
            <span /><span /><span />
          </span>
          <span className="brand-text">
            <strong>OXO</strong>
            <small>{fr.app.brandTagline}</small>
          </span>
        </a>
      </div>

      <nav className="mode-tabs" aria-label={fr.app.modes}>
        <button
          className={`mode-tab ${step === 'observer' ? 'active' : ''}`}
          type="button"
          aria-current={step === 'observer' ? 'page' : undefined}
          onClick={() => onSelectStep('observer')}
        >
          {fr.app.learn}
        </button>
        <button
          className={`mode-tab ${step === 'manipuler' ? 'active' : ''}`}
          type="button"
          aria-current={step === 'manipuler' ? 'page' : undefined}
          onClick={() => onSelectStep('manipuler')}
        >
          {fr.app.simulate}
        </button>
        <button className="mode-tab" type="button" onClick={() => onOpenInfo('sources')}>
          {fr.app.sources}
        </button>
        <button className="mode-tab" type="button" onClick={() => onOpenInfo('glossaire')}>
          {fr.app.glossary}
        </button>
      </nav>

      <div className="topbar-actions">
        <span className="language-pill" aria-label={fr.app.languageAria}>
          {fr.app.languageShort}
        </span>
        <button
          className="icon-button"
          type="button"
          aria-label={dark ? fr.app.switchToLight : fr.app.switchToDark}
          aria-pressed={dark}
          onClick={onThemeToggle}
        >
          <span aria-hidden="true">{dark ? '☀' : '☾'}</span>
        </button>
      </div>
    </header>
  )
}
