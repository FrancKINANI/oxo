export type Theme = 'light' | 'dark'

const THEME_KEY = 'oxo-theme'

/** Le thème initial est posé par le script inline de index.html. */
export function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

/** Applique le thème et le mémorise, sans échouer en navigation privée. */
export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // Stockage indisponible : le thème reste valable pour la session.
  }
}
