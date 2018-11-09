import React, { Component } from "react";
import M from "materialize-css";

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
            <a href="#" className="brand-logo">
              Lang-Talk
            </a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a href="#">Feed</a>
              </li>
              <li>
                <a href="#">Login</a>
              </li>
            </ul>
          </div>
        </nav>

        <ul ref="sidenav" className="sidenav" id="mobile-demo">
          <li>
            <a href="#">Feed</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
        </ul>
      </div>
    );
  }
}
