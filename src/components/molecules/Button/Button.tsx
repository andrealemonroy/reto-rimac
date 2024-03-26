import React from 'react';
import './Button.scss';

export const Button = ({
  children,
  onClick,
  type = 'button',
  color = 'primary',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary';
}) => {
  return (
    <button className={`button button--${color}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
