import React from "react";
import PropTypes from "prop-types";

import ListCard from "../common/ListCard";

function ProfileContent({ profile }) {
  let socialLinks;

  if (profile.social && Object.keys(profile.social).length > 0) {
    socialLinks = (
      <div className="card social-links">
        <div className="card-content">
          {Object.keys(profile.social).map((item, index) => (
            <a key={index} target="__blank" href={profile.social[item]}>
              <i className={`fab fa-${item}`} />{" "}
            </a>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="profile">
      <div className="profile-header z-depth-2">
        <h4>{profile.user.name}'s profile</h4>
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

        {socialLinks}
      </div>

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
