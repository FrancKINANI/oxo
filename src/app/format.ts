const numberFormat = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 })

export function formatNumber(value: number) {
  return numberFormat.format(value)
}

export function formatPercent(value: number) {
  const sign = value > 0 ? '+' : value < 0 ? '−' : ''
  return `${sign}${numberFormat.format(Math.abs(value))} %`
}

export function formatDh(value: number) {
  const sign = value > 0 ? '+' : value < 0 ? '−' : ''
  return `${sign}${numberFormat.format(Math.abs(value))} DH`
}
