import React, { useEffect, useState, useRef } from "react";
import slotsData from "../assets/slots.json";
import DateCard from "../components/DateCard";
import TimeCard from "../components/TimeCard";

const BookAppointments = () => {
  // State for storing the selected date
  const [selectedDate, setSelectedDate] = useState(null);

  // State for storing available time slots for the selected date
  const [availableSlots, setAvailableSlots] = useState([]);

  // State for storing the selected time slot
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Ref to store the reference of the date scroller container (used for horizontal scrolling)
  const dateScrollerRef = useRef(null);

  // Ref to store the reference of a single date button (used to calculate scroll amount)
  const dateButtonRef = useRef(null);

  // Get unique dates from the slots data by mapping and removing duplicates
  const uniqueDates = Array.from(
    new Set(slotsData.map((slot) => slot.displayDate))
  );

  // useEffect to load available slots whenever the selected date changes
  useEffect(() => {
    if (selectedDate) {
      // Filter available slots for the selected date
      const slotsForSelectedDate = slotsData.filter(
        (slot) => slot.displayDate === selectedDate
      );
      setAvailableSlots(slotsForSelectedDate);

      // Reset selected slot when the date changes
      setSelectedSlot(null);
    }
  }, [selectedDate]);

  // Function to handle left scrolling of the date list
  const scrollLeft = () => {
    if (dateScrollerRef.current && dateButtonRef.current) {
      // Get the width of one date button and scroll by that amount
      const scrollAmount = dateButtonRef.current.offsetWidth;
      dateScrollerRef.current.scrollBy({
        left: -scrollAmount, // Scroll to the left
        behavior: "smooth", // Smooth scrolling behavior
      });
    }
  };

  // Function to handle right scrolling of the date list
  const scrollRight = () => {
    if (dateScrollerRef.current && dateButtonRef.current) {
      // Get the width of one date button and scroll by that amount
      const scrollAmount = dateButtonRef.current.offsetWidth;
      dateScrollerRef.current.scrollBy({
        left: scrollAmount, // Scroll to the right
        behavior: "smooth", // Smooth scrolling behavior
      });
    }
  };

  return (
    <div className="container">
      {/* Heading for date selection */}
      <h3>Pick a date</h3>

      {/* Date scroller section with left and right arrows */}
      <div className="date-scroller">
        {/* Left arrow button to scroll dates left */}
        <div className="arrow" onClick={scrollLeft}>
          &larr;
        </div>

        {/* Scroller container for dates, which scrolls horizontally */}
        <div className="date-navigation" ref={dateScrollerRef}>
          {/* Render each unique date as a button */}
          {uniqueDates.map((date) => (
            <button
              key={date}
              className={`date-button ${selectedDate === date ? "active" : ""}`} // Add active class if date is selected
              onClick={() => setSelectedDate(date)} // Set selected date when a date button is clicked
              ref={dateButtonRef} // Set ref to each date button
            >
              <DateCard dateString={date} /> {/* Display date in a card */}
            </button>
          ))}
        </div>

        {/* Right arrow button to scroll dates right */}
        <div className="arrow" onClick={scrollRight}>
          &rarr;
        </div>
      </div>

      {/* Heading for time slot section */}
      <h3 className="main-heading">Available time slot</h3>
      <div className="sub-heading">Each session lasts for 30 minutes</div>

      {/* Display time slots only if there are available slots for the selected date */}
      {availableSlots.length > 0 && (
        <div className="time-slots">
          {/* Render each available time slot as a button */}
          {availableSlots.map((slot) => (
            <button
              key={slot.startTimeUtc}
              className={`time-slot ${
                selectedSlot === slot.startTimeUtc ? "selected" : "" // Highlight the selected time slot
              }`}
              onClick={() => setSelectedSlot(slot.startTimeUtc)} // Set selected time slot when clicked
            >
              <TimeCard time={slot.displayTime} />{" "}
              {/* Display time slot in a card */}
            </button>
          ))}
        </div>
      )}

      {/* Display confirmation message if a time slot is selected */}
      {selectedSlot && (
        <p className="confirmation">
          You have selected:{" "}
          {
            availableSlots.find((slot) => slot.startTimeUtc === selectedSlot)
              ?.displayTime
          }{" "}
          -{" "}
          {
            availableSlots.find((slot) => slot.startTimeUtc === selectedSlot)
              ?.displayTimeEnd
          }{" "}
          ({selectedDate}) {/* Show the selected date and time slot */}
        </p>
      )}
    </div>
  );
};

export default BookAppointments;
