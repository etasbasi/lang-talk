import React, { Component } from "react";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container dashboard">
        <div className="fixed-action-btn">
          <a
            href="#"
            className="hoverable waves-effect btn-floating btn-large red"
          >
            <i className="large material-icons">mode_edit</i>
          </a>
        </div>
        <h3>Dashboard</h3>
        <img src="imgs/profile.png" alt="" className="profile-img" />
        <h4>Enes</h4>
        <div className="cards">
          <div className="card small">
            <div className="card-content">
              <h5>Languages Spoken</h5>
              <ul>
                <li>Turkish</li>
                <li>English</li>
                <li>Arabic</li>
                <li>Russian</li>
              </ul>
            </div>
          </div>
          <div className="card small">
            <div className="card-content">
              <h5>Interested in Languages</h5>
              <ul>
                <li>French</li>
                <li>Japanese</li>
                <li>Korean</li>
                <li>Spanish</li>
              </ul>
            </div>
          </div>
          <div className="card small">
            <div className="card-content">
              <h5>Hobbies</h5>
              <ul>
                <li>Coding</li>
                <li>Working out</li>
                <li>Reading</li>
                <li>Watching movies </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
