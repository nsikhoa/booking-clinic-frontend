import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ScheduleManage from "../containers/System/Doctor/ScheduleManage";
import PatientBookingManage from "../containers/System/Doctor/PatientBookingManage";
import Header from "../containers/Header/Header";
import MedicalBillImage from "../containers/System/Doctor/MedicalBillImage";

class Doctor extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path="/doctor/manage-schedule"
                component={ScheduleManage}
              />
              <Route
                path="/doctor/manage-schedule-patient"
                component={PatientBookingManage}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
