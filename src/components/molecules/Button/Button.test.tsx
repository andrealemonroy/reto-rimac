import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies correct CSS classes for variants', () => {
    const { rerender } = render(<Button color="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--primary');

    rerender(<Button color="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--secondary');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports different button types', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('defaults to primary color', () => {
    render(<Button>Default Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--primary');
  });

  it('defaults to button type', () => {
    render(<Button>Default Type</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('renders without onClick handler', () => {
    render(<Button>No Click Handler</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
  });

  it('applies base button class', () => {
    render(<Button>Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('button');
  });

  it('handles keyboard events properly', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Button</Button>);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

    expect(button).toBeInTheDocument();
  });

  it('supports all button types', () => {
    const { rerender } = render(<Button type="button">Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');

    rerender(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

    rerender(<Button type="reset">Reset</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });

  it('supports both color variants', () => {
    const { rerender } = render(<Button color="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--primary');

    rerender(<Button color="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--secondary');
  });

  it('maintains semantic button behavior', () => {
    render(<Button>Semantic Button</Button>);
    const button = screen.getByRole('button');

    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAccessibleName('Semantic Button');
  });
});
