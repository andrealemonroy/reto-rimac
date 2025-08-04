import { User, PlansApiResponse } from '../types';

const API_BASE_URL = 'https://rimac-front-end-challenge.netlify.app/api';

class ApiService {
  private async request<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async getUserData(): Promise<User> {
    return this.request<User>('/user.json');
  }

  async getPlans(): Promise<PlansApiResponse> {
    return this.request<PlansApiResponse>('/plans.json');
  }
}

export const apiService = new ApiService();
