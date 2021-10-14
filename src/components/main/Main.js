import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import { store } from "../../App";
import { HiOutlineShoppingBag } from "react-icons/hi";
import style from "../../assets/css/main.module.css";

function Main() {
  const [state, dispatch] = useContext(store);
  let { money_list } = state;
  money_list = money_list.sort((a, b) => {
    const d1 = new Date(a.date);
    const d2 = new Date(b.date);
    return d1 - d2;
  });
  const [list, setList] = useState(money_list);
  const [day, setDay] = useState([]);

  const onClick = (val) => {
    console.log(val);
  };

  const handleList = (e) => {
    const target = e.target.innerText;
    if (target === "전체내역") {
      setList(money_list);
    } else {
      let ar = [];
      money_list.map((val) => {
        if (val.spending === target) ar.push(val);
      });
      setList(ar);
    }
  };
  const List = list.map((val, i) => {
    const same = i > 0 && list[i - 1].date === list[i].date;
    return (
      <li key={i} className={same && style["same"]}>
        <h2>{same ? "" : val.date}</h2>
        <ul>
          <li>
            <div>
              <HiOutlineShoppingBag />
            </div>
          </li>
          <li>
            <b>{val.kinds}</b>
            <p>{val.spendContent}</p>
          </li>
          <li>
            <span>{val.price}</span>
            <button onClick={() => onClick(val)}>edit</button>
          </li>
        </ul>
      </li>
    );
  });

  return (
    <>
      <Header class="main" />
      <div className={`${style.tab_container}`}>
        <button onClick={handleList}>전체내역</button>
        <button onClick={handleList}>수입</button>
        <button onClick={handleList}>지출</button>
      </div>
      <ul className={`${style.book_list}`}>{List}</ul>
      <Link to={"/add"}>내역 추가하기</Link>
    </>
  );
}

export default Main;
