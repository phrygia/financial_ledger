import React, { useState } from "react";
import Calendar from "./Calendar";

const FullCalendar = (props) => {
  const { setDate, date, setCalendarHeight, clicked, setClicked, editMode } =
    props;
  const today = new Date();
  const edit = editMode ? editMode.info : null;
  // 수정모드라면 선택한 날짜의 년도, 추가모드라면 오늘 연도를 값으로 설정
  const [year, setYear] = useState(
    edit ? edit.date.split("-")[0] : today.getFullYear()
  );
  // 수정모드라면 선택한 날짜의 월, 추가모드라면 오늘 월을 값으로 설정
  const [month, setMonth] = useState(
    edit ? edit.date.split("-")[1] : today.getMonth() + 1
  );

  // 해당 월의 날짜 추출하기
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
