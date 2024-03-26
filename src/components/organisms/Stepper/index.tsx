// Stepper.tsx
import React from 'react';
import './Stepper.scss';

interface StepperProps {
  totalSteps: string[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({
  totalSteps,
  currentStep,
}) => {
  return (
    <div className="stepper">
      {totalSteps.map((step, index) => (
        <div
          key={index}
          className={`stepper__step ${
            index < currentStep ? 'stepper__step--completed' : ''
          }`}
        >
          <div className="stepper__step-number">{index + 1}</div>
          <div className="stepper__step-title">{step}</div>
          {index < totalSteps.length - 1 && (
            <div className="stepper__step-line">
                <img src="images/progress-divider.png" alt="progress-divider" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
