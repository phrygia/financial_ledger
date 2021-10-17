import React, { useState } from "react";
import Calendar from "./Calendar";

const FullCalendar = (props) => {
  const today = new Date();

  const { setDate, date, setCalendarHeight, clicked, setClicked, editMode } =
    props;
  const edit = editMode ? editMode.info : null;
  const [year, setYear] = useState(
    edit ? edit.date.split("-")[0] : today.getFullYear()
  );
  const [month, setMonth] = useState(
    edit ? edit.date.split("-")[1] : today.getMonth() + 1
  );

  const firstDate = edit
    ? new Date(edit.date.split("-")[0], edit.date.split("-")[1] - 1, 1)
    : new Date(year, month - 1, 1);
  const lastDate = edit
    ? new Date(edit.date.split("-")[0], edit.date.split("-")[1], 0)
    : new Date(year, month, 0);

  const prevCalendar = () => {
    if (month === 1) {
      setYear(Number(year) - 1);
      setMonth(12);
    } else {
      setYear(Number(year));
      setMonth(Number(month) - 1);
    }
  };
  const nextCalendar = () => {
    if (Number(month) === 12) {
      setYear(Number(year) + 1);
      setMonth(1);
    } else {
      setYear(Number(year));
      setMonth(Number(month) + 1);
    }
  };

  return (
    <>
      <Calendar
        setDate={setDate}
        date={date}
        setCalendarHeight={setCalendarHeight}
        firstDate={firstDate}
        lastDate={lastDate}
        clicked={clicked}
        setClicked={setClicked}
        editMode={editMode}
        year={year}
        month={month}
        today={today}
        prevCalendar={prevCalendar}
        nextCalendar={nextCalendar}
      />
    </>
  );
};

export default FullCalendar;
