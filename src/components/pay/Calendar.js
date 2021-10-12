import React, { useEffect, useState, useRef } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import style from '../../assets/css/calendar.module.css';

const Calendar = (props) => {
    const {
        setDate,
        setCalendarHeight,
        firstDate,
        lastDate,
        year,
        month,
        today,
        prevCalendar,
        nextCalendar,
    } = props;

    const [on, setOn] = useState('');
    const calendar = useRef();
    const hasToday = new Date(year, month - 1);
    const condition =
        today.getFullYear() + today.getMonth() ===
        hasToday.getFullYear() + hasToday.getMonth();
    const months = String(month).length === 1 ? `0${month}` : month;
    // console.log();
    useEffect(() => {
        setCalendarHeight(calendar.current.clientHeight + 55);
    }, [month]);

    const onClick = (i) => {
        setOn(i);
        setDate(`${year} ${months} ${i + 1 < 10 ? `0${i + 1}` : i + 1}`);
    };

    // 1일이 시작되는 칸을 맞추기 위한 빈칸
    const blank = [...Array(firstDate.getDay())].map((v, i) => (
        <li key={i}>{''}</li>
    ));

    const list = [...Array(lastDate.getDate())].map((v, i) => (
        <li
            key={i}
            onClick={() => onClick(i)}
            className={`${
                condition && i + 1 === today.getDate() ? style.today : ''
            } ${on === i ? style.on : ''}`}
        >
            <input value={i + 1} readOnly />
        </li>
    ));

    const days = ['일', '월', '화', '수', '목', '금', '토'].map((v) => (
        <li key={v} className={`${style.day}`}>
            {v}
        </li>
    ));

    return (
        <div ref={calendar} className={`${style.calendar_container}`}>
            <div className={`${style.calendar_ym}`}>
                <button onClick={() => prevCalendar()}>
                    <MdArrowBackIos />
                </button>
                <p>
                    {year}. {months}
                </p>
                <button onClick={nextCalendar}>
                    <MdArrowForwardIos />
                </button>
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
