import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useFocusTrap<T extends HTMLElement>(containerRef: { current: T | null }, active: boolean, onClose: () => void) {
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const target = containerRef.current
    if (!active || !target) return
    const container: T = target

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusable = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      .filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true')

    const first = focusable()[0]
    if (first) first.focus()
    else {
      container.tabIndex = -1
      container.focus()
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab') return

      const items = focusable()
      if (items.length === 0) {
        event.preventDefault()
        container.focus()
        return
      }
      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      const current = document.activeElement
      if (event.shiftKey && (current === firstItem || !container.contains(current))) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && (current === lastItem || !container.contains(current))) {
        event.preventDefault()
        firstItem.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [active, containerRef])
}
