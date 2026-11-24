import { useEffect } from 'react'
import { TutorPanel } from '../../features/tutor/components/TutorPanel'
import { fr } from '../../content/locales/fr'

type TutorDockProps = {
  open: boolean
  onOpen: () => void
  onClose: () => void
}

export function TutorDock({ open, onOpen, onClose }: TutorDockProps) {
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
      <button
        className="tutor-fab"
        type="button"
        aria-expanded={open}
        aria-controls="tutor-dock"
        onClick={open ? onClose : onOpen}
      >
        <span aria-hidden="true">✦</span> {fr.tutor.label}
      </button>
      <div
        className={`tutor-dock ${open ? 'open' : ''}`}
        id="tutor-dock"
        role="dialog"
        aria-label={fr.tutor.aria}
        inert={!open}
      >
        <TutorPanel onClose={onClose} />
      </div>
    </>
  )
}
