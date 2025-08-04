import React from 'react';
import './Card.scss';
import { useForm } from 'react-hook-form';

interface CardSelectionProps {
  id: string;
  label: string;
  description: string;
  register: ReturnType<typeof useForm>['register'];
  selectedValue: string;
  icon: string;
}

export const CardSelection: React.FC<CardSelectionProps> = ({
  id,
  label,
  description,
  register,
  selectedValue,
  icon,
}) => {
  return (
    <div className={`card ${selectedValue === id ? 'card--selected' : ''}`}>
      <input
        {...register('cardSelection')}
        type="radio"
        id={id}
        value={id}
        className="card__input"
        defaultChecked={selectedValue === id}
      />
      <label htmlFor={id} className="card__label">
        <div className="card__checkmark">
          {selectedValue === id ? (
            <div className="card__checkmark-selected">
              <img src="/images/check.svg" alt="Seleccionado" />
            </div>
          ) : (
            <div className="card__radio">
              <div className="card__radio-dot"></div>
            </div>
          )}
        </div>
        <div className="card__icon">
          <img
            src={`/images/${icon}`}
            alt={label}
            className="card__icon-image"
          />
        </div>
        <div className="card__info">
          <div className="card__title">{label}</div>
          <div className="card__description">{description}</div>
        </div>
      </label>
    </div>
  );
};
