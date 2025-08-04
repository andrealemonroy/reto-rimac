import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Stepper } from './index';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Stepper Component', () => {
  const defaultProps = {
    totalSteps: ['Step 1', 'Step 2', 'Step 3'],
    currentStep: 1,
  };

  it('renders all steps', () => {
    render(
      <TestWrapper>
        <Stepper {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('shows completed steps', () => {
    render(
      <TestWrapper>
        <Stepper {...defaultProps} currentStep={3} />
      </TestWrapper>
    );

    const step1 = screen.getByText('Step 1').closest('.stepper__step');
    const step2 = screen.getByText('Step 2').closest('.stepper__step');

    expect(step1).toHaveClass('stepper__step--completed');
    expect(step2).toHaveClass('stepper__step--completed');
  });

  it('renders back button when backPath is provided', () => {
    render(
      <TestWrapper>
        <Stepper {...defaultProps} backPath="/previous" />
      </TestWrapper>
    );

    const backButton = screen.getByRole('link');
    expect(backButton).toHaveAttribute('href', '/previous');
  });

  it('handles single step', () => {
    render(
      <TestWrapper>
        <Stepper totalSteps={['Only Step']} currentStep={1} />
      </TestWrapper>
    );

    expect(screen.getByText('Only Step')).toBeInTheDocument();
  });

  it('handles step out of bounds', () => {
    render(
      <TestWrapper>
        <Stepper {...defaultProps} currentStep={5} />
      </TestWrapper>
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(
      <TestWrapper>
        <Stepper {...defaultProps} />
      </TestWrapper>
    );

    expect(document.querySelector('.stepper')).toBeInTheDocument();
    expect(document.querySelector('.stepper__step')).toBeInTheDocument();
  });
});
