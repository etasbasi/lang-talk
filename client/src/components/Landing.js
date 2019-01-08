import React, { Component } from "react";
import M from "materialize-css";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import LangImg from "../imgs/lang.webp";
import { Link } from "react-router-dom";

class Landing extends Component {
  componentDidMount() {
    document.title = "Lang-Talk";
    M.Parallax.init(this.refs.parallax1);
    M.Parallax.init(this.refs.parallax2);

    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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
            <Link to="/register" className="waves-effect waves-light btn-large">
              Sign Up
            </Link>
          </div>
          <div ref="parallax1" className="parallax">
            <img alt="Language" className="main" src={LangImg} />
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
              alt="Multi cultural"
              className="secondary"
              src={require("../imgs/multi-cultural.jpg")}
            />
          </div>
        </div>
        <div className="bottom-text container">
          <h6>Sign Up now to join the community!</h6>
          <Link to="/register" className="waves-effect btn-large">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
