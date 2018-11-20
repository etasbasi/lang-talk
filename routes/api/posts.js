const mongoose = require("mongoose");
const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

// jwt secret
const keys = require("../../config/keys");

// Load models
const Profile = require("./../../models/Profile");
const Post = require("./../../models/Post");

// Validation
const validatePostInput = require("../../validation/post");

// @route   GET api/profile/test
// @desc    Tests users route
// @access  Public
router.get("/test/", (req, res) => res.json({ msg: "Posts route works" }));

// @route   GET api/posts/
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(404).json({ nopostfound: "No posts found" });
    });
});

// @route   POST api/posts
// @desc    Post a post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      user: req.user.id
    });

    newPost.save().then(post => {
      res.json(post);
    });
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      // Check for post owner
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorized" });
      }

      // Delete
      post
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      if (
        post.likes.filter(like => like.user.toString() === req.user.id).length >
        0
      ) {
        return res
          .status(400)
          .json({ alreadyliked: "User already liked this post" });
      }

      // Add the user id to the like array
      post.likes.unshift({ user: req.user.id });

      post.save().then(post => res.json(post));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Like a post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "You have not liked this post" });
        }

        // Get the remove index
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // Splice the array
        post.likes.splice(removeIndex, 10);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/posts/comment/:id
// @desc    Make a comment
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const comment = {
          text: req.body.text,
          user: req.user.id
        };

        post.comments.unshift(comment);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/posts/comment/:id/:comment_id
// @desc    Remove a comment
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check if the comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get the remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);
        // res.json(removeIndex);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
