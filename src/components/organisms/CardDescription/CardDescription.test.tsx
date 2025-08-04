import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardDescription, CardDescriptionProps } from './index';

describe('CardDescription Component', () => {
  const defaultProps: CardDescriptionProps = {
    title: 'Plan Básico',
    cost: '$159 al mes',
    benefits: ['Telemedicina', 'Videoconsulta', 'Chequeos preventivos'],
    onSelectPlan: jest.fn(),
    icon: 'plan-basico.svg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders basic card information', () => {
    render(<CardDescription {...defaultProps} />);

    expect(screen.getByText('Plan Básico')).toBeInTheDocument();
    expect(screen.getByText('$159 al mes')).toBeInTheDocument();
    expect(screen.getByText('Costo del plan')).toBeInTheDocument();
  });

  it('renders all benefits', () => {
    render(<CardDescription {...defaultProps} />);

    expect(screen.getByText('Telemedicina')).toBeInTheDocument();
    expect(screen.getByText('Videoconsulta')).toBeInTheDocument();
    expect(screen.getByText('Chequeos preventivos')).toBeInTheDocument();
  });

  it('displays recommended tag when isRecommended is true', () => {
    render(<CardDescription {...defaultProps} isRecommended={true} />);

    expect(screen.getByText('Plan recomendado')).toBeInTheDocument();
  });

  it('does not display recommended tag when isRecommended is false', () => {
    render(<CardDescription {...defaultProps} isRecommended={false} />);

    expect(screen.queryByText('Plan recomendado')).not.toBeInTheDocument();
  });

  it('shows discount information when showDiscount is provided', () => {
    render(<CardDescription {...defaultProps} showDiscount="$199" />);

    expect(screen.getByText('$199 antes')).toBeInTheDocument();
  });

  it('does not show discount when showDiscount is not provided', () => {
    render(<CardDescription {...defaultProps} showDiscount={null} />);

    expect(screen.queryByText(/antes/)).not.toBeInTheDocument();
  });

  it('renders icon with correct alt text', () => {
    render(<CardDescription {...defaultProps} />);

    const icon = screen.getByAltText('Plan Básico');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/images/plan-basico.svg');
  });

  it('calls onSelectPlan when select button is clicked', () => {
    const mockOnSelectPlan = jest.fn();
    render(
      <CardDescription {...defaultProps} onSelectPlan={mockOnSelectPlan} />
    );

    const selectButton = screen.getByText('Seleccionar Plan');
    fireEvent.click(selectButton);

    expect(mockOnSelectPlan).toHaveBeenCalledTimes(1);
  });

  it('renders with custom icon', () => {
    render(<CardDescription {...defaultProps} icon="custom-icon.svg" />);

    const icon = screen.getByAltText('Plan Básico');
    expect(icon).toHaveAttribute('src', '/images/custom-icon.svg');
  });

  it('handles empty benefits array', () => {
    render(<CardDescription {...defaultProps} benefits={[]} />);

    const benefitsList = screen.getByRole('list');
    expect(benefitsList).toBeInTheDocument();
    expect(benefitsList.children).toHaveLength(0);
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<CardDescription {...defaultProps} />);

    expect(container.firstChild).toHaveClass('card-description');
  });

  it('renders button with primary color', () => {
    render(<CardDescription {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'Seleccionar Plan' });
    expect(button).toHaveClass('button--primary');
  });

  it('handles missing icon gracefully', () => {
    render(<CardDescription {...defaultProps} icon={undefined} />);

    const icon = screen.getByAltText('Plan Básico');
    expect(icon).toHaveAttribute('src', '/images/default-plan.svg');
    expect(icon).toBeInTheDocument();
  });

  it('supports accessibility features', () => {
    render(<CardDescription {...defaultProps} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Plan Básico');
  });

  it('maintains component structure with all optional props', () => {
    const fullProps: CardDescriptionProps = {
      ...defaultProps,
      isRecommended: true,
      showDiscount: '$199',
    };

    render(<CardDescription {...fullProps} />);

    expect(screen.getByText('Plan recomendado')).toBeInTheDocument();
    expect(screen.getByText('Plan Básico')).toBeInTheDocument();
    expect(screen.getByText('$199 antes')).toBeInTheDocument();
    expect(screen.getByText('$159 al mes')).toBeInTheDocument();
    expect(screen.getByText('Seleccionar Plan')).toBeInTheDocument();
  });
});
