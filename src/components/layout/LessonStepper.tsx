import { STEPS, stepNumber } from '../../shared/steps'
import type { StepId } from '../../shared/steps'
import { fr } from '../../content/locales/fr'

type LessonStepperProps = {
  step: StepId
  onSelectStep: (step: StepId) => void
}

export function LessonStepper({ step, onSelectStep }: LessonStepperProps) {
  return (
    <nav className="lesson-stepper" aria-label={fr.lesson.stepperAria}>
      <span className="stepper-caption">{fr.lesson.inThisLesson}</span>
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
      <span className="stepper-count">{fr.lesson.stepOf(stepNumber(step), STEPS.length)}</span>
    </nav>
  )
}
