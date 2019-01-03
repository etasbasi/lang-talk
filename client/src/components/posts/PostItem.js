import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

import { addLike, removeLike, deletePost } from "../../actions/postActions";
import HorizontalCard from "../common/HorizontalCard";

class PostItem extends Component {
  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnLikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  render() {
    const { post, auth, showActions } = this.props;
    let actions = () => (
      <div className="post-actions">
        <span>
          <i
            onClick={this.onLikeClick.bind(this, post._id)}
            className={classnames("far fa-thumbs-up", {
              active: this.findUserLike(post.likes)
            })}
          />
          <span>{post.likes.length}</span>
        </span>
        <span>
          <i
            onClick={this.onUnLikeClick.bind(this, post._id)}
            className="far fa-thumbs-down"
          />
        </span>
        {post.user === auth.user.id ? (
          <span>
            <i
              onClick={this.onDeleteClick.bind(this, post._id)}
              className="delete-post-button fas fa-window-close"
            />
          </span>
        ) : null}
      </div>
    );
    return (
      <HorizontalCard
        link={`/post/${post._id}`}
        avatar={post.avatar}
        name={post.name}
        text={post.text}
        RenderActions={showActions ? actions : null}
      />
    );
  }
}

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool
};

PostItem.defaultProps = {
  showActions: true
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
