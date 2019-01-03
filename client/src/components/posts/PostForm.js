import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addPost } from "../../actions/postActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class PostForm extends Component {
  state = {
    text: "",
    errors: {}
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: "" });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <form onSubmit={this.onSubmit}>
              <span className="card-title">
                Ask a question or make a comment
              </span>
              <TextAreaFieldGroup
                name="text"
                placeholder="Create a post"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />
              <input className="btn waves-effect waves-light" type="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
