import { BASE_BASKET_DH } from '../../simulation/model/calculateBasket'

export function PriceStage() {
  return (
    <section className="stage" aria-labelledby="stage-title">
      <div className="stage-top">
        <span className="stage-label" id="stage-title">Comparer deux mesures</span>
        <span className="scenario-badge">Donnée observée · hypothèse</span>
      </div>

      <div className="compare-grid">
        <article className="compare-card">
          <span className="stat-label">Votre panier</span>
          <div className="basket-illustration" aria-hidden="true">
            <svg viewBox="0 0 48 48" focusable="false">
              <path d="M7 17h34l-4.5 21H11.5L7 17Z" />
              <path d="M18 17c0-7 12-7 12 0" />
              <path d="M17 23v9M24 23v9M31 23v9" />
            </svg>
          </div>
          <strong className="compare-value">{BASE_BASKET_DH} DH</strong>
          <p>Les produits, quantités et prix que vous choisissez.</p>
          <span className="tag">Cas particulier</span>
        </article>

        <article className="compare-card ipc">
          <span className="stat-label">IPC national</span>
          <div className="ipc-illustration" aria-hidden="true">
            <span /><span /><span />
          </div>
          <strong className="compare-value">Moyenne</strong>
          <p>Sélection représentative de ménages, avec des poids publiés par le HCP.</p>
          <span className="tag tag-blue">Mesure officielle</span>
        </article>
      </div>

      <p className="stage-note">
        Une hausse visible sur votre panier ne suffit pas à conclure à une hausse
        générale des prix.
      </p>
    </section>
  )
}
