import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
  it('renders header element', () => {
    render(<Header />);
    const header = document.querySelector('.header');
    expect(header).toBeInTheDocument();
  });

  it('renders RIMAC logo', () => {
    render(<Header />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', './images/logo.svg');
  });

  it('renders contact information', () => {
    render(<Header />);
    expect(screen.getByText('¡Compra por este medio!')).toBeInTheDocument();
    expect(screen.getByText('(01) 411 6001')).toBeInTheDocument();
  });

  it('renders phone icon', () => {
    render(<Header />);
    const phoneIcon = screen.getByAltText('phone');
    expect(phoneIcon).toBeInTheDocument();
    expect(phoneIcon).toHaveAttribute('src', './images/phone.svg');
  });

  it('applies correct CSS classes', () => {
    render(<Header />);
    const header = document.querySelector('.header');
    expect(header).toHaveClass('header');
  });

  it('contains contact info section', () => {
    render(<Header />);
    const contactInfo = document.querySelector('.header__contact-info');
    expect(contactInfo).toBeInTheDocument();
  });

  it('contains buy now section', () => {
    render(<Header />);
    const buyNow = document.querySelector('.header__contact-info--buy-now');
    expect(buyNow).toBeInTheDocument();
  });

  it('contains phone section', () => {
    render(<Header />);
    const phone = document.querySelector('.header__contact-info--phone');
    expect(phone).toBeInTheDocument();
  });

  it('renders as div element', () => {
    render(<Header />);
    const header = document.querySelector('.header');
    expect(header?.tagName).toBe('DIV');
  });
});
