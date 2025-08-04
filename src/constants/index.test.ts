import {
  APP_CONFIG,
  API_CONFIG,
  DOCUMENT_TYPES,
  DOCUMENT_TYPE_LABELS,
  VALIDATION_RULES,
  PLAN_CATEGORIES,
  NOTIFICATION_TYPES,
  STEPS,
  STEP_NAMES,
} from './index';

describe('Constants', () => {
  describe('APP_CONFIG', () => {
    it('has correct application configuration', () => {
      expect(APP_CONFIG.NAME).toBe('RIMAC Seguros');
      expect(APP_CONFIG.VERSION).toBe('1.0.0');
      expect(APP_CONFIG.DESCRIPTION).toBe('Sistema de cotización de seguros de salud');
      expect(APP_CONFIG.SUPPORT_EMAIL).toBe('soporte@rimac.com');
      expect(APP_CONFIG.SUPPORT_PHONE).toBe('(01) 411 6001');
    });

  });

  describe('API_CONFIG', () => {
    it('has correct API configuration', () => {
      expect(API_CONFIG.BASE_URL).toBeDefined();
      expect(API_CONFIG.TIMEOUT).toBe(10000);
      expect(API_CONFIG.RETRY_ATTEMPTS).toBe(3);
      expect(API_CONFIG.CACHE_DURATION).toBe(300000);
    });

    it('uses environment variable or fallback URL', () => {
      expect(typeof API_CONFIG.BASE_URL).toBe('string');
      expect(API_CONFIG.BASE_URL.length).toBeGreaterThan(0);
    });
  });

  describe('DOCUMENT_TYPES', () => {
    it('has correct document type values', () => {
      expect(DOCUMENT_TYPES.DNI).toBe('dni');
      expect(DOCUMENT_TYPES.CE).toBe('ce');
      expect(DOCUMENT_TYPES.PASSPORT).toBe('pasaporte');
    });

  });

  describe('DOCUMENT_TYPE_LABELS', () => {
    it('has correct labels for each document type', () => {
      expect(DOCUMENT_TYPE_LABELS[DOCUMENT_TYPES.DNI]).toBe('DNI');
      expect(DOCUMENT_TYPE_LABELS[DOCUMENT_TYPES.CE]).toBe('Carné de Extranjería');
      expect(DOCUMENT_TYPE_LABELS[DOCUMENT_TYPES.PASSPORT]).toBe('Pasaporte');
    });

    it('maps all document types to labels', () => {
      const documentTypeKeys = Object.values(DOCUMENT_TYPES);
      const labelKeys = Object.keys(DOCUMENT_TYPE_LABELS);
      
      documentTypeKeys.forEach(docType => {
        expect(labelKeys).toContain(docType);
      });
    });
  });

  describe('VALIDATION_RULES', () => {
    it('has DNI validation rules', () => {
      expect(VALIDATION_RULES.DNI).toBeDefined();
      expect(VALIDATION_RULES.DNI.MIN_LENGTH).toBe(8);
      expect(VALIDATION_RULES.DNI.MAX_LENGTH).toBe(8);
      expect(VALIDATION_RULES.DNI.PATTERN).toEqual(/^[0-9]{8}$/);
    });

    it('has CE validation rules', () => {
      expect(VALIDATION_RULES.CE).toBeDefined();
      expect(VALIDATION_RULES.CE.MIN_LENGTH).toBe(9);
      expect(VALIDATION_RULES.CE.MAX_LENGTH).toBe(12);
      expect(VALIDATION_RULES.CE.PATTERN).toEqual(/^[0-9A-Za-z]{9,12}$/);
    });

    it('has passport validation rules', () => {
      expect(VALIDATION_RULES.PASSPORT).toBeDefined();
      expect(VALIDATION_RULES.PASSPORT.MIN_LENGTH).toBe(6);
      expect(VALIDATION_RULES.PASSPORT.MAX_LENGTH).toBe(20);
      expect(VALIDATION_RULES.PASSPORT.PATTERN).toEqual(/^[0-9A-Za-z]{6,20}$/);
    });

    it('has phone validation rules', () => {
      expect(VALIDATION_RULES.PHONE).toBeDefined();
      expect(VALIDATION_RULES.PHONE.MIN_LENGTH).toBe(9);
      expect(VALIDATION_RULES.PHONE.MAX_LENGTH).toBe(9);
      expect(VALIDATION_RULES.PHONE.PATTERN).toEqual(/^9[0-9]{8}$/);
    });
  });

  describe('PLAN_CATEGORIES', () => {
    it('has correct plan category values', () => {
      expect(PLAN_CATEGORIES.BASIC).toBe('basic');
      expect(PLAN_CATEGORIES.STANDARD).toBe('standard');
      expect(PLAN_CATEGORIES.PREMIUM).toBe('premium');
    });
  });

  describe('NOTIFICATION_TYPES', () => {
    it('has correct notification type values', () => {
      expect(NOTIFICATION_TYPES.SUCCESS).toBe('success');
      expect(NOTIFICATION_TYPES.ERROR).toBe('error');
      expect(NOTIFICATION_TYPES.WARNING).toBe('warning');
      expect(NOTIFICATION_TYPES.INFO).toBe('info');
    });
  });

  describe('STEPS', () => {
    it('has correct step values', () => {
      expect(STEPS.PERSONAL_INFO).toBe(1);
      expect(STEPS.PLAN_SELECTION).toBe(2);
      expect(STEPS.SUMMARY).toBe(3);
    });
  });

  describe('STEP_NAMES', () => {
    it('maps step numbers to step names', () => {
      expect(STEP_NAMES[STEPS.PERSONAL_INFO]).toBe('Información Personal');
      expect(STEP_NAMES[STEPS.PLAN_SELECTION]).toBe('Selección de Plan');
      expect(STEP_NAMES[STEPS.SUMMARY]).toBe('Resumen y Confirmación');
    });

    it('has names for all steps', () => {
      const stepValues = Object.values(STEPS);
      stepValues.forEach(step => {
        expect(STEP_NAMES[step]).toBeDefined();
        expect(typeof STEP_NAMES[step]).toBe('string');
      });
    });
  });
});
