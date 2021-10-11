import React, { useEffect, useState } from "react";
import style from "../../assets/css/calendar.module.css";

const Calendar = (props) => {
  const {
    firstDate,
    lastDate,
    year,
    month,
    today,
    prevCalendar,
    nextCalendar,
  } = props;

  const hasToday = new Date(year, month - 1);
  const condition =
    today.getFullYear() + today.getMonth() ===
    hasToday.getFullYear() + hasToday.getMonth();

  const onClick = (e) => {
    console.log(e.target.parentNode.childNodes);
    e.target.classList.add("on");
  };

  // 1일이 시작되는 칸을 맞추기 위한 빈칸
  const blank = [...Array(firstDate.getDay())].map((v, i) => (
    <li key={i}>{""}</li>
  ));

  const list = [...Array(lastDate.getDate())].map((v, i) => (
    <li
      key={i}
      onClick={onClick}
      className={condition && i + 1 === today.getDate() ? `${style.today}` : ""}
    >
      {i + 1}
    </li>
  ));

  const days = ["일", "월", "화", "수", "목", "금", "토"].map((v) => (
    <li key={v} className={`${style.day}`}>
      {v}
    </li>
  ));

  return (
    <div className={`${style.calendar_container}`}>
      <div className={`${style.calendar_ym}`}>
        <button onClick={() => prevCalendar()}>prev</button>
        {year} <br />
        {month}
        <button onClick={nextCalendar}>next</button>
      </div>
      <ul>
        {days}
        {blank}
        {list}
      </ul>
    </div>
  );
};

export default Calendar;
