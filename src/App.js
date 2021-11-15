import React, { useReducer } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/main/Main";
import NotFound from "./components/common/NotFound";
import User from "./components/user/User";
import reducer from "./components/reducers/reducer";
import Pay from "./components/pay/Pay";
import { initialState } from "./components/reducers/initialState";

// dummy 데이터때문에 기본값 주석
// localStorage에서 사용자 이름 받아오기
// const initialState = {
//   user_name: JSON.parse(localStorage.getItem("userName"))?.name,
//   money_list: JSON.parse(localStorage.getItem("money_list")) || [],
//   edit_info: JSON.parse(localStorage.getItem("edit_info")) || null,
// };

export const store = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <store.Provider value={[state, dispatch]}>
      <div className="app">
        <Router basename="/financial_ledger">
          <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/user" component={User} exact />
            <Route path="/pay" component={Pay} />
            <Route path={"*"} component={NotFound} />
          </Switch>
        </Router>
      </div>
    </store.Provider>
  );
}

export default App;
