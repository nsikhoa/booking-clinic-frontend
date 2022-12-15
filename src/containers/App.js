import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
// import Login from '../routes/Login';
import Login from "./Auth/Login";
import System from "../routes/System";

import { CustomToastCloseButton } from "../components/CustomToast";
import HomePage from "./HomePage/HomePage";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import Doctor from "../routes/Doctor";

import CustomScrollbar from "../components/CustomScrollbars";
import VerifyEmail from "./Patient/VerifyEmail";
import CancelEmail from "./Patient/CancelEmail";
import DetailSpecialty from "./Patient/MedicalSpecialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import Patient from "../routes/Patient";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            {/* {this.props.isLoggedIn && <Header />} */}

            <div className="content-container">
              <CustomScrollbar style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route
                    path="/doctor/manage-schedule"
                    component={userIsAuthenticated(Doctor)}
                  />
                  <Route
                    path="/doctor/manage-schedule-patient"
                    component={userIsAuthenticated(Doctor)}
                  />
                  <Route
                    path="/doctor/patient/medical-bill"
                    component={userIsAuthenticated(Doctor)}
                  />
                  <Route
                    path="/patient/history-booking"
                    component={userIsAuthenticated(Patient)}
                  />
                  <Route path={path.HOMEPAGE} exact component={HomePage} />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route path={path.VERIFY_EMAIL} component={VerifyEmail} />
                  <Route path={path.CANCEL_EMAIL} component={CancelEmail} />
                  <Route
                    path={path.MEDICAL_SPECIALTY}
                    component={DetailSpecialty}
                  />
                  <Route path={path.MEDICAL_CLINIC} component={DetailClinic} />
                </Switch>
              </CustomScrollbar>
            </div>

            {/* <ToastContainer
              className="toast-container"
              toastClassName="toast-item"
              bodyClassName="toast-item-body"
              autoClose={false}
              hideProgressBar={true}
              pauseOnHover={false}
              pauseOnFocusLoss={true}
              closeOnClick={false}
              draggable={false}
              closeButton={<CustomToastCloseButton />}
            /> */}

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
