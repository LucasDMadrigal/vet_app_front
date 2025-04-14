import React from "react";
import "../styles/TimeSlots.css";

const TimeSlots = () => {
  const timeSlots = [
    {
      day: "MONDAY",
      hour: "09:00 AM",
    },
    {
      day: "MONDAY",
      hour: "11:00 AM",
    },
    {
      day: "WEDNESDAY",
      hour: "02:00 PM",
    },
  ];

  const allMondaySlots = [
    { day: "MONDAY", hour: "08:00 AM" },
    { day: "MONDAY", hour: "09:00 AM" },
    { day: "MONDAY", hour: "10:00 AM" },
    { day: "MONDAY", hour: "11:00 AM" },
    { day: "MONDAY", hour: "12:00 PM" },
    { day: "MONDAY", hour: "01:00 PM" },
    { day: "MONDAY", hour: "02:00 PM" },
    { day: "MONDAY", hour: "03:00 PM" },
    { day: "MONDAY", hour: "04:00 PM" },
    { day: "MONDAY", hour: "05:00 PM" },
    { day: "MONDAY", hour: "06:00 PM" },
  ];

  const allTuesdaySlots = [
    { day: "TUESDAY", hour: "08:00 AM" },
    { day: "TUESDAY", hour: "09:00 AM" },
    { day: "TUESDAY", hour: "10:00 AM" },
    { day: "TUESDAY", hour: "11:00 AM" },
    { day: "TUESDAY", hour: "12:00 PM" },
    { day: "TUESDAY", hour: "01:00 PM" },
    { day: "TUESDAY", hour: "02:00 PM" },
    { day: "TUESDAY", hour: "03:00 PM" },
    { day: "TUESDAY", hour: "04:00 PM" },
    { day: "TUESDAY", hour: "05:00 PM" },
    { day: "TUESDAY", hour: "06:00 PM" },
  ];

  const allWednesdaySlots = [
    { day: "WEDNESDAY", hour: "08:00 AM" },
    { day: "WEDNESDAY", hour: "09:00 AM" },
    { day: "WEDNESDAY", hour: "10:00 AM" },
    { day: "WEDNESDAY", hour: "11:00 AM" },
    { day: "WEDNESDAY", hour: "12:00 PM" },
    { day: "WEDNESDAY", hour: "01:00 PM" },
    { day: "WEDNESDAY", hour: "02:00 PM" },
    { day: "WEDNESDAY", hour: "03:00 PM" },
    { day: "WEDNESDAY", hour: "04:00 PM" },
    { day: "WEDNESDAY", hour: "05:00 PM" },
    { day: "WEDNESDAY", hour: "06:00 PM" },
  ];

  const allThursdaySlots = [
    { day: "THURSDAY", hour: "08:00 AM" },
    { day: "THURSDAY", hour: "09:00 AM" },
    { day: "THURSDAY", hour: "10:00 AM" },
    { day: "THURSDAY", hour: "11:00 AM" },
    { day: "THURSDAY", hour: "12:00 PM" },
    { day: "THURSDAY", hour: "01:00 PM" },
    { day: "THURSDAY", hour: "02:00 PM" },
    { day: "THURSDAY", hour: "03:00 PM" },
    { day: "THURSDAY", hour: "04:00 PM" },
    { day: "THURSDAY", hour: "05:00 PM" },
    { day: "THURSDAY", hour: "06:00 PM" },
  ];

  const allFridaySlots = [
    { day: "FRIDAY", hour: "08:00 AM" },
    { day: "FRIDAY", hour: "09:00 AM" },
    { day: "FRIDAY", hour: "10:00 AM" },
    { day: "FRIDAY", hour: "11:00 AM" },
    { day: "FRIDAY", hour: "12:00 PM" },
    { day: "FRIDAY", hour: "01:00 PM" },
    { day: "FRIDAY", hour: "02:00 PM" },
    { day: "FRIDAY", hour: "03:00 PM" },
    { day: "FRIDAY", hour: "04:00 PM" },
    { day: "FRIDAY", hour: "05:00 PM" },
    { day: "FRIDAY", hour: "06:00 PM" },
  ];

  const allSaturdaySlots = [
    { day: "SATURDAY", hour: "08:00 AM" },
    { day: "SATURDAY", hour: "09:00 AM" },
    { day: "SATURDAY", hour: "10:00 AM" },
    { day: "SATURDAY", hour: "11:00 AM" },
    { day: "SATURDAY", hour: "12:00 PM" },
    { day: "SATURDAY", hour: "01:00 PM" },
    { day: "SATURDAY", hour: "02:00 PM" },
    { day: "SATURDAY", hour: "03:00 PM" },
    { day: "SATURDAY", hour: "04:00 PM" },
    { day: "SATURDAY", hour: "05:00 PM" },
    { day: "SATURDAY", hour: "06:00 PM" },
  ];

  const allSundaySlots = [
    { day: "SUNDAY", hour: "08:00 AM" },
    { day: "SUNDAY", hour: "09:00 AM" },
    { day: "SUNDAY", hour: "10:00 AM" },
    { day: "SUNDAY", hour: "11:00 AM" },
    { day: "SUNDAY", hour: "12:00 PM" },
    { day: "SUNDAY", hour: "01:00 PM" },
    { day: "SUNDAY", hour: "02:00 PM" },
    { day: "SUNDAY", hour: "03:00 PM" },
    { day: "SUNDAY", hour: "04:00 PM" },
    { day: "SUNDAY", hour: "05:00 PM" },
    { day: "SUNDAY", hour: "06:00 PM" },
  ];

  const allTimeSlots = [
    ...allMondaySlots,
    ...allTuesdaySlots,
    ...allWednesdaySlots,
    ...allThursdaySlots,
    ...allFridaySlots,
    ...allSaturdaySlots,
    ...allSundaySlots,
  ];

  const mondaySlots = timeSlots.filter((slot) => slot.day === "MONDAY");
  const tuesdaySlots = timeSlots.filter((slot) => slot.day === "TUESDAY");
  const wednesdaySlots = timeSlots.filter((slot) => slot.day === "WEDNESDAY");
  const thursdaySlots = timeSlots.filter((slot) => slot.day === "THURSDAY");
  const fridaySlots = timeSlots.filter((slot) => slot.day === "FRIDAY");
  const saturdaySlots = timeSlots.filter((slot) => slot.day === "SATURDAY");
  const sundaySlots = timeSlots.filter((slot) => slot.day === "SUNDAY");
  return (
    <div className="my-4 py-4 timeslots-main--container">
      <h3 className="text-lg font-bold mb-4">Turnos disponibles</h3>
      <div className="flex gap-1 justify-start">
      <div className="flex flex-col	gap-1 justify-start">
      <h3 className="text-lg font-bold mb-4">Lunes</h3>
        {allMondaySlots.map((slot, index) => (
          // <button
          <button
            className="flex-none inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 buton--timeslot"
            key={index}
          >
            {slot.hour}
          </button>
        ))}
      </div>
      <div className="flex flex-col	gap-1 justify-start">
      <h3 className="text-lg font-bold mb-4">Lunes</h3>
        {allMondaySlots.map((slot, index) => (
          // <button
          <button
            className="flex-none inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 buton--timeslot"
            key={index}
          >
            {slot.hour}
          </button>
        ))}
      </div>
      <div className="flex flex-col	gap-1 justify-start">
      <h3 className="text-lg font-bold mb-4">Lunes</h3>
        {allMondaySlots.map((slot, index) => (
          // <button
          <button
            className="flex-none inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 buton--timeslot"
            key={index}
          >
            {slot.hour}
          </button>
        ))}
      </div>
      <div className="flex flex-col	gap-1 justify-start">
      <h3 className="text-lg font-bold mb-4">Lunes</h3>
        {allMondaySlots.map((slot, index) => (
          // <button
          <button
            className="flex-none inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 buton--timeslot"
            key={index}
          >
            {slot.hour}
          </button>
        ))}
      </div>
      <div className="flex flex-col	gap-1 justify-start">
      <h3 className="text-lg font-bold mb-4">Lunes</h3>
        {allMondaySlots.map((slot, index) => (
          // <button
          <button
            className="flex-none inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 buton--timeslot"
            key={index}
          >
            {slot.hour}
          </button>
        ))}
      </div>
      <div className="flex flex-col	gap-1 justify-start">
      <h3 className="text-lg font-bold mb-4">Lunes</h3>
        {allMondaySlots.map((slot, index) => (
          // <button
          <button
            className="flex-none inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 buton--timeslot"
            key={index}
          >
            {slot.hour}
          </button>
        ))}
      </div>
      <div className="flex flex-col	gap-1 justify-start">
      <h3 className="text-lg font-bold mb-4">Lunes</h3>
        {allMondaySlots.map((slot, index) => (
          // <button
          <button
            className="flex-none inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 buton--timeslot"
            key={index}
          >
            {slot.hour}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TimeSlots;
