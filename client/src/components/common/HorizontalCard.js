import React from "react";
import { Link } from "react-router-dom";

export default function HorizontalCard({
  avatar,
  name,
  text,
  link,
  listItems
}) {
  let list;
  if (listItems) {
    list = (
      <div className="lang-list">
        <span>can speak:</span>
        <ul>
          {listItems.slice(0, 3).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    list = null;
  }

  return (
    <div>
      <div className="card horizontal">
        <Link to={link}>
          <div className="card-image">
            <img src={avatar} />
            <span>{name}</span>
          </div>
        </Link>
        <div className="card-stacked">
          <div className="card-content">
            <p>{text}</p>
            {list}
          </div>
        </div>
      </div>
    </div>
  );
}
