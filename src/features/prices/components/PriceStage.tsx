import { steps, ipcExample, panierExample } from '../../../content/lesson'
import { BASE_BASKET_DH } from '../../simulation/model/calculateBasket'

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
          <p>{panierExample.description}</p>
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

      <p className="stage-note">{stage.note}</p>
    </section>
  )
}
