import React, { useContext, useState, useEffect } from "react";
import { store } from "../../App";
import { PieChart } from "react-minimal-pie-chart";
import style from "../../assets/css/statistics.module.css";

// https://www.npmjs.com/package/react-minimal-pie-chart
function Statistics() {
  const [state] = useContext(store);
  const [income, setIncome] = useState(0);
  const [cost, setCost] = useState(0);

  // 지출
  const date = [
    { value: 0, color: "#9b1b30", title: "food" },
    { value: 0, color: "#5a5b9f", title: "shopping" },
    { value: 0, color: "#e2583e", title: "transportation" },
    { value: 0, color: "#955251", title: "coffee" },
    { value: 0, color: "#c74375", title: "date" },
    { value: 0, color: "#53b0ae", title: "cluture" },
    { value: 0, color: "#88b04b", title: "event" },
    { value: 0, color: "#5f4b8b", title: "selfImprovement" },
    { value: 0, color: "#0c4a86", title: "exercise" },
    { value: 0, color: "#7d8f96", title: "etc" },
  ];
  // 수입
  const dateIncome = { value: 0 };

  state.money_list &&
    state.money_list.map((val) => {
      if (val.spending === "지출") {
        const idx = date.findIndex((v) => v.title === val.kinds);
        date[idx].value += Number(val.price);
      } else {
        dateIncome.value += Number(val.price);
      }
    });

  useEffect(() => {
    if (state.money_list) {
      setCost(date.reduce((sum, item) => sum + Number(item.value), 0));
      setIncome(dateIncome.value);
    }
  }, []);

  return (
    <div className={style["statistics_container"]}>
      <div className="left">
        <h2>
          <span>지출금</span>
          {cost}
        </h2>
        <h4>
          <span>수입금</span>
          {income}
        </h4>
      </div>
      <div className="right">
        <PieChart
          data={date}
          label={(props) => {
            return props.dataEntry.title;
          }}
        />
      </div>
    </div>
  );
}

export default Statistics;
