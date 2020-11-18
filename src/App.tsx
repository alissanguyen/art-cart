import "@shopify/polaris/dist/styles.css";
import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Catalogue from "./pages/Catalogue/Catalogue";
import Home from "./pages/Home";
import LearnMore from "./pages/LearnMore";

const defaultHistory = createBrowserHistory();

function App() {
  return (
    <Router history={defaultHistory}>
      <Navbar></Navbar>

      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/learn-more">
        <LearnMore />
      </Route>

      <Route exact path="/c">
        <Catalogue />
      </Route>
    </Router>
  );
}

export default App;
