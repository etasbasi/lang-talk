import React, { Component } from "react";
import { Link } from "react-router-dom";

import HorizontalCard from "../common/HorizontalCard";

export default class PostItem extends Component {
  render() {
    const { post } = this.props;
    return (
      <HorizontalCard
        link={`/posts/${post._id}`}
        avatar={post.avatar}
        name={post.name}
        text={post.text}
      />
    );
  }
}
