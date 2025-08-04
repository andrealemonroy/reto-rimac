import React from 'react';
import { InsuranceApplicationProvider } from '../context/PlanContext';


const InsuranceApplicationWrapper: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <InsuranceApplicationProvider>
      {children}
    </InsuranceApplicationProvider>
  );
};

export default InsuranceApplicationWrapper;
export { InsuranceApplicationWrapper as PlanProvider };
