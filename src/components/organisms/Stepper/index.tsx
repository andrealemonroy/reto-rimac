import React from 'react';
import './Stepper.scss';
import { Link } from 'react-router-dom';

interface StepperProps {
  totalSteps: string[];
  currentStep: number;
  backPath?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  totalSteps,
  currentStep,
  backPath,
}) => {
  return (
    <div className="stepper">
      <div className="stepper__back">
        <Link to={backPath || '/'}>
          <img src="images/back-icon.svg" alt="back-icon" />
        </Link>
      </div>
      <div className="stepper-mobile">
        PASO {currentStep} DE {totalSteps.length}
      </div>
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
