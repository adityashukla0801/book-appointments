// App.test.js

import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the BookAppointments page", () => {
  render(<App />);

  // Check if "Pick a date" heading is displayed
  expect(screen.getByText("Pick a date")).toBeInTheDocument();
});
