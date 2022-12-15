import React, { Component } from "react";
import { connect } from "react-redux";
// import "./About.scss";

// import Slider from "react-slick";

class About extends Component {
  render() {
    return <div className="section-share section-about">About</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
