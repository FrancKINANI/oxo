import { dataPoints, snapshotFor } from '../../../content/dataSnapshots'
import { steps, ipcExample, panierExample, observedDataPointIds } from '../../../content/lesson'
import { formatDate } from '../../../shared/format'
import { BASE_BASKET_DH } from '../../simulation/model/calculateBasket'

const comparisonLabels = {
  'year-over-year': 'sur un an',
  'month-over-month': 'sur un mois',
  'basket-weight': 'du panier de référence',
} as const

function formatPeriod(period: string) {
  if (!/^\d{4}-\d{2}$/.test(period)) return period
  return new Intl.DateTimeFormat('fr-MA', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${period}-01T00:00:00Z`))
}

function formatPercent(value: number) {
  return `${value > 0 ? '+' : ''}${new Intl.NumberFormat('fr-MA', { maximumFractionDigits: 2 }).format(value)} %`
}

export function PriceStage() {
  const stage = steps.observer.stage

  return (
    <section className="stage" aria-labelledby="stage-title">
      <div className="stage-top">
        <span className="stage-label" id="stage-title">{stage.title}</span>
        <span className="scenario-badge">{stage.badge}</span>
      </div>

      <div className="compare-grid">
        <article className="compare-card">
          <span className="stat-label">{panierExample.label}</span>
          <div className="basket-illustration" aria-hidden="true">
            <svg viewBox="0 0 48 48" focusable="false">
              <path d="M7 17h34l-4.5 21H11.5L7 17Z" />
              <path d="M18 17c0-7 12-7 12 0" />
              <path d="M17 23v9M24 23v9M31 23v9" />
            </svg>
          </div>
          <strong className="compare-value">{BASE_BASKET_DH} DH</strong>
          <p>{panierExample.description} Panier fictif simplifié, base mensuelle.</p>
          <span className="tag">{panierExample.tag}</span>
        </article>

        <article className="compare-card ipc">
          <span className="stat-label">{ipcExample.label}</span>
          <div className="ipc-illustration" aria-hidden="true">
            <span /><span /><span />
          </div>
          <strong className="compare-value">{ipcExample.value}</strong>
          <p>{ipcExample.description}</p>
          <span className="tag tag-blue">{ipcExample.tag}</span>
        </article>
      </div>

      <div className="observed-data" aria-label="Données HCP observées">
        {observedDataPointIds.map((id) => {
          const point = dataPoints[id]
          const source = snapshotFor(point)
          return (
            <article className="observed-data-card" key={point.id}>
              <span className="stat-label">{point.series}</span>
              <strong>{formatPercent(point.value)}</strong>
              <p>{comparisonLabels[point.comparison]} · {formatPeriod(point.referencePeriod)} vs {formatPeriod(point.comparisonPeriod)} · {point.geography}</p>
              <small>
                {source.publisher} · publié le {formatDate(source.publicationDate)} · vérifié le {formatDate(source.retrievedAt)} · vérifiée
              </small>
              <a href={source.url} target="_blank" rel="noopener noreferrer">Source HCP</a>
            </article>
          )
        })}
      </div>

      <p className="stage-note">{stage.note}</p>
    </section>
  )
}
