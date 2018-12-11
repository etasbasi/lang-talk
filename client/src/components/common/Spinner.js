import React from "react";
import spinner from "../../imgs/spinner.gif";

export default () => {
  return (
    // <div>
    //   <img
    //     src={spinner}
    //     alt="loading..."
    //     style={{ width: "200px", margin: "50px auto", display: "block" }}
    //   />
    // </div>
    <div
      style={{ margin: "auto", display: "block" }}
      className="preloader-wrapper big active"
    >
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  );
};
