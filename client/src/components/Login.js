import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div className="container">
        <h4>Login</h4>
        <div className="row">
          <div className="col s6">
            <div className="input-field">
              <input id="email" type="text" className="validate" />
              <label htmlFor="email">Email:</label>
            </div>
          </div>
          <div className="col s6">
            <div className="input-field">
              <input id="password" type="password" className="validate" />
              <label htmlFor="password">Password:</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
