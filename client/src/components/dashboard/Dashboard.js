import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../common/Spinner";

import { getCurrentProfile } from "../../actions/profileActions";
import ProfileActions from "./ProfileActions";
import ProfileContent from "./ProfileContent";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;

    let dashboardContent;

    if (profile == null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if the user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <h4 className="">
              Welcome <Link to={`/profile/${profile._id}`}>{user.name}</Link>
            </h4>
            <ProfileActions />
            <ProfileContent profile={profile} />
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
  { getCurrentProfile }
)(Dashboard);