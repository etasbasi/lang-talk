import React, { Component } from "react";

import "../../styles/PageNotFound.css";
export default class PageNotFound extends Component {
  componentDidMount() {
    document.title = "404 Page Not Found - LangTalk";
  }
  render() {
    return (
      <div className="container page-not-found">
        <h1>404 - Page Not Found</h1>
        <h4>There is no content here :(</h4>

        <button
          onClick={() => this.props.history.goBack()}
          class="waves-effect waves-light btn"
        >
          Go Back
        </button>
        <button
          onClick={() => (window.location = "/")}
          class="waves-effect waves-light btn"
        >
          Home Page
        </button>
      </div>
    );
  }
}
