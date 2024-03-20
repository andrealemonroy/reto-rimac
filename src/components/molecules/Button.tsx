import React from 'react';

export const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};
