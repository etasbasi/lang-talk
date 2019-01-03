import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addComment } from "../../actions/postActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class CommentForm extends Component {
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
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);
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
              <span className="card-title">Make a comment</span>
              <TextAreaFieldGroup
                name="text"
                placeholder=""
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
