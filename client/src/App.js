import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { logoutUser } from "./actions/authActions";

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
import CreateProfile from "./components/CreateProfile";
import Footer from "./components/layout/Footer";

// Check if the user is logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode the token
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // TODO: Clear the current profile
    // Redirect to login
    window.location.href = "/login";
  }
}

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
            <Route exact path="/create-profile" component={CreateProfile} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
