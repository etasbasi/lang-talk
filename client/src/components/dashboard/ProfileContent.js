import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Modal from "react-responsive-modal";

import ListCard from "../common/ListCard";
import GoBack from "../common/GoBack";
import ImageDropZone from "../utils/ImageDropZone";

class ProfileContent extends Component {
  // use imageHash to force the profile image to re render
  state = { modalIsOpen: false, imageHash: Date.now() };

  onOpenModal = () => {
    this.setState({ modalIsOpen: true });
  };

  onCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };

  onImageDrop = acceptedFiles => {
    this.props.handleAvatarChange(acceptedFiles);
    // this.onCloseModal();
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.errors.fileerror) {
      this.onCloseModal();
    }
  }

  render() {
    const { profile, link } = this.props;

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

    const modal = (
      <Modal open={this.state.modalIsOpen} onClose={this.onCloseModal} center>
        {this.props.errors && (
          <span
            className="helper-text"
            style={{ margin: "auto", fontSize: "40px" }}
          >
            {this.props.errors.fileerror}
          </span>
        )}
        <ImageDropZone onImageDrop={this.onImageDrop} />
      </Modal>
    );

    // Check if the user is viewing their own dashboard
    const currentUser = window.location.pathname.includes("/dashboard");

    return (
      <div className="profile">
        {link ? <GoBack to={link} /> : null}
        <div className="profile-header z-depth-2">
          <h4>{profile.user.name}'s profile</h4>
          {modal}
          <div
            className={classnames("profile-img-container", {
              "img-editable": currentUser
            })}
            onClick={currentUser ? this.onOpenModal : null}
          >
            <img
              src={`/api/profile/avatar/${profile.user._id}?${
                this.state.imageHash
              }`}
              alt="profile avatar"
              className="profile-img"
            />
          </div>
          <h5>{profile.bio !== "" ? profile.bio : "This person has no bio"}</h5>
          {profile.location !== "" && profile.location !== null ? (
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
          <ListCard
            title="Interested in Languages"
            list={profile.interestedIn}
          />
          <ListCard title="Hobbies" list={profile.hobbies} />
        </div>
      </div>
    );
  }
}

ProfileContent.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileContent;
