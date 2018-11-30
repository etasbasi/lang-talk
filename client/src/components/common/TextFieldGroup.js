import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div>
      <div className="form-group">
        <div className="input-field">
          <input
            type={type}
            className={classnames({
              notvalid: error
            })}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            id={placeholder}
          />
          <label htmlFor={placeholder}>{placeholder}</label>
          {info && <small className="">{info}</small>}
          {error && <span className="helper-text">{error}</span>}
        </div>
      </div>
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
