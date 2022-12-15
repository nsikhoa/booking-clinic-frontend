import React, { Component } from "react";
import { connect } from "react-redux";
import { verifyBookingAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import "./VerifyEmail.scss";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      status: "error",
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get("token");
      const doctorId = urlParams.get("doctorId");

      let res = await verifyBookingAppointment({
        token,
        doctorId,
      });

      if (res && res.status == "ok") {
        this.setState({
          isVerified: true,
          status: "ok",
        });
      } else {
        this.setState({
          isVerified: true,
          status: res && res.status ? res.status : "error",
        });
      }
    }
    if (this.props.match && this.props.match.params) {
    }
  }

  render() {
    let { isVerified, status } = this.state;
    console.log(this.state);
    return (
      <>
        <HomeHeader />
        <div className="verify-email-container">
          {isVerified === false ? (
            <div className="verify-email-text">Loading data...</div>
          ) : (
            <div className="verify-email-content">
              {status === "ok" ? (
                <p className="verify-email-text">
                  Bạn đã xác nhận lịch đặt khám thành công!
                </p>
              ) : (
                <p className="verify-email-text">
                  Lịch đặt khám này đã được xác nhận hoặc không tồn tại!
                </p>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
