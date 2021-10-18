import React from "react";
import { Link } from "react-router-dom";
import style from "../../assets/css/notFound.module.css";

function NotFound() {
  return (
    <section className={style["container"]}>
      <div className={style["top"]}>
        <h1>
          4<span>0</span>4
        </h1>
      </div>
      <div className={style["text"]}>
        <h3>페이지를 찾을 수 없습니다</h3>
        <p>
          페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
          <br /> 입력하신 주소가 정확한지 다시 한 번 확인해주세요.
        </p>
        <Link to="/financial_ledger">메인으로</Link>
      </div>
    </section>
  );
}

export default NotFound;
