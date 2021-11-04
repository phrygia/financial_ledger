import React, { useEffect, useState, useRef } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import style from "../../assets/css/calendar.module.css";

const Calendar = (props) => {
  const {
    setDate,
    setCalendarHeight,
    clicked,
    setClicked,
    editMode,
    firstDate,
    lastDate,
    year,
    month,
    today,
    prevCalendar,
    nextCalendar,
  } = props;

  const [on, setOn] = useState("");
  const [selected, setSelected] = useState(null);
  const calendar = useRef();
  const hasToday = new Date(year, month - 1);
  const condition =
    today.getFullYear() + today.getMonth() ===
    hasToday.getFullYear() + hasToday.getMonth();
  const months = String(month).length === 1 ? `0${month}` : month;

  useEffect(() => {
    // 달력마다 높이값이 다르기 때문에
    setCalendarHeight(calendar.current.clientHeight + 55);

    /* 
      수정모드 - 아직 한번도 클릭하지 않았을때
                선택한 값의 날짜를 상태값으로 불러옴
    */
    if (editMode && !clicked) {
      const getEditDate = editMode.info.date;
      setOn(Number(getEditDate.split("-")[2]) - 1);
      setSelected(new Date(getEditDate));
    }
  }, [month]);

  const onClick = (i) => {
    const now = `${year}/${month}/${i + 1 < 10 ? `0${i + 1}` : i + 1}`;
    setSelected(new Date(now)); // 선택한 날짜값 저장
    setClicked(true); // 처음 선택했는지 확인하기 위해
    setOn(i); // 선택한 일
    setDate(now);
  };

  // 1일이 시작되는 칸을 맞추기 위한 빈칸
  const blank = [...Array(firstDate.getDay())].map((v, i) => (
    <li key={i}>{""}</li>
  ));

  const list = [...Array(lastDate.getDate())].map((v, i) => {
    /*
      **className 
        on - 선택한 날짜에
        today - 오늘날짜
      
      selected : 선택한 날짜에 class on을 주기위한 상태값 -> 선택한 연도+월+on 상태값 (일)을 체크함
    */
    const selectYear = selected
      ? selected.getFullYear() === Number(year)
      : null;
    const selectMonth = selected
      ? selected.getMonth() + 1 === Number(months)
      : null;
    return (
      <li
        key={i}
        onClick={() => onClick(i)}
        className={`${
          condition && i + 1 === today.getDate() ? style["today"] : ""
        } ${selectYear && selectMonth && on === i ? style["on"] : ""}`}
      >
        <input value={i + 1} readOnly />
      </li>
    );
  });

  const days = ["일", "월", "화", "수", "목", "금", "토"].map((v) => (
    <li key={v} className={style["day"]}>
      {v}
    </li>
  ));

  return (
    <div ref={calendar} className={style["calendar_container"]}>
      <div className={style["calendar_ym"]}>
        <button onClick={prevCalendar}>
          <MdArrowBackIos />
        </button>
        <p>
          {year}. {months}
        </p>
        {!condition && (
          <button onClick={nextCalendar}>
            <MdArrowForwardIos />
          </button>
        )}
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
