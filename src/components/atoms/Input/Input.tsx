import React from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'rounded';
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = 'default',
  helperText,
  className = '',
  ...props
}) => {
  const inputClasses = [
    'input',
    `input--${variant}`,
    error ? 'input--error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input__label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && <span className="input__error">{error}</span>}
      {helperText && !error && <span className="input__helper">{helperText}</span>}
    </div>
  );
};
