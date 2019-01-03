import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GoBack from "../common/GoBack";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
        </div>
      );
    }

    return (
      <div className="post container">
        <GoBack to="/posts" />
        {postContent}
        <CommentForm postId={post._id} />
        <CommentFeed postId={post._id} comments={post.comments} />
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
