// Applique le thème avant le premier rendu pour éviter un flash clair.
// Fichier séparé (et non inline) pour respecter une CSP sans 'unsafe-inline'.
(function () {
  try {
    var stored = localStorage.getItem('oxo-theme')
    var dark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  } catch {
    document.documentElement.dataset.theme = 'light'
  }
})()
