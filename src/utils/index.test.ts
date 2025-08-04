import {
  calculateUserAge,
  formatDisplayDate,
  isUserOfLegalAge,
  validatePeruvianDni,
  validatePeruvianPhoneNumber,
  validateEmailAddress,
  formatCurrencyAmount,
  formatPhoneNumberDisplay,
  formatDocumentNumber,
  generateUniqueId,
  debounce,
  deepClone,
  capitalizeFirstLetter,
  toTitleCase,
} from './index';

describe('Utility Functions', () => {
  describe('calculateUserAge', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-01'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should calculate age correctly', () => {
      expect(calculateUserAge('1990-01-01')).toBe(34);
      expect(calculateUserAge('2000-06-15')).toBe(23);
      expect(calculateUserAge('1995-12-31')).toBe(28);
    });

    it('should handle birthday not yet occurred this year', () => {
      expect(calculateUserAge('1990-06-15')).toBe(33);
    });

    it('should handle same year birth', () => {
      expect(calculateUserAge('2024-01-01')).toBe(0);
    });

    it('should throw error for invalid date', () => {
      expect(() => calculateUserAge('')).toThrow('Birth date is required');
      expect(() => calculateUserAge('invalid-date')).toThrow(
        'Invalid birth date format'
      );
    });

    it('should handle future dates', () => {
      expect(calculateUserAge('2025-01-01')).toBe(0);
    });
  });

  describe('formatDisplayDate', () => {

    it('should format date correctly', () => {
      const result = formatDisplayDate('1990-01-15');
      expect(result).toContain('1990');
      expect(typeof result).toBe('string');
    });
  });

  describe('isUserOfLegalAge', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-01'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should return true for users 18 or older', () => {
      expect(isUserOfLegalAge('2000-01-01')).toBe(true);
      expect(isUserOfLegalAge('2006-01-01')).toBe(true);
    });

    it('should return false for users under 18', () => {
      expect(isUserOfLegalAge('2010-01-01')).toBe(false);
      expect(isUserOfLegalAge('2007-01-01')).toBe(false);
    });
  });

  describe('validatePeruvianDni', () => {
    it('should validate correct DNI format', () => {
      expect(validatePeruvianDni('12345678')).toBe(true);
      expect(validatePeruvianDni('87654321')).toBe(true);
    });

    it('should reject invalid DNI format', () => {
      expect(validatePeruvianDni('1234567')).toBe(false);
      expect(validatePeruvianDni('123456789')).toBe(false);
      expect(validatePeruvianDni('1234567a')).toBe(false);
      expect(validatePeruvianDni('')).toBe(false);
      expect(validatePeruvianDni('00000000')).toBe(false);
    });
  });

  describe('validatePeruvianPhoneNumber', () => {
    it('should validate correct phone number format', () => {
      expect(validatePeruvianPhoneNumber('987654321')).toBe(true);
      expect(validatePeruvianPhoneNumber('912345678')).toBe(true);
    });

    it('should reject invalid phone number format', () => {
      expect(validatePeruvianPhoneNumber('12345678')).toBe(false);
      expect(validatePeruvianPhoneNumber('1234567890')).toBe(false);
      expect(validatePeruvianPhoneNumber('812345678')).toBe(false);
      expect(validatePeruvianPhoneNumber('987654abc')).toBe(false);
      expect(validatePeruvianPhoneNumber('')).toBe(false);
    });
  });

  describe('validateEmailAddress', () => {
    it('should validate correct email formats', () => {
      expect(validateEmailAddress('test@example.com')).toBe(true);
      expect(validateEmailAddress('user.name@domain.co.uk')).toBe(true);
      expect(validateEmailAddress('user+tag@example.org')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(validateEmailAddress('invalid-email')).toBe(false);
      expect(validateEmailAddress('@example.com')).toBe(false);
      expect(validateEmailAddress('test@')).toBe(false);
      expect(validateEmailAddress('test.example.com')).toBe(false);
      expect(validateEmailAddress('')).toBe(false);
    });
  });

  describe('formatCurrencyAmount', () => {
    it('should format currency with default PEN currency', () => {
      const result = formatCurrencyAmount(159.99);
      expect(result).toContain('159.99');
      expect(result).toContain('S/');
    });

    it('should format currency correctly', () => {
      const result = formatCurrencyAmount(100);
      expect(typeof result).toBe('string');
      expect(result).toContain('100');
    });
  });

  describe('formatPhoneNumberDisplay', () => {

    it('should format phone number', () => {
      const result = formatPhoneNumberDisplay('987654321');
      expect(typeof result).toBe('string');
      expect(result).toContain('987');
    });

    it('should handle invalid phone numbers', () => {
      expect(formatPhoneNumberDisplay('12345')).toBe('12345');
      expect(formatPhoneNumberDisplay('')).toBe('');
    });
  });

  describe('formatDocumentNumber', () => {

    it('should format document numbers', () => {
      const result = formatDocumentNumber('12345678', 'dni');
      expect(typeof result).toBe('string');
      expect(result).toContain('12345678');
    });

    it('should format other document types', () => {
      expect(formatDocumentNumber('CE123456789', 'ce')).toBe('CE123456789');
      expect(formatDocumentNumber('PASS123456', 'pasaporte')).toBe(
        'PASS123456'
      );
    });
  });

  describe('generateUniqueId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateUniqueId();
      const id2 = generateUniqueId();
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^id_/);
    });

    it('should use custom prefix', () => {
      const id = generateUniqueId('test');
      expect(id).toMatch(/^test_/);
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    it('should return a function', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);
      expect(typeof debouncedFn).toBe('function');
    });
  });

  describe('deepClone', () => {
    it('should deep clone objects', () => {
      const original = {
        name: 'Andrea',
        age: 30,
        address: {
          city: 'Lima',
          country: 'Peru',
        },
        hobbies: ['reading', 'coding'],
      };

      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.address).not.toBe(original.address);
      expect(cloned.hobbies).not.toBe(original.hobbies);
    });

    it('should handle arrays', () => {
      const original = [1, 2, { nested: 'value' }];
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned[2]).not.toBe(original[2]);
    });

    it('should handle primitive types', () => {
      expect(deepClone('string')).toBe('string');
      expect(deepClone(123)).toBe(123);
      expect(deepClone(true)).toBe(true);
      expect(deepClone(null)).toBe(null);
    });

    it('should handle dates', () => {
      const date = new Date('2024-01-01');
      const cloned = deepClone(date);

      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should capitalize first letter', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
      expect(capitalizeFirstLetter('a')).toBe('A');
    });

    it('should handle empty and single character strings', () => {
      expect(capitalizeFirstLetter('')).toBe('');
      expect(capitalizeFirstLetter('h')).toBe('H');
    });

    it('should handle mixed case correctly', () => {
      const result = capitalizeFirstLetter('world');
      expect(result).toBe('World');
    });
  });

  describe('toTitleCase', () => {
    it('should convert to title case', () => {
      expect(toTitleCase('hello world')).toBe('Hello World');
      expect(toTitleCase('ANDREA MONROY')).toBe('Andrea Monroy');
      expect(toTitleCase('javaScript developer')).toBe('Javascript Developer');
    });

    it('should handle single words', () => {
      expect(toTitleCase('hello')).toBe('Hello');
      expect(toTitleCase('WORLD')).toBe('World');
    });

    it('should handle empty strings', () => {
      expect(toTitleCase('')).toBe('');
    });
  });
});
