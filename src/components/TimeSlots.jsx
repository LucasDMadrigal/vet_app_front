import React from "react";
import "../styles/TimeSlots.css";
import { daysOfWeek, hours } from "../utils/DaysAndHours.js";
const TimeSlots = ({disabledSlots, timeSlots, setSelectedTimeSlots }) => {


  const generateSlots = (day) => {
    return hours.map((hour) => ({ day, hour }));
  };

  const handleToggleSlot = (slot) => {
    const exists = timeSlots.some(
      (s) => s.day === slot.day && s.hour === slot.hour
    );

    let updatedSlots;
    if (exists) {
      updatedSlots = timeSlots.filter(
        (s) => !(s.day === slot.day && s.hour === slot.hour)
      );
    } else {
      updatedSlots = [...timeSlots, { ...slot, available: true }];
    }

    setSelectedTimeSlots(updatedSlots);
  };

  const isSlotActive = (slot) =>
    timeSlots.some((s) => s.day === slot.day && s.hour === slot.hour);

  const renderDayColumn = (day) => {
    const slots = generateSlots(day);

    return (
      <div key={day} className="flex flex-col gap-1 justify-start">
        <h3 className="text-lg font-bold mb-4">{day[0] + day.slice(1).toLowerCase()}</h3>
        {slots.map((slot, index) => (
          <button
            key={index}
            type="button"
            disabled={disabledSlots}
            onClick={() => handleToggleSlot(slot)}
            className={`flex-none inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 buton--timeslot
              ${isSlotActive(slot) ? "bg-indigo-600 text-white" : ""}
              ${!disabledSlots ? "text-indigo-700 shadow-sm hover:text-white hover:bg-indigo-700" : "text-gray-400"}`}
          >
            {slot.hour}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="my-4 py-4 timeslots-main--container">
      <h3 className="text-lg font-bold mb-4">Turnos disponibles</h3>
      <div className="flex justify-around overflow-auto">
        {daysOfWeek.map((day) => renderDayColumn(day))}
      </div>
    </div>
  );
};

export default TimeSlots;
