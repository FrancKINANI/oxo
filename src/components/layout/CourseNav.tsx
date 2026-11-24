import { useEffect } from 'react'
import type { StepId } from '../../shared/steps'
import { fr } from '../../content/locales/fr'

type CourseNavProps = {
  step: StepId
  open: boolean
  onSelectStep: (step: StepId) => void
  onClose: () => void
}

const upcomingModules = fr.navigation.upcomingModules

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
      <aside className={`course-nav ${open ? 'open' : ''}`} aria-label={fr.navigation.aria}>
        <div className="nav-heading">
          <span>{fr.navigation.title}</span>
          <button className="nav-close" type="button" aria-label={fr.app.closeCourse} onClick={onClose}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <nav className="nav-tree">
          <section className="nav-group">
            <div className="nav-group-head">
              <span className="nav-group-icon">{fr.course.moduleIndex}</span>
              <strong>{fr.navigation.module}</strong>
              <span className="nav-count">{fr.course.currentCount}</span>
            </div>
            <ul className="nav-list">
              <li>
                <button
                  className={`nav-item ${step === 'observer' ? 'active' : ''}`}
                  type="button"
                  aria-current={step === 'observer' ? 'step' : undefined}
                  onClick={() => onSelectStep('observer')}
                >
                  {fr.navigation.steps[0]}
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${step === 'manipuler' ? 'active' : ''}`}
                  type="button"
                  aria-current={step === 'manipuler' ? 'step' : undefined}
                  onClick={() => onSelectStep('manipuler')}
                >
                  {fr.navigation.steps[1]}
                </button>
              </li>
            </ul>
          </section>

          {upcomingModules.map((module) => (
            <section className="nav-group is-soon" key={module.index}>
              <div className="nav-group-head">
                <span className="nav-group-icon">{module.index}</span>
                <strong>{module.title}</strong>
                <span className="nav-count">{fr.navigation.upcoming}</span>
              </div>
              <p className="nav-soon">{module.lessons} — {fr.navigation.soon}</p>
            </section>
          ))}
        </nav>

        <div className="progress-card">
          <div className="progress-card-head">
            <span>{fr.navigation.progress}</span>
            <strong>{fr.course.completedCount}</strong>
          </div>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={4}
            aria-valuenow={1}
            aria-label={fr.navigation.completedModules}
          >
            <span style={{ width: fr.course.progressPercent }} />
          </div>
          <p>{fr.navigation.moduleInProgress}</p>
        </div>
      </aside>
    </>
  )
}
