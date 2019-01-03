import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}) => {
  return (
    <div>
      <div className="form-group">
        <textarea
          id="textarea"
          className={classnames("materialize-textarea", {
            notvalid: error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {info && <small className="">{info}</small>}
        {error && <span className="textarea helper-text">{error}</span>}
      </div>
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
