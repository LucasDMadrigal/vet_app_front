import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { daysOfWeek } from "../utils/DaysAndHours";

const SlotsAvailableToClient = ({ availableSlots, handleChangeSelectDate }) => {
  const [startDate, setStartDate] = useState(null);
  const [filteredSlots, setFilteredSlots] = useState([]);
  console.log("🚀 ~ availableSlots:", availableSlots);

  const isWeekday = (date) => {
    const dateDay = date.getDay();
    const dayIndex = [];

    daysOfWeek.map((day, index) => {
      if (availableSlots.some((slot) => slot.day === day)) {
        dayIndex.push(index);
      }
    });

    return dayIndex.includes(dateDay);
  };

  const handleCalendarChange = (date) => {
    console.log("🚀 ~ handleCalendarChange ~ date:", new Date(date).toLocaleDateString('es-ES', {weekday: 'long'}));

    setStartDate(date);
    setFilteredSlots(availableSlots.filter((slot) => slot.day === date.getDay()));
  };

  const handleToggleSlot = (slot) => {
    console.log("🚀 ~ handleToggleSlot ~ slot:", slot);
    
  }

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => handleCalendarChange(date)}
        filterDate={isWeekday}
        placeholderText="Select a weekday"
      />
      <div className={`my-4 ${!startDate ? "hidden" : ""}`}>
        <div className="available_slots--container">
          <h3 className="text-lg font-bold mb-4">Available Slots</h3>
          {availableSlots.map((slot, index) => (
            <button
              key={index}
              type="button"
              disabled={slot.available}
              onClick={() => handleToggleSlot(slot)}
              className={`flex-none inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 buton--timeslot
            ${true ? "bg-indigo-600 text-white" : ""}
            ${
              !true
                ? "text-indigo-700 shadow-sm hover:text-white hover:bg-indigo-700"
                : "text-gray-400"
            }`}
            >
              {slot.hour}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
export default SlotsAvailableToClient;
