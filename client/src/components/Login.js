import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container login">
        <form onSubmit={this.onSubmit}>
          {this.props.auth.user.name}
          <h4>Login</h4>
          <p>Login to your account</p>
          <div className="row">
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
                <label htmlFor="email">Email:</label>
                {errors.email && (
                  <span className="helper-text">{errors.email}</span>
                )}
              </div>
            </div>
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
                <label htmlFor="password">Password:</label>
                {errors.password && (
                  <span className="helper-text">{errors.password}</span>
                )}
              </div>
            </div>
          </div>
          <input className="btn waves-effect waves-light" type="submit" />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
