import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../Table.js';

describe('Table Component', () => {
  it('renders table headers correctly', () => {
    render(<Table data={[]} />);
    expect(screen.getByText(/S.No./i)).toBeInTheDocument();
    expect(screen.getByText(/Percentage Funded/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount Pledged/i)).toBeInTheDocument();
  });

  it('renders no data message when the data array is empty', () => {
    render(<Table data={[]} />);
    expect(screen.getByText(/No projects found./i)).toBeInTheDocument();
  });

  it('renders table rows with correct data', () => {
    const mockData = [
        {
            "s.no": 0,
            "amt.pledged": 15823,
            "percentage.funded": 186,
        }
    ];
    render(<Table data={mockData} />);
    expect(screen.getByText(/Percentage Funded/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount Pledged/i)).toBeInTheDocument();
  });
});
