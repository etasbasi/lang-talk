import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function GoBack({ to, text }) {
  return (
    <Link className="back-button btn waves-effect waves-light" to={to}>
      {text}
      <i className="material-icons left">keyboard_arrow_left</i>
    </Link>
  );
}

GoBack.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string
};

GoBack.defaultProps = {
  text: "Go Back"
};

export default GoBack;
