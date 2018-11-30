import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createProfile } from "../actions/profileActions";

import TextFieldGroup from "./common/TextFieldGroup";
import InputGroup from "./common/InputGroup";
import TextAreaFieldGroup from "./common/TextAreaFieldGroup";

class CreateProfile extends Component {
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container create-profile">
        <h3>Tell us a bit about yourself</h3>
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
            info="What languages do you currently speak? Seperate your answers with commas"
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
                errors={errors.instagram}
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
                error={errors.linkedin}
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
