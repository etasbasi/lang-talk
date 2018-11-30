import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  onChange,
  icon,
  info
}) => {
  return (
    <div className="input-field col s6">
      {/* <i className="material-icons prefix">{icon}</i> */}
      <input
        id="icon_prefix"
        type="text"
        onChange={onChange}
        className={classnames("validate", {
          notvalid: error
        })}
      />
      <label htmlFor="icon_prefix">{placeholder}</label>
      {error && <span className="helper-text">{error}</span>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
