// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import { App } from './App'

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn()
  document.documentElement.dataset.theme = 'light'
})

afterEach(cleanup)

function stage() {
  return screen.getByRole('region', { name: /comparer deux mesures|votre panier simulé/i })
}

function total() {
  return screen.getByText('Total du panier').parentElement
}

async function goToSimulation() {
  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: 'Suivant →' }))
  return user
}

describe('App', () => {
  it('ouvre sur l’étape d’observation et compare les deux mesures', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('panier')
    expect(within(stage()).getByText('Votre panier')).toBeInTheDocument()
    expect(within(stage()).getByText('IPC national')).toBeInTheDocument()
    expect(screen.queryByRole('slider')).not.toBeInTheDocument()
  })

  it('passe à l’étape de manipulation et met à jour le total simulé', async () => {
    render(<App />)
    await goToSimulation()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Faites varier votre panier')
    expect(total()).toHaveTextContent('252 DH')

    fireEvent.change(screen.getByLabelText(/alimentation/i), { target: { value: '20' } })

    expect(total()).toHaveTextContent('264 DH')
  })

  it('réinitialise le scénario depuis le bouton d’en-tête', async () => {
    render(<App />)
    const user = await goToSimulation()

    const reset = screen.getByRole('button', { name: /réinitialiser/i })
    expect(reset).toBeDisabled()

    fireEvent.change(screen.getByLabelText(/logement/i), { target: { value: '-10' } })
    expect(reset).toBeEnabled()

    await user.click(reset)
    expect(total()).toHaveTextContent('252 DH')
    expect(reset).toBeDisabled()
  })

  it('répond aux questions du tuteur dans le dock', async () => {
    const user = userEvent.setup()
    render(<App />)

    const dock = screen.getByRole('dialog', { name: /tuteur/i })
    expect(dock).toHaveAttribute('inert')

    await user.click(screen.getByRole('button', { name: 'Tuteur' }))
    expect(dock).not.toHaveAttribute('inert')

    await user.click(
      within(dock).getByRole('button', { name: /différence entre mon panier/i }),
    )

    expect(within(dock).getByText(/Votre panier décrit les dépenses/i)).toBeInTheDocument()
  })
})
