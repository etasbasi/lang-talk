import React from "react";
import { Link } from "react-router-dom";

function ProfileActions() {
  return (
    <div>
      <Link className="btn waves-effect" to="/edit-profile">
        Edit Profile
      </Link>
    </div>
  );
}

export default ProfileActions;
