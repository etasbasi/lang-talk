import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import PostFeed from "./PostFeed";
import PostForm from "./PostForm";

class Posts extends Component {
  componentDidMount() {
    document.title = "Posts - LangTalk";
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;

    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="container feed">
        <h4>Feed</h4>
        <PostForm />
        {postContent}
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
