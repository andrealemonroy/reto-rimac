import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input Component', () => {
  const defaultProps = {
    name: 'test-input',
    label: 'Test Input',
    type: 'text' as const,
  };
  it('renders with placeholder', () => {
    render(<Input {...defaultProps} placeholder="Enter text here" />);
    const input = screen.getByPlaceholderText('Enter text here');
    expect(input).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(<Input {...defaultProps} error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should render Input component', () => {
    const { container } = render(<Input {...defaultProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
