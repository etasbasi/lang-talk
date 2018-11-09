import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="container valign-wrapper">
          <p>
            <i className="material-icons">copyright</i> Lang-Talk{" "}
            <span>{new Date().getFullYear()}</span>
          </p>
        </div>
      </footer>
    );
  }
}
