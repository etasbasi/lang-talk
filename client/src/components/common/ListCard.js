import React from "react";
import PropTypes from "prop-types";

function ListCard({ title, list }) {
  const items = list.map((item, index) => <li key={index}>{item}</li>);

  if (list[0] !== "") {
    return (
      <div className="card small">
        <div className="card-content">
          <h5>{title}</h5>
          <ul>{items}</ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

ListCard.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired
};

export default ListCard;
