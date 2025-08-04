import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { 
  ApplicationState, 
  User, 
  SelectedPlanDetails, 
  InsurancePlan,
  UserRegistrationFormData,
  Notification 
} from '../../types';
import { applicationReducer, initialApplicationState } from '../reducer/appReducer';

export interface InsuranceApplicationContextValue {
  state: ApplicationState;
  setCurrentUser: (user: User) => void;
  updateRegistrationData: (data: Partial<UserRegistrationFormData>) => void;
  clearUserData: () => void;
  setAvailablePlans: (plans: InsurancePlan[]) => void;
  setSelectedPlan: (plan: SelectedPlanDetails) => void;
  setPlansLoading: (isLoading: boolean) => void;
  setTargetUser: (target: 'self' | 'other') => void;
  clearPlanSelection: () => void;
  setCurrentStep: (step: number) => void;
  setUiLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (notificationId: string) => void;
  resetApplicationState: () => void;
  isUserAuthenticated: boolean;
  hasSelectedPlan: boolean;
  currentStepName: string;
}

const InsuranceApplicationContext = createContext<InsuranceApplicationContextValue | null>(null);

const STEP_NAMES = {
  1: 'Información Personal',
  2: 'Selección de Plan',
  3: 'Resumen y Confirmación',
} as const;

export const InsuranceApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [state, dispatch] = useReducer(applicationReducer, initialApplicationState);

  const setCurrentUser = useCallback((user: User) => {
    dispatch({ type: 'USER_SET_CURRENT', payload: user });
  }, []);

  const updateRegistrationData = useCallback((data: Partial<UserRegistrationFormData>) => {
    dispatch({ type: 'USER_UPDATE_REGISTRATION_DATA', payload: data });
  }, []);

  const clearUserData = useCallback(() => {
    dispatch({ type: 'USER_CLEAR_DATA' });
  }, []);

  const setAvailablePlans = useCallback((plans: InsurancePlan[]) => {
    dispatch({ type: 'PLANS_SET_AVAILABLE', payload: plans });
  }, []);

  const setSelectedPlan = useCallback((plan: SelectedPlanDetails) => {
    dispatch({ type: 'PLANS_SET_SELECTED', payload: plan });
  }, []);

  const setPlansLoading = useCallback((isLoading: boolean) => {
    dispatch({ type: 'PLANS_SET_LOADING', payload: isLoading });
  }, []);

  const setTargetUser = useCallback((target: 'self' | 'other') => {
    dispatch({ type: 'PLANS_SET_TARGET_USER', payload: target });
  }, []);

  const clearPlanSelection = useCallback(() => {
    dispatch({ type: 'PLANS_CLEAR_SELECTION' });
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    dispatch({ type: 'UI_SET_STEP', payload: step });
  }, []);

  const setUiLoading = useCallback((isLoading: boolean) => {
    dispatch({ type: 'UI_SET_LOADING', payload: isLoading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'UI_SET_ERROR', payload: error });
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const fullNotification: Notification = {
      ...notification,
      id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      isAutoClose: notification.isAutoClose ?? true,
      duration: notification.duration ?? 5000,
    };
    dispatch({ type: 'UI_ADD_NOTIFICATION', payload: fullNotification });
  }, []);

  const removeNotification = useCallback((notificationId: string) => {
    dispatch({ type: 'UI_REMOVE_NOTIFICATION', payload: notificationId });
  }, []);

  const resetApplicationState = useCallback(() => {
    dispatch({ type: 'UI_RESET_STATE' });
  }, []);

  const isUserAuthenticated = Boolean(state.user.currentUser && state.user.isAuthenticated);
  const hasSelectedPlan = Boolean(state.plans.selectedPlan);
  const currentStepName = STEP_NAMES[state.ui.currentStep as keyof typeof STEP_NAMES] || 'Paso Desconocido';

  const contextValue: InsuranceApplicationContextValue = {
    state,
    setCurrentUser,
    updateRegistrationData,
    clearUserData,
    setAvailablePlans,
    setSelectedPlan,
    setPlansLoading,
    setTargetUser,
    clearPlanSelection,
    setCurrentStep,
    setUiLoading,
    setError,
    addNotification,
    removeNotification,
    resetApplicationState,
    isUserAuthenticated,
    hasSelectedPlan,
    currentStepName,
  };

  return (
    <InsuranceApplicationContext.Provider value={contextValue}>
      {children}
    </InsuranceApplicationContext.Provider>
  );
};

export const useInsuranceApplication = (): InsuranceApplicationContextValue => {
  const context = useContext(InsuranceApplicationContext);
  
  if (!context) {
    throw new Error(
      'useInsuranceApplication must be used within an InsuranceApplicationProvider'
    );
  }
  
  return context;
};

export default InsuranceApplicationContext;
export type PlanContextType = InsuranceApplicationContextValue;
