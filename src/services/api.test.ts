import { apiService } from './api';
import { User, PlansApiResponse } from '../types';

global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('ApiService', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('getUserData', () => {
    it('fetches user data successfully', async () => {
      const mockUser: User = {
        name: 'Juan',
        lastName: 'Pérez',
        birthDate: '1990-01-01',
        documentType: 'dni',
        documentNumber: '12345678',
        phoneNumber: '987654321',
        hasAcceptedPrivacyPolicy: true,
        hasAcceptedCommercialPolicy: true,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      } as Response);

      const result = await apiService.getUserData();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://rimac-front-end-challenge.netlify.app/api/user.json'
      );
      expect(result).toEqual(mockUser);
    });

    it('handles fetch error for user data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(apiService.getUserData()).rejects.toThrow(
        'HTTP error! status: 404'
      );
    });

    it('handles network error for user data', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(apiService.getUserData()).rejects.toThrow('Network error');
    });
  });

  describe('getPlans', () => {
    it('fetches plans data successfully', async () => {
      const mockPlans: PlansApiResponse = {
        plans: [
          {
            id: '1',
            name: 'Plan Básico',
            monthlyPrice: 99,
            benefits: ['Benefit 1', 'Benefit 2'],
            minimumAge: 18,
            category: 'basic',
          },
        ],
        totalCount: 1,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPlans,
      } as Response);

      const result = await apiService.getPlans();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://rimac-front-end-challenge.netlify.app/api/plans.json'
      );
      expect(result).toEqual(mockPlans);
    });

    it('handles fetch error for plans data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(apiService.getPlans()).rejects.toThrow(
        'HTTP error! status: 500'
      );
    });

    it('handles network error for plans data', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(apiService.getPlans()).rejects.toThrow('Network error');
    });
  });

  describe('error handling', () => {
    it('logs errors to console', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      mockFetch.mockRejectedValueOnce(new Error('Test error'));

      await expect(apiService.getUserData()).rejects.toThrow();

      expect(consoleSpy).toHaveBeenCalledWith(
        'API request failed for /user.json:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('throws original error after logging', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const testError = new Error('Original error');
      mockFetch.mockRejectedValueOnce(testError);

      await expect(apiService.getUserData()).rejects.toThrow('Original error');
    });
  });
});
