import React from "react";
import PropTypes from "prop-types";

import ListCard from "../common/ListCard";

function ProfileContent({ profile }) {
  return (
    <div>
      <img
        src={profile.user.avatar}
        alt="profile avatar"
        className="profile-img"
      />
      <h6>{profile.bio}</h6>
      {profile.location !== "" ? (
        <div className="dashboard-location">
          <i className="small material-icons">location_on</i>
          <span>{profile.location}</span>
        </div>
      ) : (
        ""
      )}

      <div className="cards">
        <ListCard title="Languages Spoken" list={profile.languages} />
        <ListCard title="Interested in Languages" list={profile.interestedIn} />
        <ListCard title="Hobbies" list={profile.hobbies} />
      </div>
    </div>
  );
}

ProfileContent.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileContent;
