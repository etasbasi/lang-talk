import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteComment } from "../../actions/postActions";
import HorizontalCard from "../common/HorizontalCard";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, auth, postId } = this.props;
    let actions = () => (
      <div className="post-actions">
        {comment.user === auth.user.id ? (
          <span>
            <i
              onClick={this.onDeleteClick.bind(this, postId, comment._id)}
              className="delete-post-button fas fa-window-close"
            />
          </span>
        ) : null}
      </div>
    );
    return (
      <HorizontalCard
        link={`/profile/comment._id`}
        avatar={`/api/profile/avatar/${comment.user}`}
        name={comment.name}
        text={comment.text}
        RenderActions={actions}
      />
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
