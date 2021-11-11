import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../common/Header";
import { store } from "../../App";
import { IoFastFoodOutline, IoSubwayOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";
import { RiMovie2Line } from "react-icons/ri";
import { GiPartyPopper } from "react-icons/gi";
import { BsBook } from "react-icons/bs";
import { CgGym } from "react-icons/cg";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  MdOutlineShoppingBasket,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import style from "../../assets/css/main.module.css";
import Statistics from "../common/Statistics";

function Main() {
  const [state, dispatch] = useContext(store);
  let { money_list } = state;
  money_list.sort((a, b) => {
    // 날짜 정렬
    const d1 = new Date(a.date);
    const d2 = new Date(b.date);
    return d1 - d2;
  });
  const [list, setList] = useState(money_list);
  const [tabClass, setTabClass] = useState("전체내역");
  const iconType = [
    <IoFastFoodOutline color="#9b1b30" />,
    <MdOutlineShoppingBasket color="#5a5b9f" />,
    <IoSubwayOutline color="#e2583e" />,
    <FiCoffee color="#955251" />,
    <FaUserFriends color="#c74375" />,
    <RiMovie2Line color="#53b0ae" />,
    <GiPartyPopper color="#88b04b" />,
    <BsBook color="#5f4b8b" />,
    <CgGym color="#0c4a86" />,
    <BiDotsHorizontalRounded color="#7d8f96" />,
  ];
  const iconInfo = [
    { type: "food", color: "#9b1b30" },
    { type: "shopping", color: "#5a5b9f" },
    { type: "transportation", color: "#e2583e" },
    { type: "coffee", color: "#955251" },
    { type: "date", color: "#c74375" },
    { type: "culture", color: "#53b0ae" },
    { type: "event", color: "#88b04b" },
    { type: "selfImprovement", color: "#5f4b8b" },
    { type: "exercise", color: "#0c4a86" },
    { type: "etc", color: "#7d8f96" },
  ];
  const history = useHistory();

  useEffect(() => {
    if (state.money_list.length === 0) {
      setList(money_list);
    }
  }, [state.money_list, list]);

  const handleEdit = (val) => {
    const ifNotExgistData = localStorage.getItem("money_list");

    // 더미데이터를 수정하면 더미데이터를 localStorage에 등록
    if (ifNotExgistData === null) {
      localStorage.setItem("money_list", JSON.stringify(state.money_list));
      dispatch({ type: "ADD_MONEY_IFNO", money_list: state.money_list });
    }

    const Obj = { info: val };
    localStorage.setItem("edit_info", JSON.stringify(Obj));
    dispatch({ type: "EDIT_MONEY_IFNO", edit_info: Obj });
    history.push("/pay");
  };

  const handleRemove = (val) => {
    let existingEntries = JSON.parse(localStorage.getItem("money_list"));
    const filterVal = existingEntries.filter((v) => {
      if (val.number !== v.number && val.date !== v.date) return v;
    });
    localStorage.setItem("money_list", JSON.stringify(filterVal));
    dispatch({ type: "ADD_MONEY_IFNO", money_list: filterVal });
    setList(filterVal);
  };

  const handleList = (e) => {
    const target = e.target.innerText;
    setTabClass(target);
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
    // 수입, 지출에 따라 값 필터
    const same = i > 0 && list[i - 1].date === list[i].date;
    const typeSpend = val.spending === "수입";
    const typeIdx = iconInfo.findIndex((v) => v.type === val.kinds);

    return (
      <li key={i} className={same ? style["same"] : style["each"]}>
        {!same && <h2>{val.date}</h2>}
        <ul>
          <li>
            <div
              className={style["icon_box"]}
              style={{ borderColor: iconInfo[typeIdx].color }}
            >
              {iconType[typeIdx]}
            </div>
            <div>
              <b>{val.kinds}</b>
              <p>{val.spendContent}</p>
            </div>
          </li>
          <li>
            <span className={typeSpend ? style["income"] : style["cost"]}>
              {typeSpend ? "+ " : "- "}
              {val.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <button onClick={() => handleEdit(val)}>
              <MdOutlineArrowForwardIos color="#adacb4" />
            </button>
          </li>
        </ul>
        <button
          onClick={() => handleRemove(val)}
          className={style["remove_btn"]}
        >
          삭제하기
        </button>
      </li>
    );
  });

  return (
    <>
      <Header class="main" />
      <Statistics />
      <div className={style["tab_container"]}>
        <button
          onClick={handleList}
          className={tabClass === "전체내역" ? style["on"] : ""}
        >
          전체내역
        </button>
        <button
          onClick={handleList}
          className={tabClass === "수입" ? style["on"] : ""}
        >
          수입
        </button>
        <button
          onClick={handleList}
          className={tabClass === "지출" ? style["on"] : ""}
        >
          지출
        </button>
      </div>
      <ul className={style["book_list"]}>
        {list.length === 0 ? (
          <li className={style["empty"]}>거래내역이 없습니다.</li>
        ) : (
          List
        )}
      </ul>
      <Link className={style["add_btn"]} to={"/pay"}>
        내역 추가하기
      </Link>
    </>
  );
}

export default Main;
