import React, { useEffect, useState, useRef } from "react";
import slotsData from "../assets/slots.json";
import DateCard from "../components/DateCard";
import TimeCard from "../components/TimeCard";

const BookAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const dateScrollerRef = useRef(null); // Reference to the date scroller container
  const dateButtonRef = useRef(null); // Reference to a single date button

  // Get unique dates from slots data
  const uniqueDates = Array.from(
    new Set(slotsData.map((slot) => slot.displayDate))
  );

  useEffect(() => {
    // Load available slots for the selected date
    if (selectedDate) {
      const slotsForSelectedDate = slotsData.filter(
        (slot) => slot.displayDate === selectedDate
      );
      setAvailableSlots(slotsForSelectedDate);
      setSelectedSlot(null); // Reset selected slot
    }
  }, [selectedDate]);

  // Function to handle left scroll
  const scrollLeft = () => {
    if (dateScrollerRef.current && dateButtonRef.current) {
      const scrollAmount = dateButtonRef.current.offsetWidth; // Use the width of a date button for scrolling
      dateScrollerRef.current.scrollBy({
        left: -scrollAmount, // Scroll by the exact width of one card
        behavior: "smooth",
      });
    }
  };

  // Function to handle right scroll
  const scrollRight = () => {
    if (dateScrollerRef.current && dateButtonRef.current) {
      const scrollAmount = dateButtonRef.current.offsetWidth; // Use the width of a date button for scrolling
      dateScrollerRef.current.scrollBy({
        left: scrollAmount, // Scroll by the exact width of one card
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container">
      <h3>Pick a date</h3>
      <div className="date-scroller">
        <div className="arrow" onClick={scrollLeft}>
          &larr;
        </div>
        <div className="date-navigation" ref={dateScrollerRef}>
          {uniqueDates.map((date) => (
            <button
              key={date}
              className={`date-button ${selectedDate === date ? "active" : ""}`}
              onClick={() => setSelectedDate(date)}
              ref={dateButtonRef} // Set reference to each date button
            >
              <DateCard dateString={date} />
            </button>
          ))}
        </div>
        <div className="arrow" onClick={scrollRight}>
          &rarr;
        </div>
      </div>
      <h3 className="main-heading">Available time slot</h3>
      <div className="sub-heading">Each session lasts for 30 minutes</div>
      {availableSlots.length > 0 && (
        <div className="time-slots">
          {availableSlots.map((slot) => (
            <button
              key={slot.startTimeUtc}
              className={`time-slot ${
                selectedSlot === slot.startTimeUtc ? "selected" : ""
              }`}
              onClick={() => setSelectedSlot(slot.startTimeUtc)}
            >
              <TimeCard time={slot.displayTime} />
            </button>
          ))}
        </div>
      )}
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
          ({selectedDate})
        </p>
      )}
    </div>
  );
};

export default BookAppointments;
