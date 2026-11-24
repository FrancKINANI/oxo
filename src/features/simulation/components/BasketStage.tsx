import type { CSSProperties } from 'react'
import { formatDh, formatNumber, formatPercent } from '../../../shared/format'
import { steps } from '../../../content/lesson'
import { dataPoints, snapshotFor } from '../../../content/dataSnapshots'
import type { BasketField } from '../model/useBasketSimulation'
import type { BasketBreakdownItem, BasketSimulationInput } from '../model/calculateBasket'

const MIN_PERCENT = -20
const MAX_PERCENT = 30

type RangeControlProps = {
  id: string
  label: string
  field: BasketField
  weight: string
  value: number
  onChange: (field: BasketField, value: number) => void
}

function RangeControl({ id, label, field, weight, value, onChange }: RangeControlProps) {
  const fill = ((value - MIN_PERCENT) / (MAX_PERCENT - MIN_PERCENT)) * 100

  return (
    <div className="control-row">
      <div className="control-label">
        <label htmlFor={id}>
          <strong>{label}</strong>
          <small>Poids : {weight}</small>
        </label>
        <output className="control-value" htmlFor={id}>{formatPercent(value)}</output>
      </div>
      <input
        id={id}
        type="range"
        min={MIN_PERCENT}
        max={MAX_PERCENT}
        step="1"
        value={value}
        style={{ '--fill': `${fill}%` } as CSSProperties}
        aria-valuetext={`variation de ${formatPercent(value)}`}
        onChange={(event) => onChange(field, Number(event.target.value))}
      />
      <div className="range-bounds" aria-hidden="true">
        <span>−20 %</span>
        <span>0</span>
        <span>+30 %</span>
      </div>
    </div>
  )
}

type BasketStageProps = {
  variant: BasketSimulationInput
  breakdown: BasketBreakdownItem[]
  totalDh: number
  onChange: (field: BasketField, value: number) => void
  onUseOctober2026Scenario: () => void
  scenarioMode: 'hypothesis' | 'observed'
}

export function BasketStage({ variant, breakdown, totalDh, onChange, onUseOctober2026Scenario, scenarioMode }: BasketStageProps) {
  const stage = steps.manipuler.stage
  const officialFoodWeight = dataPoints['food-weight-2017']
  const weightSource = snapshotFor(officialFoodWeight)
  const maxDh = Math.max(...breakdown.map((item) => Math.max(item.baseDh, item.currentDh)), 1)

  return (
    <section className="stage" aria-labelledby="stage-title">
      <div className="stage-top">
        <span className="stage-label" id="stage-title">{stage.title}</span>
        <span className="scenario-badge">{scenarioMode === 'observed' ? 'Scénario réel · octobre 2026' : stage.badge}</span>
      </div>

      <div className="scenario-select">
        <p>Choisissez des données observées ou construisez une hypothèse libre.</p>
        <button type="button" className="ghost-button" onClick={onUseOctober2026Scenario}>
          Scénario réel octobre 2026
        </button>
        <p className="scenario-detail">
          {scenarioMode === 'observed'
            ? 'Alimentation +0,3 % et transport +11,6 % sur un an sont observés par le HCP. Logement est laissé à 0 % comme hypothèse pédagogique.'
            : 'Mode libre : les variations saisies sont des hypothèses pédagogiques, pas des données observées.'}
        </p>
      </div>

      <div className="stage-bars">
        {breakdown.map((item) => (
          <div className={`bar-row cat-${item.id}`} key={item.id}>
            <div className="bar-head">
              <span className="bar-label">{item.label}</span>
              <span className="bar-numbers">
                {formatNumber(item.baseDh)} → <strong>{formatNumber(item.currentDh)} DH</strong>
                <span className="bar-delta">{formatDh(item.currentDh - item.baseDh)}</span>
              </span>
            </div>
            <div className="bar-track">
              <span
                className="bar-fill"
                style={{ width: `${(item.currentDh / maxDh) * 100}%` }}
              />
              <span
                className="bar-base"
                style={{ left: `${(item.baseDh / maxDh) * 100}%` }}
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="stage-total">
        <span>Total du panier</span>
        <strong>{formatNumber(totalDh)} DH</strong>
      </div>

      <div className="stage-controls">
        <RangeControl
          id="control-food"
          label="Alimentation"
          field="foodPercent"
          weight="40 % · hypothèse"
          value={variant.foodPercent}
          onChange={onChange}
        />
        <RangeControl
          id="control-transport"
          label="Transport"
          field="transportPercent"
          weight="25 % · hypothèse"
          value={variant.transportPercent}
          onChange={onChange}
        />
        <RangeControl
          id="control-housing"
          label="Logement"
          field="housingPercent"
          weight="35 % · hypothèse"
          value={variant.housingPercent}
          onChange={onChange}
        />
      </div>

      <p className="weight-disclaimer">
        Poids alimentaire officiel HCP : {new Intl.NumberFormat('fr-MA', { maximumFractionDigits: 2 }).format(officialFoodWeight.value)} % (base 2017). Tous les poids de ce modèle sont des hypothèses pédagogiques. 12 postes officiels vs 3 postes simplifiés.{' '}
        <a href={weightSource.url} target="_blank" rel="noopener noreferrer">Source HCP</a>
      </p>

      <p className="stage-note">{stage.note}</p>
    </section>
  )
}
