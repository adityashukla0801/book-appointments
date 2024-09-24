import { render, screen } from "@testing-library/react";
import DateCard from "../DateCard";

describe("DateCard Component", () => {
  test("renders date and day name correctly", () => {
    const dateString = "2024-08-16"; // A specific date
    render(<DateCard dateString={dateString} />);

    // Check if day number and day name are correctly rendered
    expect(screen.getByText("16")).toBeInTheDocument();
    expect(screen.getByText("Fri")).toBeInTheDocument();
  });
});
