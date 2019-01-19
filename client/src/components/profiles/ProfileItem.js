import React, { Component } from "react";
import PropTypes from "prop-types";

import HorizontalCard from "../common/HorizontalCard";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="profile-item">
        <HorizontalCard
          link={`/profile/${profile.user._id}`}
          avatar={`/api/profile/avatar/${profile.user._id}`}
          name={profile.user.name}
          text={profile.bio}
          listItems={
            profile.languages.length > 0 && profile.languages[0] !== ""
              ? profile.languages
              : null
          }
        />
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
