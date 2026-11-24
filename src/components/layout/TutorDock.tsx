import { useRef } from 'react'
import { TutorPanel } from '../../features/tutor/components/TutorPanel'
import { fr } from '../../content/locales/fr'
import { useFocusTrap } from '../../shared/useFocusTrap'

type TutorDockProps = {
  open: boolean
  onOpen: () => void
  onClose: () => void
  onAbstention: () => void
}

export function TutorDock({ open, onOpen, onClose, onAbstention }: TutorDockProps) {
  const dockRef = useRef<HTMLDivElement>(null)
  useFocusTrap(dockRef, open, onClose)

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
        ref={dockRef}
        className={`tutor-dock ${open ? 'open' : ''}`}
        id="tutor-dock"
        role="dialog"
        aria-modal={open}
        aria-label={fr.tutor.aria}
        inert={!open}
      >
        <TutorPanel onClose={onClose} onAbstention={onAbstention} />
      </div>
    </>
  )
}
