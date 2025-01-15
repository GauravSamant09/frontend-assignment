import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import App from "./App";
import { fetchProjects } from "./services/api";

jest.mock("./utils/api");

describe("App Component", () => {
  it("renders the title correctly", async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText(/Project Explorer/i)).toBeInTheDocument();
  });

  it("displays error message when API call fails", async () => {
    fetchProjects.mockRejectedValueOnce(new Error("API Error"));
    await act(async () => {
      render(<App />);
    });
    await waitFor(() =>
      expect(
        screen.getByText(/Failed to load projects. Please try again./i)
      ).toBeInTheDocument()
    );
  });

  it("renders table data when API call succeeds", async () => {
    const mockData = [
      {
        "s.no": 0,
        "amt.pledged": 15823,
        "percentage.funded": 186,
      },
      {
        "s.no": 1,
        "amt.pledged": 6859,
        "percentage.funded": 8,
      },
    ];

    fetchProjects.mockResolvedValueOnce(mockData);
    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Percentage Funded/i)).toBeInTheDocument();
      expect(screen.getByText(/Amount Pledged/i)).toBeInTheDocument();
    });
  });
});
