import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

test('renders Navbar component', () => {
  render(<Navbar />);
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});

test('Navbar has correct links', () => {
  render(<Navbar />);
  const aboutLink = screen.getByText(/about/i);
  const contactLink = screen.getByText(/contact/i);
  expect(aboutLink).toBeInTheDocument();
  expect(contactLink).toBeInTheDocument();
});