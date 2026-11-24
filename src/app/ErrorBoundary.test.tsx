// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { ErrorBoundary } from './ErrorBoundary'

function Broken(): never {
  throw new Error('échec de rendu simulé')
}

afterEach(cleanup)

describe('ErrorBoundary', () => {
  it('affiche un repli au lieu d’un écran vide', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <Broken />
      </ErrorBoundary>,
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent(/n’a pas pu s’afficher/i)
    expect(screen.getByRole('button', { name: /recharger/i })).toBeInTheDocument()

    spy.mockRestore()
  })
})
