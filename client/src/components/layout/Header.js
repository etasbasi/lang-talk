import React, { Component } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Header extends Component {
  componentDidMount() {
    let elems = this.refs.sidenav;
    M.Sidenav.init(elems);
  }

  onLogoutClick(e) {
    e.preventDefault();

    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLink = (
      <div>
        <li>
          <Link to="/profiles">Users</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>
            Log Out
            <img
              src={user.avatar}
              alt={user.name}
              title="You must have a Gravatar connected to your email to display and image"
            />
          </a>
        </li>
      </div>
    );

    const guestLink = (
      <div>
        <li>
          <Link to="/profiles">Users</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </div>
    );

    return (
      <div className="header">
        <nav>
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">
              Lang-Talk
            </Link>
            <a data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              {isAuthenticated ? authLink : guestLink}
            </ul>
          </div>
        </nav>

        <ul ref="sidenav" className="sidenav" id="mobile-demo">
          {isAuthenticated ? authLink : guestLink}
        </ul>
      </div>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
