import React, { Component } from "react";
import "./App.css";
import M from "materialize-css";

import Header from "./components/layout/Header";
import Main from "./components/Main";
import Footer from "./components/layout/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
