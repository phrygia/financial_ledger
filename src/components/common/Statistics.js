import React, { useContext } from "react";
import { store } from "../../App";
import { PieChart } from "react-minimal-pie-chart";
import style from "../../assets/css/statistics.module.css";

// https://www.npmjs.com/package/react-minimal-pie-chart
function Statistics() {
  const [state, dispatch] = useContext(store);

  const Element = (props) => {
    return (
      <text
        dominant-baseline="central"
        x="50"
        y="50"
        dx="19.151111077974452"
        dy="16.06969024216348"
        text-anchor="middle"
        style={{ fontSize: "10px" }}
      >
        <tspan x="50" dy="1.2em">
          {`${Math.round(props.percentage)} %`}
        </tspan>
        <tspan x="0" dy="1.2em">
          {props.title}
        </tspan>
      </text>
    );
  };

  return (
    <div className={style["statistics_container"]}>
      <p>ddd</p>
      지출 수입
      <PieChart
        data={[
          { title: "Excellent", value: 10, color: "#8dcd81" },
          { title: "Good", value: 15, color: "#eefa6b" },
          { title: "Weak", value: 20, color: "#FF6382" },
        ]}
        label={({ dataEntry }) => <Element {...dataEntry} />}
      />
    </div>
  );
}

export default Statistics;
