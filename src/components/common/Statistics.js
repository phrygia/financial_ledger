import React, { useContext, useState, useEffect } from "react";
import { store } from "../../App";
import { PieChart } from "react-minimal-pie-chart";
import Modal from "./Modal";
import style from "../../assets/css/statistics.module.css";

function Statistics() {
  const [state] = useContext(store);
  const [income, setIncome] = useState(0);
  const [cost, setCost] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [costDate, setcostDate] = useState(null);

  // 지출
  let date = [
    { value: 0, color: "#9b1b30", title: "food", label: "음식" },
    { value: 0, color: "#5a5b9f", title: "shopping", label: "쇼핑" },
    { value: 0, color: "#e2583e", title: "transportation", label: "교통" },
    { value: 0, color: "#955251", title: "coffee", label: "커피" },
    { value: 0, color: "#c74375", title: "date", label: "데이트" },
    { value: 0, color: "#53b0ae", title: "cluture", label: "문화생활" },
    { value: 0, color: "#88b04b", title: "event", label: "이벤트" },
    { value: 0, color: "#5f4b8b", title: "selfImprovement", label: "자기계발" },
    { value: 0, color: "#0c4a86", title: "exercise", label: "운동" },
    { value: 0, color: "#7d8f96", title: "etc", label: "기타" },
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

      const filteDate = date.filter((v) => {
        if (v.value !== 0) return v;
      });
      setcostDate(filteDate);
    }
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={style["statistics_container"]}>
      <div className={style["left"]}>
        <h2>
          <span>지출금</span>
          {cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h2>
        <br />
        <h4>
          <span>수입금</span>
          {income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h4>
      </div>
      <div className={style["right"]}>
        {state.money_list.length > 0 && (
          <PieChart
            lineWidth={65}
            onClick={openModal}
            data={[
              { value: cost, color: "#b91f32", label: "지출" },
              {
                value: income,
                color: "#53aa00",
                label: "수입",
              },
            ]}
            label={(props) => {
              return props.dataEntry.label;
            }}
            labelPosition={62}
          />
        )}
      </div>
      <Modal open={modalOpen} confirm={closeModal} close={closeModal}>
        <PieChart
          lineWidth={80}
          data={costDate}
          labelPosition={75}
          label={(props) => {
            return props.dataEntry.label;
          }}
        />
      </Modal>
    </div>
  );
}

export default Statistics;
