import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  componentDidMount() {
    document.title = "Profiles - LangTalk";
    this.props.getProfiles();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      this.forceUpdate();
    }
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map((profile, index) => (
          <ProfileItem key={index} profile={profile} />
        ));
      } else {
        profileItems = <h5>No Profiles Found</h5>;
      }
    }
    return (
      <div className="container profiles">
        <h4>Users:</h4>
        {profileItems}
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
