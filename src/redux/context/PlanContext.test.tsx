import React from 'react';
import { render, screen, act } from '@testing-library/react';
import {
  InsuranceApplicationProvider,
  useInsuranceApplication,
} from './PlanContext';
import { User, InsurancePlan, SelectedPlanDetails } from '../../types';

const TestComponent = () => {
  const {
    state,
    setCurrentUser,
    setSelectedPlan,
    setAvailablePlans,
    setCurrentStep,
    addNotification,
    isUserAuthenticated,
    hasSelectedPlan,
  } = useInsuranceApplication();

  return (
    <div>
      <div data-testid="user-name">
        {state.user.currentUser?.name || 'No user'}
      </div>
      <div data-testid="is-authenticated">{isUserAuthenticated.toString()}</div>
      <div data-testid="has-selected-plan">{hasSelectedPlan.toString()}</div>
      <div data-testid="current-step">{state.ui.currentStep}</div>
      <div data-testid="available-plans-count">
        {state.plans.availablePlans.length}
      </div>
      <div data-testid="notifications-count">
        {state.ui.notifications.length}
      </div>

      <button
        data-testid="set-user"
        onClick={() =>
          setCurrentUser({
            id: '1',
            name: 'Andrea',
            lastName: 'Monroy',
            birthDate: '1990-01-01',
            documentType: 'dni',
            documentNumber: '12345678',
            phoneNumber: '987654321',
            hasAcceptedPrivacyPolicy: true,
            hasAcceptedCommercialPolicy: true,
          })
        }
      >
        Set User
      </button>

      <button
        data-testid="set-plan"
        onClick={() =>
          setSelectedPlan({
            planId: 'plan-1',
            planName: 'Plan Básico',
            finalPrice: 159,
            originalPrice: 159,
            selectedAt: new Date().toISOString(),
          })
        }
      >
        Set Plan
      </button>

      <button
        data-testid="set-plans"
        onClick={() =>
          setAvailablePlans([
            {
              id: '1',
              name: 'Plan Básico',
              monthlyPrice: 159,
              benefits: ['Telemedicina'],
              minimumAge: 18,
              category: 'basic',
            },
            {
              id: '2',
              name: 'Plan Completo',
              monthlyPrice: 259,
              benefits: ['Telemedicina', 'Videoconsulta'],
              minimumAge: 18,
              category: 'premium',
            },
          ])
        }
      >
        Set Plans
      </button>

      <button data-testid="set-step" onClick={() => setCurrentStep(2)}>
        Set Step 2
      </button>

      <button
        data-testid="add-notification"
        onClick={() =>
          addNotification({
            type: 'success',
            title: 'Success',
            message: 'Test notification',
          })
        }
      >
        Add Notification
      </button>
    </div>
  );
};

const TestWrapper = () => (
  <InsuranceApplicationProvider>
    <TestComponent />
  </InsuranceApplicationProvider>
);

describe('PlanContext', () => {
  it('should provide initial state', () => {
    render(<TestWrapper />);

    expect(screen.getByTestId('user-name')).toHaveTextContent('No user');
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('has-selected-plan')).toHaveTextContent('false');
    expect(screen.getByTestId('current-step')).toHaveTextContent('1');
    expect(screen.getByTestId('available-plans-count')).toHaveTextContent('0');
    expect(screen.getByTestId('notifications-count')).toHaveTextContent('0');
  });

  it('should update user state', async () => {
    render(<TestWrapper />);

    const setUserButton = screen.getByTestId('set-user');

    await act(async () => {
      setUserButton.click();
    });

    expect(screen.getByTestId('user-name')).toHaveTextContent('Andrea');
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
  });

  it('should update selected plan state', async () => {
    render(<TestWrapper />);

    const setPlanButton = screen.getByTestId('set-plan');

    await act(async () => {
      setPlanButton.click();
    });

    expect(screen.getByTestId('has-selected-plan')).toHaveTextContent('true');
  });

  it('should update available plans', async () => {
    render(<TestWrapper />);

    const setPlansButton = screen.getByTestId('set-plans');

    await act(async () => {
      setPlansButton.click();
    });

    expect(screen.getByTestId('available-plans-count')).toHaveTextContent('2');
  });

  it('should update current step', async () => {
    render(<TestWrapper />);

    const setStepButton = screen.getByTestId('set-step');

    await act(async () => {
      setStepButton.click();
    });

    expect(screen.getByTestId('current-step')).toHaveTextContent('2');
  });

  it('should add notifications', async () => {
    render(<TestWrapper />);

    const addNotificationButton = screen.getByTestId('add-notification');

    await act(async () => {
      addNotificationButton.click();
    });

    expect(screen.getByTestId('notifications-count')).toHaveTextContent('1');
  });

  it('should throw error when used outside provider', () => {
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow(
      'useInsuranceApplication must be used within an InsuranceApplicationProvider'
    );

    console.error = originalError;
  });

  it('should handle multiple state updates', async () => {
    render(<TestWrapper />);

    const setUserButton = screen.getByTestId('set-user');
    const setPlanButton = screen.getByTestId('set-plan');
    const setStepButton = screen.getByTestId('set-step');

    await act(async () => {
      setUserButton.click();
      setPlanButton.click();
      setStepButton.click();
    });

    expect(screen.getByTestId('user-name')).toHaveTextContent('Andrea');
    expect(screen.getByTestId('has-selected-plan')).toHaveTextContent('true');
    expect(screen.getByTestId('current-step')).toHaveTextContent('2');
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
  });
});
