import { applicationReducer, initialApplicationState } from './appReducer';
import { User, InsurancePlan, SelectedPlanDetails, Notification } from '../../types';

describe('applicationReducer', () => {
  describe('initial state', () => {
    it('has correct initial state structure', () => {
      expect(initialApplicationState).toEqual({
        user: {
          currentUser: null,
          isAuthenticated: false,
          registrationData: null,
        },
        plans: {
          availablePlans: [],
          selectedPlan: null,
          isLoading: false,
          filters: {
            targetUser: null,
          },
        },
        ui: {
          currentStep: 1,
          isLoading: false,
          error: null,
          notifications: [],
        },
      });
    });
  });

  describe('USER actions', () => {
    it('handles USER_SET_CURRENT', () => {
      const user: User = {
        name: 'Juan',
        lastName: 'Pérez',
        birthDate: '1990-01-01',
        documentType: 'dni',
        documentNumber: '12345678',
        phoneNumber: '987654321',
        hasAcceptedPrivacyPolicy: true,
        hasAcceptedCommercialPolicy: true,
      };

      const action = { type: 'USER_SET_CURRENT' as const, payload: user };
      const newState = applicationReducer(initialApplicationState, action);

      expect(newState.user.currentUser).toEqual(user);
      expect(newState.user.isAuthenticated).toBe(true);
    });

    it('handles USER_UPDATE_REGISTRATION_DATA', () => {
      const registrationData = {
        documentType: 'dni' as const,
        documentNumber: '12345678',
        phoneNumber: '987654321',
        hasAcceptedPrivacyPolicy: true,
        hasAcceptedCommercialPolicy: true,
      };

      const action = { type: 'USER_UPDATE_REGISTRATION_DATA' as const, payload: registrationData };
      const newState = applicationReducer(initialApplicationState, action);

      expect(newState.user.registrationData).toEqual({
        ...initialApplicationState.user.registrationData,
        ...registrationData,
      });
    });

    it('handles USER_CLEAR_DATA', () => {
      const stateWithUser = {
        ...initialApplicationState,
        user: {
          currentUser: {
            name: 'Juan',
            lastName: 'Pérez',
            birthDate: '1990-01-01',
            documentType: 'dni' as const,
            documentNumber: '12345678',
            phoneNumber: '987654321',
            hasAcceptedPrivacyPolicy: true,
            hasAcceptedCommercialPolicy: true,
          },
          isAuthenticated: true,
          registrationData: { documentType: 'dni' as const },
        },
      };

      const action = { type: 'USER_CLEAR_DATA' as const };
      const newState = applicationReducer(stateWithUser, action);

      expect(newState.user.currentUser).toBeNull();
      expect(newState.user.isAuthenticated).toBe(false);
      expect(newState.user.registrationData).toBeNull();
    });
  });

  describe('PLANS actions', () => {
    it('handles PLANS_SET_AVAILABLE', () => {
      const plans: InsurancePlan[] = [
        {
          id: '1',
          name: 'Plan Básico',
          monthlyPrice: 99,
          benefits: ['Benefit 1', 'Benefit 2'],
          minimumAge: 18,
          category: 'basic',
        },
      ];

      const action = { type: 'PLANS_SET_AVAILABLE' as const, payload: plans };
      const newState = applicationReducer(initialApplicationState, action);

      expect(newState.plans.availablePlans).toEqual(plans);
    });

    it('handles PLANS_SET_SELECTED', () => {
      const selectedPlan: SelectedPlanDetails = {
        planId: '1',
        planName: 'Plan Básico',
        finalPrice: 99,
        originalPrice: 120,
        selectedAt: '2024-01-01T00:00:00Z',
      };

      const action = { type: 'PLANS_SET_SELECTED' as const, payload: selectedPlan };
      const newState = applicationReducer(initialApplicationState, action);

      expect(newState.plans.selectedPlan).toEqual(selectedPlan);
    });

    it('handles PLANS_SET_LOADING', () => {
      const action = { type: 'PLANS_SET_LOADING' as const, payload: true };
      const newState = applicationReducer(initialApplicationState, action);

      expect(newState.plans.isLoading).toBe(true);
    });

    it('handles PLANS_SET_TARGET_USER', () => {
      const action = { type: 'PLANS_SET_TARGET_USER' as const, payload: 'other' as const };
      const newState = applicationReducer(initialApplicationState, action);

      expect(newState.plans.filters.targetUser).toBe('other');
    });

    it('handles PLANS_CLEAR_SELECTION', () => {
      const stateWithSelection = {
        ...initialApplicationState,
        plans: {
          ...initialApplicationState.plans,
          selectedPlan: {
            planId: '1',
            planName: 'Plan Básico',
            finalPrice: 99,
            originalPrice: 120,
            selectedAt: '2024-01-01T00:00:00Z',
          },
          filters: {
            targetUser: 'self' as const,
          },
        },
      };

      const action = { type: 'PLANS_CLEAR_SELECTION' as const };
      const newState = applicationReducer(stateWithSelection, action);

      expect(newState.plans.selectedPlan).toBeNull();
      expect(newState.plans.filters.targetUser).toBeNull();
    });
  });

  describe('UI actions', () => {
    it('handles UI_SET_STEP', () => {
      const action = { type: 'UI_SET_STEP' as const, payload: 2 };
      const newState = applicationReducer(initialApplicationState, action);

      expect(newState.ui.currentStep).toBe(2);
    });

    it('handles UI_SET_LOADING', () => {
      const action = { type: 'UI_SET_LOADING' as const, payload: true };
      const newState = applicationReducer(initialApplicationState, action);

      expect(newState.ui.isLoading).toBe(true);
    });

    it('handles UI_SET_ERROR', () => {
      const errorMessage = 'Something went wrong';
      const action = { type: 'UI_SET_ERROR' as const, payload: errorMessage };
      const newState = applicationReducer(initialApplicationState, action);

      expect(newState.ui.error).toBe(errorMessage);
    });

    it('handles UI_RESET_STATE', () => {
      const stateWithError = {
        ...initialApplicationState,
        ui: {
          ...initialApplicationState.ui,
          error: 'Previous error',
        },
      };

      const action = { type: 'UI_RESET_STATE' as const };
      const newState = applicationReducer(stateWithError, action);

      expect(newState.ui.error).toBeNull();
    });

    it('handles UI_ADD_NOTIFICATION', () => {
      const notification: Notification = {
        id: 'test-id',
        type: 'success',
        title: 'Success',
        message: 'Success message',
        duration: 5000,
        createdAt: Date.now(),
      };

      const action = { type: 'UI_ADD_NOTIFICATION' as const, payload: notification };
      const newState = applicationReducer(initialApplicationState, action);

      expect(newState.ui.notifications).toHaveLength(1);
      expect(newState.ui.notifications[0]).toEqual(notification);
    });

    it('handles UI_REMOVE_NOTIFICATION', () => {
      const stateWithNotification = {
        ...initialApplicationState,
        ui: {
          ...initialApplicationState.ui,
          notifications: [
            {
              id: 'test-id',
              type: 'info' as const,
              title: 'Info',
              message: 'Test notification',
              createdAt: Date.now(),
            },
          ],
        },
      };

      const action = { type: 'UI_REMOVE_NOTIFICATION' as const, payload: 'test-id' };
      const newState = applicationReducer(stateWithNotification, action);

      expect(newState.ui.notifications).toHaveLength(0);
    });
  });

  describe('RESET action', () => {
    it('handles UI_RESET_STATE', () => {
      const modifiedState = {
        user: {
          currentUser: {
            name: 'Juan',
            lastName: 'Pérez',
            birthDate: '1990-01-01',
            documentType: 'dni' as const,
            documentNumber: '12345678',
            phoneNumber: '987654321',
            hasAcceptedPrivacyPolicy: true,
            hasAcceptedCommercialPolicy: true,
          },
          isAuthenticated: true,
          registrationData: null,
        },
        plans: {
          availablePlans: [],
          selectedPlan: null,
          isLoading: false,
          filters: { targetUser: 'self' as const },
        },
        ui: {
          currentStep: 3,
          isLoading: true,
          error: 'Some error',
          notifications: [],
        },
      };

      const action = { type: 'UI_RESET_STATE' as const };
      const newState = applicationReducer(modifiedState, action);

      expect(newState.ui).toEqual(initialApplicationState.ui);
    });
  });

  describe('unknown action', () => {
    it('returns current state for unknown action', () => {
      const unknownAction = { type: 'UNKNOWN_ACTION' as any, payload: 'test' };
      const newState = applicationReducer(initialApplicationState, unknownAction);

      expect(newState).toBe(initialApplicationState);
    });
  });

  describe('state immutability', () => {
    it('does not mutate original state', () => {
      const originalState = { ...initialApplicationState };
      const user: User = {
        name: 'Juan',
        lastName: 'Pérez',
        birthDate: '1990-01-01',
        documentType: 'dni',
        documentNumber: '12345678',
        phoneNumber: '987654321',
        hasAcceptedPrivacyPolicy: true,
        hasAcceptedCommercialPolicy: true,
      };

      const action = { type: 'USER_SET_CURRENT' as const, payload: user };
      const newState = applicationReducer(initialApplicationState, action);

      expect(initialApplicationState).toEqual(originalState);
      expect(newState).not.toBe(initialApplicationState);
    });
  });
});
