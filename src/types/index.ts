export type DocumentType = 'dni' | 'ce' | 'pasaporte';

export interface User {
  readonly id?: string;
  name: string;
  lastName: string;
  birthDate: string;
  documentType: DocumentType;
  documentNumber: string;
  phoneNumber: string;
  hasAcceptedPrivacyPolicy: boolean;
  hasAcceptedCommercialPolicy: boolean;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InsurancePlan {
  readonly id: string;
  name: string;
  monthlyPrice: number;
  benefits: string[];
  minimumAge: number;
  maximumAge?: number;
  iconUrl?: string;
  category: 'basic' | 'standard' | 'premium';
  isRecommended?: boolean;
  discountPercentage?: number;
}

export interface SelectedPlanDetails {
  readonly planId: string;
  planName: string;
  finalPrice: number;
  originalPrice: number;
  discountApplied?: number;
  selectedAt: string;
}

export interface UserRegistrationFormData {
  documentType: DocumentType;
  documentNumber: string;
  phoneNumber: string;
  hasAcceptedPrivacyPolicy: boolean;
  hasAcceptedCommercialPolicy: boolean;
}

export interface PlanSelectionFormData {
  targetUser: 'self' | 'other';
  selectedPlanId?: string;
}

export interface FormFieldConfig {
  type: 'document' | 'phone' | 'checkbox' | 'radio-card' | 'text' | 'email';
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  isRequired?: boolean;
  validationRules?: Record<string, any>;
}

export interface RadioCardOption {
  readonly id: string;
  label: string;
  description: string;
  iconUrl: string;
  value: string;
}

export interface ApiResponse<TData = any> {
  success: boolean;
  data: TData;
  message?: string;
  timestamp: number;
  requestId?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  timestamp: number;
  requestId?: string;
}

export interface PlansApiResponse {
  plans: InsurancePlan[];
  totalCount: number;
  filters?: {
    minAge?: number;
    maxAge?: number;
    category?: string[];
  };
}

export interface UserApiResponse {
  user: User;
  preferences?: {
    language: string;
    currency: string;
  };
}

export interface CardSelectionProps {
  readonly id: string;
  label: string;
  description: string;
  iconUrl: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onSelect: (id: string) => void;
  ariaLabel?: string;
}

export interface PlanCardProps {
  plan: InsurancePlan;
  finalPrice: number;
  originalPrice?: number;
  isRecommended?: boolean;
  onSelect: (planId: string, price: number) => void;
  isSelected?: boolean;
  showDiscount?: boolean;
}

export interface StepperProps {
  steps: readonly string[];
  currentStepIndex: number;
  backNavigationPath?: string;
  onStepClick?: (stepIndex: number) => void;
}

export interface ApplicationState {
  user: {
    currentUser: User | null;
    isAuthenticated: boolean;
    registrationData: Partial<UserRegistrationFormData> | null;
  };
  plans: {
    availablePlans: InsurancePlan[];
    selectedPlan: SelectedPlanDetails | null;
    isLoading: boolean;
    filters: {
      targetUser: 'self' | 'other' | null;
      ageFilter?: number;
    };
  };
  ui: {
    currentStep: number;
    isLoading: boolean;
    error: string | null;
    notifications: Notification[];
  };
}

export type ApplicationAction =
  | { type: 'USER_SET_CURRENT'; payload: User }
  | { type: 'USER_UPDATE_REGISTRATION_DATA'; payload: Partial<UserRegistrationFormData> }
  | { type: 'USER_CLEAR_DATA' }
  | { type: 'PLANS_SET_AVAILABLE'; payload: InsurancePlan[] }
  | { type: 'PLANS_SET_SELECTED'; payload: SelectedPlanDetails }
  | { type: 'PLANS_SET_LOADING'; payload: boolean }
  | { type: 'PLANS_SET_TARGET_USER'; payload: 'self' | 'other' }
  | { type: 'PLANS_CLEAR_SELECTION' }
  | { type: 'UI_SET_STEP'; payload: number }
  | { type: 'UI_SET_LOADING'; payload: boolean }
  | { type: 'UI_SET_ERROR'; payload: string | null }
  | { type: 'UI_ADD_NOTIFICATION'; payload: Notification }
  | { type: 'UI_REMOVE_NOTIFICATION'; payload: string }
  | { type: 'UI_RESET_STATE' };

export interface Notification {
  readonly id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  isAutoClose?: boolean;
  createdAt: number;
}

export interface ValidationConfig {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: any) => string | boolean;
}

export interface RouteParams {
  planId?: string;
  step?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  lastUpdated?: number;
}
