import React from "react";
import spinner from "../../imgs/spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="loading..."
        style={{ width: "200px", margin: "50px auto", display: "block" }}
      />
    </div>
  );
};
