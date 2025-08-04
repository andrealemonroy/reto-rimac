import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders with default size', () => {
    render(<LoadingSpinner />);
    const spinner = document.querySelector('.loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('loading-spinner--medium');
  });

  it('renders with small size', () => {
    render(<LoadingSpinner size="small" />);
    const spinner = document.querySelector('.loading-spinner');
    expect(spinner).toHaveClass('loading-spinner--small');
  });

  it('renders with large size', () => {
    render(<LoadingSpinner size="large" />);
    const spinner = document.querySelector('.loading-spinner');
    expect(spinner).toHaveClass('loading-spinner--large');
  });

  it('applies base CSS class', () => {
    render(<LoadingSpinner />);
    const spinner = document.querySelector('.loading-spinner');
    expect(spinner).toHaveClass('loading-spinner');
  });

  it('renders default message', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(<LoadingSpinner message="Loading data..." />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('does not render message when message is empty', () => {
    render(<LoadingSpinner message="" />);
    const message = document.querySelector('.loading-spinner__message');
    expect(message).not.toBeInTheDocument();
  });

  it('contains visual spinner element', () => {
    render(<LoadingSpinner />);
    const circle = document.querySelector('.loading-spinner__circle');
    expect(circle).toBeInTheDocument();
  });
});
