import React, { useState } from "react";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Leaderboards from "./Leaderboards/Leaderboards";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Topic from "./Topic/Topic";
import Signin from "./Signin/Signin";
import Signup from "./Signup/Signup";
import Footer from "./Footer/Footer";
import Admin from "./Admin/Admin";

function App() {
  const [logged, setLogged] = useState(false);
  const logging = (val) => {
    setLogged(val);
  };
  return (
    <div id="main">
      <Header log={logged} call={logging} />
      <Container fluid>
        <Switch>
          <Route path="/leaderboards">
            <Leaderboards />
          </Route>
          <Route path="/topic/:topid">
            <Topic />
          </Route>
          <Route path="/signin">
            <Signin call={logging} />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
