import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import InsuranceApplicationWrapper from './redux/provider/PlanProvider';

jest.mock('./components/organisms/Form/Form', () => ({
  Form: () => <div data-testid="form">Form Component</div>,
}));

jest.mock('./components/layout/Header/Header', () => ({
  Header: () => <div data-testid="header">Header Component</div>,
}));

jest.mock('./components/layout/Footer/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer Component</div>,
}));

jest.mock('./components/molecules/Tag', () => ({
  Tag: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tag">{children}</div>
  ),
}));

jest.mock('./components/molecules/Button/Button', () => ({
  Button: ({ children, ...props }: any) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  ),
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: (fn: any) => (e: any) => {
      e.preventDefault();
      fn({});
    },
    formState: { errors: {} },
    watch: jest.fn(),
  }),
}));

const renderApp = () => {
  return render(
    <BrowserRouter>
      <InsuranceApplicationWrapper>
        <App />
      </InsuranceApplicationWrapper>
    </BrowserRouter>
  );
};

describe('App', () => {
  test('renders without crashing', () => {
    renderApp();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('renders form component', () => {
    renderApp();
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  test('renders App component', () => {
    const { container } = renderApp();
    expect(container.firstChild).toBeInTheDocument();
  });
});
