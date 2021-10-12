import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";

function FullCalendar() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);

  const prevCalendar = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setYear(year);
      setMonth(month - 1);
    }
  };
  const nextCalendar = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setYear(year);
      setMonth(month + 1);
    }
  };

  return (
    <div>
      <Calendar
        firstDate={firstDate}
        lastDate={lastDate}
        year={year}
        month={month}
        today={today}
        prevCalendar={prevCalendar}
        nextCalendar={nextCalendar}
      />
    </div>
  );
}

export default FullCalendar;
