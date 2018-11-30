import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import axios from "axios";
import { registerUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(userData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container register">
        <form onSubmit={this.onSubmit} noValidate>
          <h4>Register</h4>
          <p>Join the Lang-Talk community!</p>
          <div className="row">
            <div className="col s6">
              <div className="input-field">
                <input
                  value={this.state.name}
                  onChange={this.onChange}
                  id="name"
                  type="text"
                  className={classnames({
                    notvalid: errors.name
                  })}
                />
                {errors.name && (
                  <span className="helper-text">{errors.name}</span>
                )}
                <label htmlFor="name">Name:</label>
              </div>
            </div>
            <div className="col s6">
              <div className="input-field">
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  id="email"
                  type="email"
                  className={classnames({
                    notvalid: errors.email
                  })}
                />
                {errors.email && (
                  <span className="helper-text">{errors.email}</span>
                )}
                <label htmlFor="email">Email:</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <div className="input-field">
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  id="password"
                  type="password"
                  className={classnames({
                    notvalid: errors.password
                  })}
                />
                {errors.password && (
                  <span className="helper-text">{errors.password}</span>
                )}
                <label htmlFor="password">Password:</label>
              </div>
            </div>
            <div className="col s6">
              <div className="input-field">
                <input
                  value={this.state.password2}
                  onChange={this.onChange}
                  id="password2"
                  type="password"
                  className={classnames({
                    notvalid: errors.password2
                  })}
                />
                {errors.password2 && (
                  <span className="helper-text">{errors.password2}</span>
                )}
                <label htmlFor="password2">Confirm Password:</label>
              </div>
            </div>
          </div>
          <input
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          />
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
