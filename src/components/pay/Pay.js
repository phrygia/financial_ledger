import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import FullCalendar from './FullCalendar';
import style from '../../assets/css/pay.module.css';

function Pay() {
    const [calendarHeight, setCalendarHeight] = useState(0);
    const [date, setDate] = useState(null);
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [selected, setSelected] = useState('food');
    const [spending, setSpending] = useState('');
    const [spendContent, setSpendContent] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (date) {
            const yy = date.split(' ')[0];
            const mm = date.split(' ')[1];
            const dd = date.split(' ')[2];
            setYear(yy);
            setMonth(mm);
            setDay(dd);
        }
    }, [date]);

    const handleChangeSelect = (e) => {
        setSelected(e.target.value);
    };

    const handleSpending = (e) => {
        setSpending(e.target.value);
    };

    const handleSpendContent = (e) => {
        setSpendContent(e.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    };

    const handleSubmit = () => {
        if (!date) return alert('날짜를 선택해주세요');
        if (spending.length === 0) return alert('지출/수입을 선택해주세요');
        if (spendContent.length === 0)
            return alert('지출/수입 내용을 입력해주세요');
        console.log(year, month, day, selected, spending, spendContent, price);
        const userObj = {
            date: year - month - day,
            kinds: selected,
            spending: spending,
            spendContent: spendContent,
            price: price,
        // };
        // let old_data = JSON.parse(localStorage.getItem('money_list'));
        // let new_data = old_data.push(userObj);
        // console.lof(new_data, old_data);
        // // console.log(userObj);
        // localStorage.setItem('money_list', JSON.stringify([new_data]));
    };

    return (
        <>
            <Header class="pay" />
            <section className={`${style.pay_container}`}>
                <FullCalendar
                    setDate={setDate}
                    setCalendarHeight={setCalendarHeight}
                />
                <ul
                    className={`${style.pay_form}`}
                    style={{ marginTop: `${calendarHeight}px` }}
                >
                    <li className={`${style.date}`}>
                        <label>날짜</label>
                        <div>
                            <input value={year} placeholder="년" readOnly />
                            <input value={month} placeholder="월" readOnly />
                            <input value={day} placeholder="일" readOnly />
                        </div>
                    </li>
                    <li className={`${style.kinds}`}>
                        <label>지출형태</label>
                        <select onChange={handleChangeSelect} value={selected}>
                            <option value="food">식비</option>
                            <option value="shopping">쇼핑</option>
                            <option value="transportation">교통비</option>
                            <option value="coffee">커피</option>
                            <option value="date">데이트</option>
                            <option value="culture">문화생활</option>
                            <option value="event">경조사</option>
                            <option value="selfImprovement">자기계발</option>
                            <option value="exercise">운동</option>
                        </select>
                    </li>
                    <li className={`${style.content}`}>
                        <label>내용</label>
                        <div>
                            <input
                                id="spending"
                                type="radio"
                                name="condition"
                                value="지출"
                                onClick={handleSpending}
                            />
                            <label
                                htmlFor="spending"
                                className={spending === '지출' ? style.on : ''}
                            >
                                지출
                            </label>
                            <input
                                id="income"
                                type="radio"
                                name="condition"
                                value="수입"
                                onClick={handleSpending}
                            />
                            <label
                                htmlFor="income"
                                className={spending === '수입' ? style.on : ''}
                            >
                                수입
                            </label>
                        </div>
                        <input
                            onChange={handleSpendContent}
                            value={spendContent}
                            placeholder="내용을 입력하세요 (예: 도서 구입)"
                        />
                    </li>
                    <li className={`${style.price}`}>
                        <label>금액</label>
                        <input
                            onChange={handlePrice}
                            value={price}
                            type="number"
                            placeholder="금액을 입력하세요 (예: 18000)"
                        />
                    </li>
                    <li className={`${style.send}`}>
                        <button
                            onClick={handleSubmit}
                            className={`${style.pay_confirm}`}
                        >
                            입력하기
                        </button>
                    </li>
                </ul>
            </section>
        </>
    );
}

export default Pay;
