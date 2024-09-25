import React from "react";

// The DateCard component receives a date string and displays the day number and the short day name.
const DateCard = ({ dateString }) => {
  // Create a new Date object from the provided date string
  const date = new Date(dateString);

  // Extract the day of the month (e.g., 16 for September 16th)
  const day = date.getDate();

  // Extract the short name of the day (e.g., "Fri" for Friday) using toLocaleString
  const dayName = date.toLocaleString("en-US", { weekday: "short" });

  return (
    <div>
      {/* Display the day of the month */}
      <p>{day}</p>

      {/* Display the short name of the day */}
      <p>{dayName}</p>
    </div>
  );
};

export default DateCard;
