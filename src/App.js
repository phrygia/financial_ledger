import React, { useReducer } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Main from "./components/main/Main";
import NotFound from "./components/common/NotFound";
import User from "./components/user/User";
import reducer from "./components/reducers/reducer";
import Pay from "./components/pay/Pay";

// localStorage에서 사용자 이름 받아오기
const initialState = {
  user_name: localStorage.getItem("userName")
    ? JSON.parse(localStorage.getItem("userName")).name
    : null,
};

export const store = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <store.Provider value={[state, dispatch]}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/user" component={User} exact />
            {state.user_name ? (
              <Route path="/add" component={Pay} />
            ) : (
              <Redirect to="/" />
            )}
            <Route path={"*"} component={NotFound} />
          </Switch>
        </Router>
      </div>
    </store.Provider>
  );
}

export default App;
