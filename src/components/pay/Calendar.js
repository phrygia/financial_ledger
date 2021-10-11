import React, { useEffect, useState } from 'react';
import style from '../../assets/css/calendar.module.css';

function Calendar() {
	const date = new Date();
	const getToday = date.toISOString().substring(0, 10);
	const [yy, mm, dd] = getToday.split('-');

	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const [calendarYM, setCalendarYM] = useState(`${yy}년 ${mm + 1}월`);
	const [today, setToday] = useState(`현재 ${getToday}`);
	//

	useEffect(() => {
		setCalendarYM(`${date.getFullYear()}년 ${date.getMonth() + 1}월`);
		setToday(
			`현재 ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
		);
	}, []);

	const goToday = () => {};
	return (
		<div>
			<div>
				<p>{calendarYM}</p>
				<p>{today}</p>

				{/* <button onClick={() => setMonth(month - 1)}>&lt;</button>
				<button onClick={() => goToday()}></button>
				<button onClick={() => setMonth(month + 1)}>&gt;</button> */}
			</div>
		</div>
	);
}

export default Calendar;
