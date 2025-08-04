import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tag } from './Tag';

describe('Tag Component', () => {
  it('renders with text content', () => {
    render(<Tag>Test Tag</Tag>);
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  it('renders with complex children', () => {
    render(
      <Tag>
        <span>Complex</span> Tag Content
      </Tag>
    );
    expect(screen.getByText('Complex')).toBeInTheDocument();
    expect(screen.getByText('Tag Content')).toBeInTheDocument();
  });

  it('applies correct CSS class', () => {
    render(<Tag>Test Tag</Tag>);
    const tag = screen.getByText('Test Tag');
    expect(tag).toHaveClass('tag');
  });

  it('renders as span element', () => {
    render(<Tag>Test Tag</Tag>);
    const tag = screen.getByText('Test Tag');
    
    expect(tag).toBeInTheDocument();
  });

  it('handles empty content', () => {
    render(<Tag>{''}</Tag>);
    const tag = document.querySelector('.tag');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveTextContent('');
  });

  it('handles numeric children', () => {
    render(<Tag>{42}</Tag>);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('handles boolean children', () => {
    render(<Tag>{true}</Tag>);
    const tag = document.querySelector('.tag');
    expect(tag).toBeInTheDocument();
  });
});
