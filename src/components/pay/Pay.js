import React from "react";
import Header from "../common/Header";
import FullCalendar from "./FullCalendar";
import style from "../../assets/css/pay.module.css";

function Pay() {
  return (
    <>
      <Header class="pay" />
      <section className={`${style.pay_container}`}>
        <FullCalendar />
        <ul className={`${style.pay_form}`}>
          <li>
            <label>날짜</label>
            <div>
              <input value="" placeholder="년" />
              <input value="" placeholder="월" />
              <input value="" placeholder="일" />
            </div>
          </li>
          <li>
            <label>지출형태</label>
            <select>
              <option value="">식비</option>
              <option value="">쇼핑</option>
              <option value="">교통비</option>
              <option value="">커피</option>
              <option value="">데이트</option>
              <option value="">문화생활</option>
              <option value="">의류</option>
              <option value="">경조사</option>
              <option value="">자기계발</option>
              <option value="">운동</option>
            </select>
          </li>
          <li>
            <label>내용</label>
            <div>
              <input id="" type="radio" value="" />
              <label htmlFor=""></label>
              <input id="" type="radio" value="" />
              <label htmlFor=""></label>
            </div>
            <input placeholder="내용을 입력하세요 (예: 도서 구입)" />
          </li>
          <li>
            <label>금액</label>
            <input placeholder="금액을 입력하세요 (예: 18000)" />
          </li>
          <li>
            <button className={`${style.pay_confirm}`}>입력하기</button>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Pay;
