import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { Form } from './Form';

const TestFormWrapper = ({ formInputs, onSubmit }: any) => {
  const form = useForm({
    defaultValues: {
      document: 'dni',
      documentNumber: '',
      celular: '',
      privacidad: false,
      comerciales: false,
      cardSelection: '',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form formInputs={formInputs} form={form} />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('Form Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders form inputs correctly', () => {
    const formInputs = [
      {
        type: 'document',
        label: 'Nro. de Documento',
        name: 'document',
      },
      {
        type: 'number',
        label: 'Celular',
        name: 'celular',
      },
    ];

    render(<TestFormWrapper formInputs={formInputs} onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/nro\. de documento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/celular/i)).toBeInTheDocument();
  });
});
