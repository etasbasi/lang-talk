const express = require("express");
const passport = require("passport");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { reduceSize } = require("../../utils/ImageProcessor");

const router = express.Router();

// jwt secret
const keys = require("../../config/keys");

// User model
const Profile = require("./../../models/Profile");
const User = require("./../../models/User");

// Validation
const validateProfileInput = require("../../validation/profile");

// @route   GET api/profile/test
// @desc    Tests users route
// @access  Public
router.get("/test/", (req, res) => res.json({ msg: "Users route works" }));

// @route   POST api/profile/
// @desc    Create or Edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};

    const imgPath = path.join(
      __dirname,
      "/../../client",
      "src",
      "imgs",
      "default_image.png"
    );

    let avatar;

    avatar = fs.readFileSync(imgPath);
    profileFields.avatar = {
      data: avatar,
      type: "image/PNG",
      name: "default_image.png"
    };
    profileFields.user = req.user.id;
    profileFields.location = req.body.location;
    profileFields.bio = req.body.bio;

    // if (req.body.bio) profileFields.bio = req.body.bio;
    // if (req.body.location) profileFields.location = req.body.location;

    if (typeof req.body.hobbies !== "undefined") {
      profileFields.hobbies = req.body.hobbies.split(",");
    }

    if (typeof req.body.languages !== "undefined") {
      profileFields.languages = req.body.languages.split(",");
    }

    if (typeof req.body.interestedIn !== "undefined") {
      profileFields.interestedIn = req.body.interestedIn.split(",");
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // If profile already exists, update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => {
            let { data, ...rest } = profile.avatar;
            profile.avatar = rest;
            res.json(profile);
          });
        } else {
          // Create a new profile
          new Profile(profileFields).save().then(profile => {
            res.json(profile);
          });
        }
      })
      .catch(err => res.status(400).json({ err }));
  }
);

// @route   GET api/profile/
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })

      .populate("user", ["name", "avatar"])
      .then(profile => {
        const errors = {};
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        let { data, ...rest } = profile.avatar;
        profile.avatar = rest;
        res.json(profile);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar", "_id"])
    .then(profiles => {
      const errors = {};
      if (!profiles) {
        errors.noporifle = "There are no profiles";
        return res.status(404).json();
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar", "id"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      let { data, ...rest } = profile.avatar;
      profile.avatar = rest;
      res.json(profile);
    })
    .catch(err => {
      res.status(404).json({ profile: "There is no profile for this user" });
    });
});

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

// @route   GET api/profile/avatar/:id
// @desc    Get profile image
// @access  Public
router.get("/avatar/:id", (req, res) => {
  Profile.findOne({ user: req.params.id })
    .then(profile => {
      res.type(profile.avatar.type);
      res.send(profile.avatar.data);
    })
    .catch(err => res.json({ noavatarfound: "avatar not found" }));
});

// @route   POST api/profile/image
// @desc    Edit profiel image
// @access  Private
router.post(
  "/avatar",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (!req.files) {
      return res.status(404).json({ fileerror: "The file wasn't found" });
    }

    let processedAvatar;

    // const avatarBuffer = req.files.avatar.data;
    // sharp(avatarBuffer)
    //   .resize(200, 300)
    //   .toBuffer()
    //   .then(data => {
    // processedAvatar = data;

    reduceSize(req.files.avatar.data)
      .then(data => {
        let avatar = {
          data: data,
          type: req.files.avatar.mimetype,
          name: req.files.avatar.name
        };

        Profile.findOneAndUpdate(
          { user: req.user.id },
          { avatar },
          { new: true }
        )
          .populate("user", ["name", "avatar", "id"])
          .then(profile => {
            let { data, ...rest } = profile.avatar;
            profile.avatar = rest;
            res.json(profile);
          })
          .catch(err => {
            res.json({ fileerror: "We couldn't update your avatar" });
          });
      })
      .catch(err => console.log(err));

    // })

    // .catch(err => console.log(err));

    // TODO: use the jimp library to reduce the img quality
  }
);

module.exports = router;
