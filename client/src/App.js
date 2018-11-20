import React, { Component } from "react";
import M from "materialize-css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

import Header from "./components/layout/Header";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Feed from "./components/Feed";
import Question from "./components/Question";
import Dashboard from "./components/Dashboard";
import Footer from "./components/layout/Footer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/feed" component={Feed} />
            <Route exact path="/question" component={Question} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
