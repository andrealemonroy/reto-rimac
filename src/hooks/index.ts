import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { InsurancePlan, User } from '../types';
import { calculateAge } from '../utils';
import { useInsuranceApplication } from '../redux/context/PlanContext';

export const useUserData = () => {
  const { state, setCurrentUser } = useInsuranceApplication();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await apiService.fetchUserData();
      setCurrentUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  return {
    userData: state.user.currentUser,
    fetchUserData,
    loading,
    error
  };
};

export const usePlans = (userAge: number) => {
  const { state, setAvailablePlans, setPlansLoading } = useInsuranceApplication();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      if (userAge === 0) return;

      try {
        setPlansLoading(true);
        setError(null);
        const plans = await apiService.fetchInsurancePlans({ minAge: userAge });
        const filteredPlans = plans.filter((plan: InsurancePlan) => 
          plan.minimumAge <= userAge && (!plan.maximumAge || plan.maximumAge >= userAge)
        );
        setAvailablePlans(filteredPlans);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch plans');
      } finally {
        setPlansLoading(false);
      }
    };

    fetchPlans();
  }, [userAge, setAvailablePlans, setPlansLoading]);

  return { 
    plans: state.plans.availablePlans, 
    loading: state.plans.isLoading, 
    error 
  };
};
