import type { CSSProperties } from 'react'
import { formatDh, formatNumber, formatPercent } from '../../../shared/format'
import { steps } from '../../../content/lesson'
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
}

export function BasketStage({ variant, breakdown, totalDh, onChange }: BasketStageProps) {
  const stage = steps.manipuler.stage
  const maxDh = Math.max(...breakdown.map((item) => Math.max(item.baseDh, item.currentDh)), 1)

  return (
    <section className="stage" aria-labelledby="stage-title">
      <div className="stage-top">
        <span className="stage-label" id="stage-title">{stage.title}</span>
        <span className="scenario-badge">{stage.badge}</span>
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
          weight="40 %"
          value={variant.foodPercent}
          onChange={onChange}
        />
        <RangeControl
          id="control-transport"
          label="Transport"
          field="transportPercent"
          weight="25 %"
          value={variant.transportPercent}
          onChange={onChange}
        />
        <RangeControl
          id="control-housing"
          label="Logement"
          field="housingPercent"
          weight="35 %"
          value={variant.housingPercent}
          onChange={onChange}
        />
      </div>

      <p className="stage-note">{stage.note}</p>
    </section>
  )
}
