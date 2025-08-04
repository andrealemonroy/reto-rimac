import { apiService, ApiError } from './apiService';
import { User, PlansApiResponse, InsurancePlan } from '../types';


describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have apiService defined', () => {
    expect(apiService).toBeDefined();
    expect(typeof apiService.fetchUserData).toBe('function');
    expect(typeof apiService.fetchInsurancePlans).toBe('function');
  });

  it('should have ApiError class defined', () => {
    expect(ApiError).toBeDefined();
    const error = new ApiError('Test error', 404, 'TEST_ERROR');
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('ApiError');
  });
});
