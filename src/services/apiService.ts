import { User, PlansApiResponse, InsurancePlan } from '../types';

export interface RequestConfig {
  timeout?: number;
  retryAttempts?: number;
  enableCaching?: boolean;
  cacheDurationMs?: number;
  headers?: Record<string, string>;
}

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class InsuranceApiService {
  private baseUrl: string;
  private cache = new Map<string, CacheEntry<any>>();

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private getCacheKey(url: string, method: string): string {
    return `${method}:${url}`;
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  private setCache<T>(key: string, data: T, duration: number): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + duration,
    });
  }

  async get<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const cacheKey = this.getCacheKey(url, 'GET');

    if (config.enableCaching !== false) {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached) return cached;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();

    if (config.enableCaching !== false) {
      this.setCache(cacheKey, data, config.cacheDurationMs || 300000);
    }

    return data;
  }

  async post<T>(endpoint: string, body?: any, config: RequestConfig = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    
    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status
      );
    }

    return response.json();
  }

  clearCache(): void {
    this.cache.clear();
  }

  async fetchUserData(): Promise<User> {
    const response = await this.get<any>('/user.json');
    return response.user || response;
  }

  async fetchInsurancePlans(filters?: { minAge?: number }): Promise<InsurancePlan[]> {
    const endpoint = filters?.minAge ? `/plans.json?minAge=${filters.minAge}` : '/plans.json';
    const response = await this.get<PlansApiResponse>(endpoint);
    return response.plans || (response as any).list || [];
  }
}

export const insuranceApiService = new InsuranceApiService(
  process.env.REACT_APP_API_URL || ''
);

export const apiService = insuranceApiService;
