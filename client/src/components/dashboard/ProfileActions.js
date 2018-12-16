import React from "react";
import { Link } from "react-router-dom";

function ProfileActions() {
  return (
    <div>
      <div className="fixed-action-btn">
        <Link
          to="/edit-profile"
          className="hoverable waves-effect btn-floating btn-large red"
        >
          <i className="large material-icons">mode_edit</i>
        </Link>
      </div>
    </div>
  );
}

export default ProfileActions;
