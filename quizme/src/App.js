import React from "react";
/* import Counter from "./Timer/Timer"; */
import Header from "./Header/Header";
import Home from "./Home/Home";
import Categories from "./Categories/Categories";
import "./App.css";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Categories />
    </div>
  );
}

export default App;
