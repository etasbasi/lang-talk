const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      date: {
        default: Date.now,
        type: Date
      },
      user: {
        ref: "users",
        type: mongoose.Types.ObjectId
      },
      text: {
        required: true,
        type: String
      }
    }
  ],
  name: String,
  avatar: String,
  date: {
    default: Date.now,
    type: Date
  }
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
