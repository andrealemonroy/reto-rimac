import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('renders footer element', () => {
    render(<Footer />);
    const footer = document.querySelector('.footer');
    expect(footer).toBeInTheDocument();
  });

  it('renders RIMAC logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', './images/logo_white.svg');
  });

  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText('© 2023 RIMAC Seguros y Reaseguros.')).toBeInTheDocument();
  });

  it('applies correct CSS class', () => {
    render(<Footer />);
    const footer = document.querySelector('.footer');
    expect(footer).toHaveClass('footer');
  });

  it('contains logo section', () => {
    render(<Footer />);
    const logoSection = document.querySelector('.footer__logo');
    expect(logoSection).toBeInTheDocument();
  });

  it('contains company info section', () => {
    render(<Footer />);
    const companyInfo = document.querySelector('.footer__company-info');
    expect(companyInfo).toBeInTheDocument();
  });

  it('renders as div element', () => {
    render(<Footer />);
    const footer = document.querySelector('.footer');
    expect(footer?.tagName).toBe('DIV');
  });
});
