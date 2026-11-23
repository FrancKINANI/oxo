import { STEPS, stepNumber } from '../../app/steps'
import type { StepId } from '../../app/steps'

type LessonStepperProps = {
  step: StepId
  onSelectStep: (step: StepId) => void
}

export function LessonStepper({ step, onSelectStep }: LessonStepperProps) {
  return (
    <nav className="lesson-stepper" aria-label="Étapes de la leçon">
      <span className="stepper-caption">Dans cette leçon</span>
      <ol>
        {STEPS.map((item, index) => (
          <li key={item.id} className={item.id === step ? 'current' : ''}>
            <button
              type="button"
              aria-current={item.id === step ? 'step' : undefined}
              onClick={() => onSelectStep(item.id)}
            >
              <span className="stepper-dot" aria-hidden="true">{index + 1}</span>
              <span className="stepper-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ol>
      <span className="stepper-count">Étape {stepNumber(step)} sur {STEPS.length}</span>
    </nav>
  )
}
