const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  //   handle: {
  //     type: String,
  //     required: true,
  //     max: 40
  //   },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  social: {
    youtube: String,
    twitter: String,
    linkedin: String,
    facebook: String,
    instagram: String
  },
  hobbies: [],
  languages: [],
  interestedIn: [],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
