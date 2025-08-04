export const APP_CONFIG = {
  NAME: 'RIMAC Seguros',
  VERSION: '1.0.0',
  DESCRIPTION: 'Sistema de cotización de seguros de salud',
  SUPPORT_EMAIL: 'soporte@rimac.com',
  SUPPORT_PHONE: '(01) 411 6001',
} as const;

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://fitnessprogym.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 300000,
} as const;

export const DOCUMENT_TYPES = {
  DNI: 'dni',
  CE: 'ce',
  PASSPORT: 'pasaporte',
} as const;

export const DOCUMENT_TYPE_LABELS = {
  [DOCUMENT_TYPES.DNI]: 'DNI',
  [DOCUMENT_TYPES.CE]: 'Carné de Extranjería',
  [DOCUMENT_TYPES.PASSPORT]: 'Pasaporte',
} as const;

export const VALIDATION_RULES = {
  DNI: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 8,
    PATTERN: /^[0-9]{8}$/,
    ERROR_MESSAGE: 'El DNI debe tener exactamente 8 dígitos',
  },
  CE: {
    MIN_LENGTH: 9,
    MAX_LENGTH: 12,
    PATTERN: /^[0-9A-Za-z]{9,12}$/,
    ERROR_MESSAGE: 'El Carné de Extranjería debe tener entre 9 y 12 caracteres alfanuméricos',
  },
  PASSPORT: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 20,
    PATTERN: /^[0-9A-Za-z]{6,20}$/,
    ERROR_MESSAGE: 'El Pasaporte debe tener entre 6 y 20 caracteres alfanuméricos',
  },
  PHONE: {
    MIN_LENGTH: 9,
    MAX_LENGTH: 9,
    PATTERN: /^9[0-9]{8}$/,
    ERROR_MESSAGE: 'El teléfono debe tener 9 dígitos y comenzar con 9',
  },
} as const;

export const PLAN_CATEGORIES = {
  BASIC: 'basic',
  STANDARD: 'standard',
  PREMIUM: 'premium',
} as const;

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export const STEPS = {
  PERSONAL_INFO: 1,
  PLAN_SELECTION: 2,
  SUMMARY: 3,
} as const;

export const STEP_NAMES = {
  [STEPS.PERSONAL_INFO]: 'Información Personal',
  [STEPS.PLAN_SELECTION]: 'Selección de Plan',
  [STEPS.SUMMARY]: 'Resumen y Confirmación',
} as const;
