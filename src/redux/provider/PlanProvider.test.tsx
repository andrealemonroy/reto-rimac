import React from 'react';
import { render, screen } from '@testing-library/react';
import InsuranceApplicationWrapper, { PlanProvider } from './PlanProvider';
import { useInsuranceApplication } from '../context/PlanContext';

jest.mock('../context/PlanContext', () => ({
  InsuranceApplicationProvider: ({ children }: any) => (
    <div data-testid="insurance-provider">{children}</div>
  ),
  useInsuranceApplication: jest.fn(),
}));

const TestComponent = () => {
  const { state } = useInsuranceApplication();
  return <div data-testid="test-child">Test Component</div>;
};

describe('PlanProvider', () => {
  beforeEach(() => {
    (useInsuranceApplication as jest.Mock).mockReturnValue({
      state: {
        user: { currentUser: null },
        plans: { selectedPlan: null, availablePlans: [] },
      },
      dispatch: jest.fn(),
    });
  });

  it('renders children correctly with InsuranceApplicationWrapper', () => {
    render(
      <InsuranceApplicationWrapper>
        <TestComponent />
      </InsuranceApplicationWrapper>
    );

    expect(screen.getByTestId('insurance-provider')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('renders children correctly with PlanProvider alias', () => {
    render(
      <PlanProvider>
        <TestComponent />
      </PlanProvider>
    );

    expect(screen.getByTestId('insurance-provider')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('provides context to child components', () => {
    render(
      <InsuranceApplicationWrapper>
        <TestComponent />
      </InsuranceApplicationWrapper>
    );

    expect(useInsuranceApplication).toHaveBeenCalled();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('handles multiple children', () => {
    render(
      <InsuranceApplicationWrapper>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <TestComponent />
      </InsuranceApplicationWrapper>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('wraps children with InsuranceApplicationProvider', () => {
    const { container } = render(
      <InsuranceApplicationWrapper>
        <TestComponent />
      </InsuranceApplicationWrapper>
    );

    const provider = container.querySelector(
      '[data-testid="insurance-provider"]'
    );
    expect(provider).toBeInTheDocument();
    expect(provider).toContainElement(screen.getByTestId('test-child'));
  });

  it('maintains backward compatibility with PlanProvider export', () => {
    expect(PlanProvider).toBe(InsuranceApplicationWrapper);
  });
});
