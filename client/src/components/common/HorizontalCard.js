import React from "react";
import { Link } from "react-router-dom";

export default function HorizontalCard({
  avatar,
  name,
  text,
  link,
  listItems,
  RenderActions
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
      <div className="horizontal-card card horizontal">
        {link ? (
          <Link to={link}>
            <div className="card-image">
              <img src={avatar} alt="avatar of the user" />
              <span>{name}</span>
            </div>
          </Link>
        ) : (
          <div className="card-image">
            <img src={avatar} alt="avatar of the user" />
            <span>{name}</span>
          </div>
        )}

        <div className="card-stacked">
          <div className="card-content">
            <p>{text}</p>
            {RenderActions ? <RenderActions /> : null}
            {list}
          </div>
        </div>
      </div>
    </div>
  );
}
