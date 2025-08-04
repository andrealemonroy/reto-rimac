export function calculateUserAge(birthDateString: string): number {
  if (!birthDateString) {
    throw new Error('Birth date is required to calculate age');
  }

  const birthDate = new Date(birthDateString);
  
  if (isNaN(birthDate.getTime())) {
    throw new Error('Invalid birth date format. Please provide a valid date string.');
  }

  const currentDate = new Date();
  let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
  
  const currentMonth = currentDate.getMonth();
  const birthMonth = birthDate.getMonth();
  
  if (currentMonth < birthMonth || 
      (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
    ageInYears--;
  }

  return Math.max(0, ageInYears);
}

export function formatDisplayDate(
  dateString: string, 
  locale: string = 'es-PE'
): string {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return 'Fecha inválida';
  }

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function isUserOfLegalAge(birthDateString: string): boolean {
  try {
    return calculateUserAge(birthDateString) >= 18;
  } catch {
    return false;
  }
}

export function validatePeruvianDni(dni: string): boolean {
  if (!dni || typeof dni !== 'string') {
    return false;
  }

  const cleanDni = dni.replace(/\D/g, '');
  
  if (cleanDni.length !== 8) {
    return false;
  }

  if (/^(\d)\1{7}$/.test(cleanDni)) {
    return false;
  }

  return true;
}

export function validatePeruvianPhoneNumber(phoneNumber: string): boolean {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }

  const cleanPhone = phoneNumber.replace(/[\s()-]/g, '');
  
  const mobilePattern = /^9\d{8}$/;
  const landlinePattern = /^(0[1-8][0-9]?)?\d{6,7}$/;
  
  return mobilePattern.test(cleanPhone) || landlinePattern.test(cleanPhone);
}

export function validateEmailAddress(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
}

export function formatCurrencyAmount(
  amount: number, 
  currency: string = 'PEN'
): string {
  if (isNaN(amount)) {
    return 'S/ 0.00';
  }

  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPhoneNumberDisplay(phoneNumber: string): string {
  if (!phoneNumber) {
    return '';
  }

  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  if (cleanPhone.length === 9 && cleanPhone.startsWith('9')) {
    return `+51 ${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3, 6)} ${cleanPhone.slice(6)}`;
  }
  
  return phoneNumber;
}

export function formatDocumentNumber(
  documentNumber: string, 
  documentType: 'dni' | 'ce' | 'pasaporte'
): string {
  if (!documentNumber) {
    return '';
  }

  switch (documentType) {
    case 'dni':
      const cleanDni = documentNumber.replace(/\D/g, '');
      if (cleanDni.length === 8) {
        return cleanDni;
      }
      break;
    case 'ce':
    case 'pasaporte':
      return documentNumber.toUpperCase();
    default:
      return documentNumber;
  }

  return documentNumber;
}

export function generateUniqueId(prefix: string = 'id'): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${randomPart}`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function toTitleCase(str: string): string {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
}

export const calculateAge = calculateUserAge;
