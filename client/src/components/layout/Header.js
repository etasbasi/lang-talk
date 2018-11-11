import React, { Component } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";

export default class Header extends Component {
  componentDidMount() {
    let elems = this.refs.sidenav;
    M.Sidenav.init(elems);
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">
              Lang-Talk
            </Link>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/feed">Feed</Link>
              </li>
              <li>
                <a href="#">Login</a>
              </li>
            </ul>
          </div>
        </nav>

        <ul ref="sidenav" className="sidenav" id="mobile-demo">
          <li>
            <Link to="/feed">Feed</Link>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
        </ul>
      </div>
    );
  }
}
