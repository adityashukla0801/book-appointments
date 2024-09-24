import { render, screen } from "@testing-library/react";
import TimeCard from "../TimeCard";

describe("TimeCard Component", () => {
  test("renders time correctly", () => {
    const time = "10:00 AM";
    render(<TimeCard time={time} />);

    // Check if time is correctly rendered
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
  });
});
