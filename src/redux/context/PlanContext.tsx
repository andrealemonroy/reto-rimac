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

const PlanContext = createContext<PlanContextType>({
  userData: null,
  planDetails: null,
  setUserData: () => {},
  setPlanDetails: () => {},
});

export default PlanContext;
