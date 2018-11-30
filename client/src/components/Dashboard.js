import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../components/common/Spinner";

import { getCurrentProfile } from "../actions/profileActions";

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
        dashboardContent = <h4>Profile Exists</h4>;
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

    return (
      <div className="container dashboard">
        {dashboardContent}
        {/* <div className="fixed-action-btn">
          <a
            href="#"
            className="hoverable waves-effect btn-floating btn-large red"
          >
            <i className="large material-icons">mode_edit</i>
          </a>
        </div>
        <h3>Dashboard</h3>
        <img src="imgs/profile.png" alt="" className="profile-img" />
        <h4>Enes</h4>
        <div className="cards">
          <div className="card small">
            <div className="card-content">
              <h5>Languages Spoken</h5>
              <ul>
                <li>Turkish</li>
                <li>English</li>
                <li>Arabic</li>
                <li>Russian</li>
              </ul>
            </div>
          </div>
          <div className="card small">
            <div className="card-content">
              <h5>Interested in Languages</h5>
              <ul>
                <li>French</li>
                <li>Japanese</li>
                <li>Korean</li>
                <li>Spanish</li>
              </ul>
            </div>
          </div>
          <div className="card small">
            <div className="card-content">
              <h5>Hobbies</h5>
              <ul>
                <li>Coding</li>
                <li>Working out</li>
                <li>Reading</li>
                <li>Watching movies </li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    );
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
