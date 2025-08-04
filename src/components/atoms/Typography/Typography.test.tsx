import React from 'react';
import { render, screen } from '@testing-library/react';
import { Title03 } from './Typography';

describe('Typography Components', () => {
  describe('Title03', () => {
    it('renders with correct text', () => {
      render(<Title03>Test Title</Title03>);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders as h3 element', () => {
      render(<Title03>Test Title</Title03>);
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Test Title');
    });

    it('applies correct CSS class', () => {
      render(<Title03>Test Title</Title03>);
      const title = screen.getByRole('heading', { level: 3 });

      expect(title).toHaveClass('title-03');
    });

    it('renders with children content', () => {
      render(
        <Title03>
          <span>Complex</span> Title
        </Title03>
      );
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('handles empty string content', () => {
      render(<Title03>{''}</Title03>);
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('');
    });
  });
});
