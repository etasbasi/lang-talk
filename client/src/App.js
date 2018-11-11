import React, { Component } from "react";
import M from "materialize-css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/layout/Header";
import Landing from "./components/Landing";
import Feed from "./components/Feed";
import Question from "./components/Question";
import Dashboard from "./components/Dashboard";
import Footer from "./components/layout/Footer";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/question" component={Question} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
