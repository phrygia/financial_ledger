import React from "react";
import style from "../../assets/css/header.module.css";

function Header() {
  return (
    <header className={`${style.header}`}>
      <h1>가계부</h1>
      <button>-</button>
    </header>
  );
}

export default Header;
