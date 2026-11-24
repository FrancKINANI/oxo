import { useEffect } from 'react'
import type { StepId } from '../../shared/steps'

type CourseNavProps = {
  step: StepId
  open: boolean
  onSelectStep: (step: StepId) => void
  onClose: () => void
}

const upcomingModules = [
  { index: '02', title: 'Budget public', lessons: '2 activités' },
  { index: '03', title: 'Monnaie et taux', lessons: '2 activités' },
]

export function CourseNav({ step, open, onSelectStep, onClose }: CourseNavProps) {
  // Fermeture au clavier du tiroir mobile.
  useEffect(() => {
    if (!open) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <>
      {open && <div className="scrim" aria-hidden="true" onClick={onClose} />}
      <aside className={`course-nav ${open ? 'open' : ''}`} aria-label="Parcours">
        <div className="nav-heading">
          <span>Parcours</span>
          <button className="nav-close" type="button" aria-label="Fermer le parcours" onClick={onClose}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <nav className="nav-tree">
          <section className="nav-group">
            <div className="nav-group-head">
              <span className="nav-group-icon">01</span>
              <strong>Prix et inflation</strong>
              <span className="nav-count">1/2</span>
            </div>
            <ul className="nav-list">
              <li>
                <button
                  className={`nav-item ${step === 'observer' ? 'active' : ''}`}
                  type="button"
                  aria-current={step === 'observer' ? 'step' : undefined}
                  onClick={() => onSelectStep('observer')}
                >
                  Pourquoi mon panier augmente
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${step === 'manipuler' ? 'active' : ''}`}
                  type="button"
                  aria-current={step === 'manipuler' ? 'step' : undefined}
                  onClick={() => onSelectStep('manipuler')}
                >
                  Faites varier votre panier
                </button>
              </li>
            </ul>
          </section>

          {upcomingModules.map((module) => (
            <section className="nav-group is-soon" key={module.index}>
              <div className="nav-group-head">
                <span className="nav-group-icon">{module.index}</span>
                <strong>{module.title}</strong>
                <span className="nav-count">À venir</span>
              </div>
              <p className="nav-soon">{module.lessons} — bientôt disponible</p>
            </section>
          ))}
        </nav>

        <div className="progress-card">
          <div className="progress-card-head">
            <span>Progression</span>
            <strong>1 / 4</strong>
          </div>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={4}
            aria-valuenow={1}
            aria-label="Modules terminés"
          >
            <span style={{ width: '25%' }} />
          </div>
          <p>Module en cours : prix et inflation.</p>
        </div>
      </aside>
    </>
  )
}
