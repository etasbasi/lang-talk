import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className=" profile-item">
        <div className="card horizontal">
          <Link to={`/profile/${profile.user._id}`}>
            <div className="card-image">
              <img src={profile.user.avatar} />
              <span>{profile.user.name}</span>
            </div>
          </Link>
          <div className="card-stacked">
            <div className="card-content">
              <p>{profile.bio}</p>
              {profile.languages.length > 0 && profile.languages[0] !== "" ? (
                <div className="lang-list">
                  <span>can speak:</span>
                  <ul>
                    {profile.languages.slice(0, 3).map((language, index) => (
                      <li key={index}>{language}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
