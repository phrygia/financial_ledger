import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Header from "../common/Header";
import FullCalendar from "./FullCalendar";
import { store } from "../../App";
import style from "../../assets/css/pay.module.css";

function Pay() {
  const [state, dispatch] = useContext(store);
  const [calendarHeight, setCalendarHeight] = useState(0);
  const [date, setDate] = useState(null);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [clicked, setClicked] = useState(false); // 클릭여부 확인
  const [selected, setSelected] = useState("food");
  const [spending, setSpending] = useState("");
  const [spendContent, setSpendContent] = useState("");
  const [price, setPrice] = useState("");
  const login = state.user_name ? "" : `${style["notLogin"]}`; // 로그인상태인지 체크
  const edit = state.edit_info ? state.edit_info : null; // 수정모드 체크
  const history = useHistory();

  useEffect(() => {
    if (date && clicked) {
      // 선택한 달력이 있을때
      const getFullDate = date.split(" ");
      setYear(getFullDate[0]);
      setMonth(getFullDate[1]);
      setDay(getFullDate[2]);
    }
    if (edit && edit.info && !clicked) {
      // 수정모드 - 달력 클릭하지 않음
      setDate(edit.info.date);
      if (date !== null) {
        const getFullDate = date.split("-");
        setYear(getFullDate[0]);
        setMonth(getFullDate[1]);
        setDay(getFullDate[2]);
      }
      setSelected(edit.info.kinds);
      setSpending(edit.info.spending);
      setSpendContent(edit.info.spendContent);
      setPrice(edit.info.price);
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

  const handleSubmit = (e) => {
    const editMode = e.target.innerText === "수정하기";

    if (!editMode) {
      if (!date) return alert("날짜를 선택해주세요");
      if (spending.length === 0) return alert("지출/수입을 선택해주세요");
    }
    if (spendContent.length === 0)
      return alert("지출/수입 내용을 입력해주세요");
    if (price.length === 0) return alert("금액을 입력해주세요.");

    let existingEntries = JSON.parse(localStorage.getItem("money_list"));
    if (existingEntries == null) existingEntries = [];

    const info = {
      number: existingEntries.length + 1,
      date: `${year}-${month}-${day}`,
      kinds: selected,
      spending: spending,
      spendContent: spendContent,
      price: price,
    };

    // 수정모드
    if (editMode) {
      const editInfo = edit.info;
      info.number = editInfo.number;

      const filterInfo = existingEntries.filter((v) => {
        if (v.number !== editInfo.number) return v;
      });

      filterInfo.push(info);
      localStorage.setItem("money_list", JSON.stringify(filterInfo));
      dispatch({ type: "ADD_MONEY_IFNO", money_list: filterInfo });
      localStorage.removeItem("edit_info");
      dispatch({ type: "EDIT_MONEY_IFNO", edit_info: null });
    } else {
      // 추가모드
      existingEntries.push(info);
      localStorage.setItem("money_list", JSON.stringify(existingEntries));
      dispatch({ type: "ADD_MONEY_IFNO", money_list: existingEntries });
    }

    history.push("/");
  };

  return (
    <>
      <Header class="pay" />
      <section className={`${style["pay_container"]} ${login}`}>
        <FullCalendar
          date={date}
          setDate={setDate}
          setCalendarHeight={setCalendarHeight}
          clicked={clicked}
          setClicked={setClicked}
          editMode={edit}
        />
        <ul
          className={style["pay_form"]}
          style={{ marginTop: `${calendarHeight}px` }}
        >
          <li className={style["date"]}>
            <label>날짜</label>
            <div>
              <input value={year} placeholder="년" readOnly />
              <input value={month} placeholder="월" readOnly />
              <input value={day} placeholder="일" readOnly />
            </div>
          </li>
          <li className={style["kinds"]}>
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
          <li className={style["content"]}>
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
                className={spending === "지출" ? style.on : ""}
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
                className={spending === "수입" ? style.on : ""}
              >
                수입
              </label>
            </div>
            <input
              onChange={handleSpendContent}
              value={spendContent}
              placeholder="내용을 입력하세요 (예: 도서 구입)"
              required
            />
          </li>
          <li className={style["price"]}>
            <label>금액</label>
            <input
              onChange={handlePrice}
              value={price}
              type="number"
              placeholder="금액을 입력하세요 (예: 18000)"
              required
            />
          </li>
          <li className={style["send"]}>
            <button onClick={handleSubmit} className={style["pay_confirm"]}>
              {edit ? "수정하기" : "입력하기"}
            </button>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Pay;
