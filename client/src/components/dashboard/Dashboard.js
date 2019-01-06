import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../common/Spinner";

import { getCurrentProfile } from "../../actions/profileActions";
import { deleteAccount } from "../../actions/profileActions";
import ProfileActions from "./ProfileActions";
import ProfileContent from "./ProfileContent";

class Dashboard extends Component {
  componentDidMount() {
    document.title = "Your Dashboard - LangTalk";
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile == null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if the user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <ProfileActions />
            <ProfileContent profile={profile} />
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
