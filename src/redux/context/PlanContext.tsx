// PlanContext.tsx

import React, { createContext, Dispatch, SetStateAction } from 'react';

interface PlanDetails {
  name: string;
  price: number;
}

interface UserData {
  name: string;
  lastName: string;
  birthDay: string;
  document: string;
  celular: string;
  documentNumber: string;
}

export interface PlanContextType {
  userData: UserData | null;
  planDetails: PlanDetails | null;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
  setPlanDetails: Dispatch<SetStateAction<PlanDetails | null>>;
}

// Provide initial values matching the type above
const PlanContext = createContext<PlanContextType>({
  userData: null,
  planDetails: null,
  setUserData: () => {}, // This now correctly represents a function that does nothing
  setPlanDetails: () => {}, // Same as above
});

export default PlanContext;
