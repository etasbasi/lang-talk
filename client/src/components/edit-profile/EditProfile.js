import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import GoBack from "../common/GoBack";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class EditProfile extends Component {
  state = {
    languages: "",
    interestedIn: "",
    location: "",
    hobbies: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.createProfile(this.state, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.errors)) {
      this.setState({ errors: nextProps.errors });
    } else if (nextProps.profile.profile) {
      const { profile } = nextProps.profile;

      // Bring skills array back to comma seperated values
      const hobbiesCS = !isEmpty(profile.hobbies)
        ? profile.hobbies.join(",")
        : "";
      const languagesCS = !isEmpty(profile.languages)
        ? profile.languages.join(",")
        : "";
      const interestedInCS = !isEmpty(profile.interestedIn)
        ? profile.interestedIn.join(",")
        : "";

      // if profile fields doesn't exist, set them to empty strings
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      // profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};

      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";

      this.setState({
        bio: profile.bio,
        location: profile.location,
        hobbies: hobbiesCS,
        languages: languagesCS,
        interestedIn: interestedInCS,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container create-profile">
        <GoBack to="/dashboard" />
        <h3>Edit your profile</h3>
        <form onSubmit={this.onSubmit} noValidate>
          <TextAreaFieldGroup
            name="bio"
            placeholder="Bio"
            type="text"
            onChange={this.onChange}
            value={this.state.bio}
            error={errors.bio}
          />
          <TextFieldGroup
            placeholder="Hobbies"
            name="hobbies"
            value={this.state.hobbies}
            onChange={this.onChange}
            error={errors.hobbies}
            info="What do you enjoy doing in your free time? Seperate your answers with commas"
          />
          <TextFieldGroup
            placeholder="Location"
            name="location"
            value={this.state.location}
            onChange={this.onChange}
            error={errors.location}
            info="Where do you live? (eg. Boston, MA)"
          />
          <TextFieldGroup
            placeholder="Languages Spoken"
            name="languages"
            value={this.state.languages}
            onChange={this.onChange}
            error={errors.languages}
            info="What languages do you speak?, Seperate your answers with commas"
          />
          <TextFieldGroup
            placeholder="Interested in"
            name="interestedIn"
            value={this.state.interestedIn}
            onChange={this.onChange}
            error={errors.interestedIn}
            info="Which languages are you interested in? Seperate your answers with commas"
          />

          <h5>
            Share your social media <small>(Optional)</small>
          </h5>

          <div className="row">
            <div className="col s6">
              <TextFieldGroup
                placeholder="Instagram"
                onChange={this.onChange}
                value={this.state.instagram}
                name="instagram"
                error={errors.instagram}
              />
              <TextFieldGroup
                placeholder="Facebook"
                onChange={this.onChange}
                value={this.state.facebook}
                name="facebook"
                error={errors.facebook}
              />
            </div>
            <div className="col s6">
              <TextFieldGroup
                placeholder="Twitter"
                onChange={this.onChange}
                value={this.state.twitter}
                name="twitter"
                error={errors.twitter}
              />

              <TextFieldGroup
                placeholder="LinkedIn"
                error={errors.linkedin}
                onChange={this.onChange}
                value={this.state.linkedin}
                name="linkedin"
              />
            </div>
            <div className="col s6">
              <TextFieldGroup
                placeholder="Youtube"
                onChange={this.onChange}
                value={this.state.youtube}
                name="youtube"
                error={errors.youtube}
              />
            </div>
          </div>

          <input
            type="submit"
            value="Submit"
            className="waves-effect waves-light btn"
          />
        </form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
