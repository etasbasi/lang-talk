import React, { Component } from "react";
import M from "materialize-css";

export default class Landing extends Component {
  componentDidMount() {
    M.Parallax.init(this.refs.parallax1);
    M.Parallax.init(this.refs.parallax2);
  }

  render() {
    return (
      <div>
        <div className="parallax-container valign-wrapper center-align">
          <div className="greeting-container center-align">
            <h4>
              Lang-Talk is a place where you can ask questions and learn about
              other languages
            </h4>
            <a href="#" className="waves-effect waves-light btn-large">
              Sign Up
            </a>
          </div>
          <div ref="parallax1" className="parallax">
            <img className="main" src="http://localhost:3000/imgs/lang.webp" />
          </div>
        </div>
        <div className="column-container container">
          <div className="column">
            <i className="material-icons">check</i>
            Get answers to your questions about other cultures and languages in
            a friendly environment
          </div>
          <div className="column">
            <i className="material-icons">account_box</i>
            Make friends with people from different regions while learning new
            information
          </div>
          <div className="column">
            <i className="material-icons">thumb_up</i>
            Make posts so that other people can like and make comments on them
          </div>
        </div>
        <div className="parallax-container secondary">
          <div ref="parallax2" className="parallax">
            <img
              className="secondary"
              src="http://localhost:3000/imgs/multi-cultural.jpg"
            />
          </div>
        </div>
        <div className="bottom-text container">
          <h6>Sign Up now to join the community!</h6>
          <a href="#" className="waves-effect btn-large">
            Sign Up
          </a>
        </div>
      </div>
    );
  }
}
