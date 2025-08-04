import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { CardSelection } from './index';

jest.mock('react-hook-form');

describe('CardSelection Component', () => {
  const mockRegister = jest.fn();
  const mockUseForm = useForm as jest.MockedFunction<typeof useForm>;

  const defaultProps = {
    id: 'test-plan',
    label: 'Plan para mí',
    description: 'Test description',
    register: mockRegister,
    selectedValue: '',
    icon: 'plan-for-me.svg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseForm.mockReturnValue({
      register: mockRegister,
      handleSubmit: jest.fn(),
      formState: {
        errors: {},
        isDirty: false,
        isLoading: false,
        isSubmitted: false,
        isSubmitSuccessful: false,
        isValidating: false,
        isValid: false,
        isSubmitting: false,
        isReady: true,
        disabled: false,
        submitCount: 0,
        defaultValues: {},
        dirtyFields: {},
        touchedFields: {},
        validatingFields: {},
      },
      control: {} as any,
      watch: jest.fn(),
      setValue: jest.fn(),
      getValues: jest.fn(),
      reset: jest.fn(),
      clearErrors: jest.fn(),
      setError: jest.fn(),
      trigger: jest.fn(),
      unregister: jest.fn(),
      resetField: jest.fn(),
      getFieldState: jest.fn(),
      setFocus: jest.fn(),
      subscribe: jest.fn(),
    });
  });

  it('renders card with all content', () => {
    render(<CardSelection {...defaultProps} />);

    expect(screen.getByText('Plan para mí')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();

    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
});
