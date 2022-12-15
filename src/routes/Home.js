import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { isLoggedIn, userInfo } = this.props;
    // let linkToRedirect = isLoggedIn
    //   ? userInfo.roleId === "R1"
    //     ? "/system/user-manage"
    //     : "/doctor/manage-schedule"
    //   : "/home";
    let linkToRedirect = "";

    if (isLoggedIn) {
      if (isLoggedIn && userInfo.roleId === "R1") {
        linkToRedirect = "/system/user-manage";
      } else if (isLoggedIn && userInfo.roleId === "R2") {
        linkToRedirect = "/doctor/manage-schedule";
      } else if (isLoggedIn && userInfo.roleId === "R3") {
        linkToRedirect = "/patient/history-booking";
      }
    } else {
      linkToRedirect = "/home";
    }

    return <Redirect exact to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
