import React from "react";

// The TimeCard component receives a 'time' prop and displays it.
const TimeCard = ({ time }) => {
  return (
    // Render the time string inside a div
    <div>{time}</div>
  );
};

export default TimeCard;
