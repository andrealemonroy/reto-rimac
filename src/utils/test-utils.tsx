import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PlanProvider from '../redux/provider/PlanProvider';

export const renderWithProviders = (
  ui: React.ReactElement,
  options: {
    initialEntries?: string[];
  } = {}
) => {
  const { initialEntries = ['/'] } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <PlanProvider>{children}</PlanProvider>
    </BrowserRouter>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

export const mockApiResponses = {
  user: {
    name: 'Juan',
    lastName: 'Pérez',
    birthDay: '1990-01-01',
    document: 'dni' as const,
    celular: '987654321',
    documentNumber: '12345678',
    privacidad: true,
    comerciales: false,
  },
  plans: {
    list: [
      {
        name: 'Plan Básico',
        price: 150,
        description: ['Consultas médicas', 'Exámenes básicos'],
        age: 18,
      },
      {
        name: 'Plan Premium',
        price: 300,
        description: ['Todo lo del plan básico', 'Especialistas', 'Cirugías'],
        age: 18,
      },
    ],
  },
};

expect.extend({
  toBeInTheDocument: received => {
    const pass = received !== null;
    return {
      message: () =>
        `expected element ${pass ? 'not ' : ''}to be in the document`,
      pass,
    };
  },
});

export { screen, fireEvent, waitFor };
