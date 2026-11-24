import type { CSSProperties } from 'react'
import { formatDh, formatNumber, formatPercent } from '../../../shared/format'
import { steps } from '../../../content/lesson'
import { dataPoints, snapshotFor } from '../../../content/dataSnapshots'
import { fr } from '../../../content/locales/fr'
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
          <small>{fr.simulation.weightCaption} : {weight}</small>
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
        aria-valuetext={fr.simulation.controlValue(formatPercent(value))}
        onChange={(event) => onChange(field, Number(event.target.value))}
      />
      <div className="range-bounds" aria-hidden="true">
        <span>{fr.simulation.lowerBound}</span>
        <span>{fr.simulation.neutralBound}</span>
        <span>{fr.simulation.upperBound}</span>
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
        <span className="scenario-badge">{scenarioMode === 'observed' ? fr.simulation.realScenarioBadge : stage.badge}</span>
      </div>

      <div className="scenario-select">
        <p>{fr.simulation.chooseMode}</p>
        <button type="button" className="ghost-button" onClick={onUseOctober2026Scenario}>
          {fr.simulation.realScenario}
        </button>
        <p className="scenario-detail">
          {scenarioMode === 'observed' ? fr.simulation.observedDetail : fr.simulation.freeDetail}
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
        <span>{fr.simulation.total}</span>
        <strong>{formatNumber(totalDh)} DH</strong>
      </div>

      <div className="stage-controls">
        <RangeControl
          id="control-food"
          label="Alimentation"
          field="foodPercent"
          weight={fr.simulation.weight(40)}
          value={variant.foodPercent}
          onChange={onChange}
        />
        <RangeControl
          id="control-transport"
          label="Transport"
          field="transportPercent"
          weight={fr.simulation.weight(25)}
          value={variant.transportPercent}
          onChange={onChange}
        />
        <RangeControl
          id="control-housing"
          label="Logement"
          field="housingPercent"
          weight={fr.simulation.weight(35)}
          value={variant.housingPercent}
          onChange={onChange}
        />
      </div>

      <p className="weight-disclaimer">
        {fr.simulation.weightDisclaimer(`${new Intl.NumberFormat('fr-MA', { maximumFractionDigits: 2 }).format(officialFoodWeight.value)} %`)}{' '}
        <a href={weightSource.url} target="_blank" rel="noopener noreferrer">{fr.price.source}</a>
      </p>

      <p className="stage-note">{stage.note}</p>
    </section>
  )
}
