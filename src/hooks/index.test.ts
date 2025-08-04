import { renderHook, act } from '@testing-library/react';
import { useUserData, usePlans } from './index';
import { apiService } from '../services/apiService';
import { useInsuranceApplication } from '../redux/context/PlanContext';

jest.mock('../services/apiService');
jest.mock('../redux/context/PlanContext');
jest.mock('../utils', () => ({
  calculateAge: jest.fn((birthDate: string) => 30),
}));

const mockApiService = apiService as jest.Mocked<typeof apiService>;
const mockUseInsuranceApplication =
  useInsuranceApplication as jest.MockedFunction<
    typeof useInsuranceApplication
  >;

describe('Custom Hooks', () => {
  const mockState = {
    user: {
      currentUser: null,
      isAuthenticated: false,
      registrationData: null,
    },
    plans: {
      selectedPlan: null,
      availablePlans: [],
      isLoading: false,
      filters: {
        targetUser: null,
        ageFilter: undefined,
      },
    },
    ui: {
      currentStep: 1,
      isLoading: false,
      error: null,
      notifications: [],
    },
  };
  const mockDispatch = jest.fn();
  const mockSetCurrentUser = jest.fn();
  const mockSetAvailablePlans = jest.fn();
  const mockSetPlansLoading = jest.fn();
  const mockUpdateRegistrationData = jest.fn();
  const mockClearUserData = jest.fn();
  const mockSetSelectedPlan = jest.fn();
  const mockSetTargetUser = jest.fn();
  const mockClearPlanSelection = jest.fn();
  const mockSetCurrentStep = jest.fn();
  const mockSetUiLoading = jest.fn();
  const mockSetError = jest.fn();
  const mockAddNotification = jest.fn();
  const mockRemoveNotification = jest.fn();
  const mockResetApplicationState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseInsuranceApplication.mockReturnValue({
      state: mockState,
      setCurrentUser: mockSetCurrentUser,
      updateRegistrationData: mockUpdateRegistrationData,
      clearUserData: mockClearUserData,
      setAvailablePlans: mockSetAvailablePlans,
      setSelectedPlan: mockSetSelectedPlan,
      setPlansLoading: mockSetPlansLoading,
      setTargetUser: mockSetTargetUser,
      clearPlanSelection: mockClearPlanSelection,
      setCurrentStep: mockSetCurrentStep,
      setUiLoading: mockSetUiLoading,
      setError: mockSetError,
      addNotification: mockAddNotification,
      removeNotification: mockRemoveNotification,
      resetApplicationState: mockResetApplicationState,
      isUserAuthenticated: false,
      hasSelectedPlan: false,
      currentStepName: 'Información Personal',
    });
  });

  describe('useUserData', () => {
    it('initializes with correct default values', () => {
      const { result } = renderHook(() => useUserData());

      expect(result.current.userData).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.fetchUserData).toBe('function');
    });

    it('fetches user data successfully', async () => {
      const mockUser = {
        name: 'Juan',
        lastName: 'Pérez',
        birthDate: '1990-01-01',
        documentType: 'dni' as const,
        documentNumber: '12345678',
        phoneNumber: '987654321',
        hasAcceptedPrivacyPolicy: true,
        hasAcceptedCommercialPolicy: true,
      };

      mockApiService.fetchUserData.mockResolvedValueOnce(mockUser);

      const { result } = renderHook(() => useUserData());

      await act(async () => {
        await result.current.fetchUserData();
      });

      expect(mockApiService.fetchUserData).toHaveBeenCalledTimes(1);
      expect(mockSetCurrentUser).toHaveBeenCalledWith(mockUser);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('handles fetch user data error', async () => {
      const errorMessage = 'Failed to fetch user';
      mockApiService.fetchUserData.mockRejectedValueOnce(
        new Error(errorMessage)
      );

      const { result } = renderHook(() => useUserData());

      await act(async () => {
        await result.current.fetchUserData();
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(errorMessage);
      expect(mockSetCurrentUser).not.toHaveBeenCalled();
    });
  });

  describe('usePlans', () => {
    it('initializes with correct default values', () => {
      const { result } = renderHook(() => usePlans(25));

      expect(result.current.plans).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('does not fetch plans when userAge is 0', () => {
      renderHook(() => usePlans(0));

      expect(mockApiService.fetchInsurancePlans).not.toHaveBeenCalled();
    });

    it('fetches plans when userAge is provided', async () => {
      const mockPlans = [
        {
          id: '1',
          name: 'Plan Básico',
          monthlyPrice: 99,
          benefits: ['Benefit 1'],
          minimumAge: 18,
          category: 'basic' as const,
        },
      ];

      mockApiService.fetchInsurancePlans.mockResolvedValueOnce(mockPlans);

      renderHook(() => usePlans(25));

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(mockApiService.fetchInsurancePlans).toHaveBeenCalledWith({
        minAge: 25,
      });
      expect(mockSetPlansLoading).toHaveBeenCalledWith(true);
      expect(mockSetPlansLoading).toHaveBeenCalledWith(false);
    });

    it('handles fetch plans error', async () => {
      mockApiService.fetchInsurancePlans.mockRejectedValueOnce(
        new Error('API Error')
      );

      const { result } = renderHook(() => usePlans(25));

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.error).toBe('API Error');
      expect(mockSetPlansLoading).toHaveBeenCalledWith(false);
    });
  });
});
