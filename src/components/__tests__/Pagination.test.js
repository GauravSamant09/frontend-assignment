import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination.js';

describe('Pagination Component', () => {
  it('disables the Previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText(/Previous/i)).toBeDisabled();
  });

  it('disables the Next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText(/Next/i)).toBeDisabled();
  });

  it('calls onPageChange with the correct page number when a button is clicked', () => {
    const onPageChangeMock = jest.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChangeMock} />);
    fireEvent.click(screen.getByText(/Next/i));
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
    fireEvent.click(screen.getByText(/Previous/i));
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });
});
