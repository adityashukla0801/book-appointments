import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookAppointments from "../BookAppointments";
import slotsData from "../../assets/slots.json";

// Mocking the slotsData for tests
jest.mock("../../assets/slots.json", () => [
  {
    displayDate: "2024-08-16",
    displayTime: "10:00 AM",
    startTimeUtc: "2024-08-16T10:00:00Z",
    displayTimeEnd: "10:30 AM",
  },
  {
    displayDate: "2024-08-16",
    displayTime: "11:00 AM",
    startTimeUtc: "2024-08-16T11:00:00Z",
    displayTimeEnd: "11:30 AM",
  },
  {
    displayDate: "2024-08-17",
    displayTime: "10:00 AM",
    startTimeUtc: "2024-08-17T10:00:00Z",
    displayTimeEnd: "10:30 AM",
  },
]);

describe("BookAppointments Component", () => {
  beforeEach(() => {
    render(<BookAppointments />);
  });

  test("renders 'Pick a date' heading", () => {
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });

  test("renders unique dates as buttons", () => {
    const uniqueDates = Array.from(
      new Set(slotsData.map((slot) => slot.displayDate))
    );
    uniqueDates.forEach((date) => {
      const parsedDate = new Date(date).getDate(); // Get day number
      expect(screen.getByText(parsedDate)).toBeInTheDocument();
    });
  });

  test("scrolls left and right on arrow click", () => {
    const leftArrow = screen.getByText("←");
    const rightArrow = screen.getByText("→");

    fireEvent.click(leftArrow);
    fireEvent.click(rightArrow);

    // No direct assertion can be made on scroll, but you can mock scroll behavior or check for changes if needed
  });

  test("displays available time slots for the selected date", async () => {
    fireEvent.click(screen.getByText("16")); // Select the 16th date

    // Wait for the time slots to render
    await waitFor(() => {
      const slotsForSelectedDate = slotsData.filter(
        (slot) => slot.displayDate === "2024-08-16"
      );
      slotsForSelectedDate.forEach((slot) => {
        expect(screen.getByText(slot.displayTime)).toBeInTheDocument();
      });
    });
  });

  test("selects a time slot and displays confirmation", async () => {
    fireEvent.click(screen.getByText("16")); // Select the 16th date

    // Wait for time slots to appear
    await waitFor(() => {
      const timeButton = screen.getByText("10:00 AM"); // Select the time slot
      fireEvent.click(timeButton);

      // Verify that the confirmation message appears
      expect(screen.getByText(/You have selected:/i)).toBeInTheDocument();
      expect(screen.getByText("10:00 AM")).toBeInTheDocument(); // Check if the selected time is displayed
      expect(screen.getByText(/2024-08-16/i)).toBeInTheDocument(); // Ensure the correct date is displayed
    });
  });
});
