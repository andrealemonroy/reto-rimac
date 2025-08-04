import { ApplicationState, ApplicationAction } from '../../types';

export const initialApplicationState: ApplicationState = {
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
};

export const applicationReducer = (
  state: ApplicationState, 
  action: ApplicationAction
): ApplicationState => {
  switch (action.type) {
    case 'USER_SET_CURRENT':
      return {
        ...state,
        user: {
          ...state.user,
          currentUser: action.payload,
          isAuthenticated: true,
        },
        ui: { ...state.ui, error: null },
      };

    case 'USER_UPDATE_REGISTRATION_DATA':
      return {
        ...state,
        user: {
          ...state.user,
          registrationData: state.user.registrationData 
            ? { ...state.user.registrationData, ...action.payload }
            : action.payload,
        },
      };

    case 'USER_CLEAR_DATA':
      return {
        ...state,
        user: {
          currentUser: null,
          isAuthenticated: false,
          registrationData: null,
        },
      };

    case 'PLANS_SET_AVAILABLE':
      return {
        ...state,
        plans: {
          ...state.plans,
          availablePlans: action.payload,
          isLoading: false,
        },
        ui: { ...state.ui, error: null },
      };

    case 'PLANS_SET_SELECTED':
      return {
        ...state,
        plans: {
          ...state.plans,
          selectedPlan: action.payload,
        },
      };

    case 'PLANS_SET_LOADING':
      return {
        ...state,
        plans: {
          ...state.plans,
          isLoading: action.payload,
        },
      };

    case 'PLANS_SET_TARGET_USER':
      return {
        ...state,
        plans: {
          ...state.plans,
          filters: {
            ...state.plans.filters,
            targetUser: action.payload,
          },
        },
      };

    case 'PLANS_CLEAR_SELECTION':
      return {
        ...state,
        plans: {
          ...state.plans,
          selectedPlan: null,
          filters: {
            ...state.plans.filters,
            targetUser: null,
          },
        },
      };

    case 'UI_SET_STEP':
      return {
        ...state,
        ui: {
          ...state.ui,
          currentStep: action.payload,
        },
      };

    case 'UI_SET_LOADING':
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: action.payload,
        },
      };

    case 'UI_SET_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          error: action.payload,
          isLoading: false,
        },
      };

    case 'UI_ADD_NOTIFICATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: [...state.ui.notifications, action.payload],
        },
      };

    case 'UI_REMOVE_NOTIFICATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(
            notification => notification.id !== action.payload
          ),
        },
      };

    case 'UI_RESET_STATE':
      return initialApplicationState;

    default:
      return state;
  }
};
