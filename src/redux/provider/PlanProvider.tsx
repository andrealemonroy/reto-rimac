import React, { useState } from 'react';
import PlanContext, { PlanContextType } from '../context/PlanContext';

const PlanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<PlanContextType['userData']>(null);
  const [planDetails, setPlanDetails] =
    useState<PlanContextType['planDetails']>(null);

  const value = { userData, setUserData, planDetails, setPlanDetails };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export default PlanProvider;
