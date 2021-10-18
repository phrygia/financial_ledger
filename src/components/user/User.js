import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { GiWallet } from "react-icons/gi";
import { store } from "../../App";
import style from "../../assets/css/user.module.css";

function User() {
  const [state, dispatch] = useContext(store);
  const history = useHistory();
  const { user_name } = state;
  const name = user_name ? user_name : "";
  const [userName, setUserName] = useState(name);

  const onChange = (e) => {
    setUserName(e.target.value);
  };

  const onClick = () => {
    if (userName.length === 0) return alert("이름을 입력해주세요");
    const userObj = { name: userName };
    localStorage.setItem("userName", JSON.stringify(userObj));
    dispatch({ type: "SET_USER_NAME", user_name: userName });
    history.push("/financial_ledger");
  };

  return (
    <section className={style["user_form"]}>
      <header>
        <div>
          <GiWallet />
        </div>
      </header>
      <form>
        {user_name ? (
          <>
            <h1>사용자 수정</h1>
            <p>새로운 사용자를 입력해주세요.</p>
          </>
        ) : (
          <>
            <h1>사용자 입력</h1>
            <p>시작 전 사용자를 입력해주세요.</p>
          </>
        )}

        <input
          value={userName}
          onChange={onChange}
          maxLength="10"
          placeholder="이름 (1~10글자)"
        />
      </form>
      <button onClick={onClick}>{user_name ? "수정하기" : "시작하기"}</button>
      {user_name && (
        <Link to="/financial_ledger" className={style["cancel_btn"]}>
          취소하기
        </Link>
      )}
    </section>
  );
}

export default User;
