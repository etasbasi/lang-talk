const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.bio = !isEmpty(data.bio) ? data.bio : "";
  // data.location = !isEmpty(data.location) ? data.location : "";
  data.hobbies = !isEmpty(data.hobbies) ? data.hobbies : "";
  data.languages = !isEmpty(data.languages) ? data.languages : "";
  data.interestedId = !isEmpty(data.interestedId) ? data.interestedId : "";

  if (!isEmpty(data.youtube)) {
    console.log(data.youtube);
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
