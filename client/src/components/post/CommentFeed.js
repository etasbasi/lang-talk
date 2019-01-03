import React, { Component } from "react";
import CommentItem from "./CommentItem";

import Spinner from "../common/Spinner";

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;

    let feedItems;
    if (!comments) {
      feedItems = <Spinner />;
    } else {
      feedItems = comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={postId} />
      ));
    }

    return <div>{feedItems}</div>;
  }
}

export default CommentFeed;
