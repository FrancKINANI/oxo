const numberFormat = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 })

const dateFormat = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

/** Formate une date ISO (YYYY-MM-DD) sans décalage de fuseau. */
export function formatDate(iso: string) {
  return dateFormat.format(new Date(`${iso}T00:00:00`))
}

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
