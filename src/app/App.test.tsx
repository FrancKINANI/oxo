// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import { App } from './App'
import { LEARNING_STORAGE_KEY } from '../features/lesson/model/learningEvents'

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn()
  document.documentElement.dataset.theme = 'light'
  window.history.replaceState(null, '', '/')
  localStorage.removeItem(LEARNING_STORAGE_KEY)
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
    expect(within(stage()).getAllByText('+1,9 %')).toHaveLength(2)
    expect(within(stage()).getByText('Produits alimentaires')).toBeInTheDocument()
    expect(within(stage()).getByText('Transport')).toBeInTheDocument()
    expect(within(stage()).getByText('Légumes')).toBeInTheDocument()
    expect(within(stage()).queryByText(/12 postes officiels vs 3 postes simplifiés/i)).not.toBeInTheDocument()
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

  it('charge le scénario réel HCP puis revient au mode hypothèse après modification', async () => {
    const user = userEvent.setup()
    render(<App />)
    await goToSimulation()

    await user.click(screen.getByRole('button', { name: 'Scénario réel octobre 2026' }))
    expect(screen.getByText(/Alimentation \+0,3 % et transport \+11,6 % sur un an sont observés/i)).toBeInTheDocument()
    expect(screen.getByText(/Logement est laissé à 0 % comme hypothèse pédagogique/i)).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/alimentation/i), { target: { value: '1' } })
    expect(screen.getByText(/Mode libre : les variations saisies sont des hypothèses pédagogiques/i)).toBeInTheDocument()
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

  it('reflète l’étape dans l’URL pour un partage direct', async () => {
    render(<App />)
    expect(window.location.search).toBe('')

    await goToSimulation()
    expect(window.location.search).toBe('?etape=manipuler')
  })

  it('ouvre directement l’étape demandée par l’URL', () => {
    window.history.replaceState(null, '', '/?etape=manipuler')
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Faites varier votre panier')
  })

  it('termine la boucle, explique un distracteur et conserve la progression locale', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Suivant →' }))
    fireEvent.change(screen.getByLabelText(/alimentation/i), { target: { value: '12' } })
    await user.click(screen.getByRole('button', { name: 'Suivant →' }))
    expect(window.location.search).toBe('?etape=interpreter')
    expect(screen.getAllByRole('group')).toHaveLength(4)

    const reflection = 'Mon panier a des poids différents de la moyenne nationale.'
    await user.type(screen.getByLabelText('Votre explication'), reflection)
    expect(screen.getByText('panier — mentionné')).toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: /L’inflation générale a forcément augmenté/i }))
    await user.click(screen.getAllByRole('button', { name: 'Vérifier ma réponse' })[0])
    expect(screen.getByRole('status')).toHaveTextContent(/Un seul prix peut augmenter pour des raisons propres/i)

    await user.click(screen.getByRole('button', { name: 'Suivant →' }))
    expect(window.location.search).toBe('?etape=synthese')
    expect(screen.getByRole('heading', { name: 'Votre progression sur cet appareil' })).toBeInTheDocument()
    expect(screen.getByText(/Le prix des tomates augmente/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Terminer la leçon' }))
    const saved = JSON.parse(localStorage.getItem(LEARNING_STORAGE_KEY) ?? '{}')
    expect(saved.version).toBe(1)
    expect(saved.events).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'step_completed', stepId: 'observer' }),
      expect.objectContaining({ type: 'step_completed', stepId: 'manipuler' }),
      expect.objectContaining({ type: 'hypothesis_changed', field: 'foodPercent', value: 12 }),
      expect.objectContaining({ type: 'quiz_answered', itemId: 'one-price-is-not-inflation', correct: false, misconceptionId: 'hausse-un-prix-egale-inflation' }),
      expect.objectContaining({ type: 'step_completed', stepId: 'interpreter' }),
      expect.objectContaining({ type: 'step_completed', stepId: 'synthese' }),
    ]))
    expect(localStorage.getItem(LEARNING_STORAGE_KEY)).not.toContain(reflection)
  })

  it('enregistre une abstention sans conserver la question posée', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Tuteur' }))
    const dock = screen.getByRole('dialog', { name: /tuteur/i })
    await user.type(within(dock).getByLabelText('Votre question'), 'Quelle météo fera-t-il demain ?')
    await user.click(within(dock).getByRole('button', { name: 'Envoyer' }))

    const saved = localStorage.getItem(LEARNING_STORAGE_KEY) ?? ''
    expect(saved).toContain('tutor_abstention')
    expect(saved).not.toContain('Quelle météo fera-t-il demain')
  })

  it('ouvre le glossaire et le referme avec Échap', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Glossaire' }))

    const dialog = screen.getByRole('dialog', { name: 'Glossaire' })
    expect(within(dialog).getByText('Inflation')).toBeInTheDocument()
    expect(within(dialog).getByText(/Indice des prix à la consommation/i)).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: 'Glossaire' })).not.toBeInTheDocument()
  })

  it('affiche les sources et leur date de vérification', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Sources' }))

    const dialog = screen.getByRole('dialog', { name: /sources/i })
    expect(within(dialog).getByText('Haut-Commissariat au Plan')).toBeInTheDocument()
    expect(within(dialog).getAllByText('24 nov. 2026')).toHaveLength(2)
    expect(within(dialog).getAllByText('20 nov. 2026')).toHaveLength(1)
    expect(within(dialog).getByText('octobre 2026')).toBeInTheDocument()
    expect(within(dialog).getByText('À valider (24 nov. 2026)')).toBeInTheDocument()
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
