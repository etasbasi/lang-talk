import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../common/Spinner";

import {
  getCurrentProfile,
  deleteAccount,
  changeAvatar
} from "../../actions/profileActions";
import ProfileActions from "./ProfileActions";
import ProfileContent from "./ProfileContent";

class Dashboard extends Component {
  // use state for the profile object to force ProfileContent to update
  state = { profile: this.props.profile.profile, errors: this.props.errors };

  constructor(props) {
    super(props);

    this.profileActionsRef = createRef();
  }

  componentDidMount() {
    document.title = "Your Dashboard - LangTalk";
    this.props.getCurrentProfile();
  }

  handleAvatarChange = avatar => {
    this.props.changeAvatar(avatar);
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.profile !== nextProps.profile.profile) {
      this.setState({ profile: nextProps.profile.profile });
      this.forceUpdate();
    }
    if (this.state.errors !== nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { loading } = this.props.profile;
    const { profile, errors } = this.state;

    let dashboardContent;

    if (profile == null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if the user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <ProfileActions />
            <ProfileContent
              profile={profile}
              handleAvatarChange={this.handleAvatarChange}
              errors={errors}
              ref={this.profileActionsRef}
            />
            <button
              onClick={() => this.props.deleteAccount()}
              className="waves-effect waves-light btn delete-button"
            >
              Delete Account
            </button>
          </div>
        );
      } else {
        // User is logged but has no profile
        dashboardContent = (
          <div>
            <div className="card-panel lighten-2">
              You don't have a profile set up yet
            </div>
            <Link
              to="/create-profile"
              className="waves-effect waves-light btn-large"
            >
              Set Up Profile
            </Link>
          </div>
        );
      }
    }

    return <div className="container dashboard">{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  changeAvatar: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, changeAvatar }
)(Dashboard);
