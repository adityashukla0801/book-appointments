import React from "react";

const DateCard = ({ dateString }) => {
  const date = new Date(dateString);
  const day = date.getDate(); // Get the day number (e.g., 16)
  const dayName = date.toLocaleString("en-US", { weekday: "short" }); // Get short day name (e.g., Fri)

  return (
    <div>
      <p>{day}</p>
      <p>{dayName}</p>
    </div>
  );
};

export default DateCard;
