import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./DoctorProfile.scss";
import moment, { lang } from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import BookingModal from "./Modal/BookingModal";
import { getDoctorProfileById } from "../../../services/userService";
import _ from "lodash";
import { Link } from "react-router-dom";

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getDoctorInfo(this.props.doctorId);
    this.setState({
      profile: data,
    });
  }

  getDoctorInfo = async (id) => {
    let result = {};
    if (id) {
      let res = await getDoctorProfileById(id);
      if (res && res.status === "ok") {
        result = res.data;
      }
    }

    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let { language } = this.props;
    if (this.props.language !== prevProps.language) {
    }

    if (this.props.doctorId !== prevProps.doctorId) {
      let data = await this.getDoctorInfo(this.props.doctorId);
      this.setState({
        profile: data,
      });
    }
  }

  getTimeBooking = (dataTime) => {
    console.log("dataTime", dataTime);
    if (dataTime && !_.isEmpty(dataTime)) {
      let date = moment(new Date(+dataTime.date)).format("dddd - DD/MM/YYYY");
      return (
        <>
          <div>
            {dataTime.timeTypeData.valueVi} - {date}
          </div>
          {/* <div>{date}</div> */}
        </>
      );
    }
    return <></>;
  };

  render() {
    // console.log("props modal", this.state);
    let { profile } = this.state;
    let {
      language,
      isShowDescription,
      dataTime,
      isShowMoreLinkDetailDoctor,
      isShowPrice,
    } = this.props;
    console.log("profile", profile);
    return (
      <>
        <div className="doctor-detail-introduction">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                profile && profile.image ? profile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="content-right-up">
              {profile && <span>{profile.fullname}</span>}
            </div>

            <div className="content-right-down">
              {isShowDescription === true ? (
                <>
                  {profile.Markdown && profile.Markdown.description && (
                    <span>{profile.Markdown.description}</span>
                  )}
                </>
              ) : (
                <>
                  {this.getTimeBooking(dataTime)}{" "}
                  <div style={{ fontStyle: "italic" }}>
                    {profile.Doctor_Info && profile.Doctor_Info.note
                      ? profile.Doctor_Info.note
                      : ""}
                  </div>
                </>
              )}
            </div>
          </div>
          {isShowMoreLinkDetailDoctor && (
            <Link to={`/doctor/${profile.id}`}>Xem thêm</Link>
          )}
          {isShowPrice && (
            <div className="price">
              Giá khám:{" "}
              {profile && profile.Doctor_Info && language === LANGUAGES.VI
                ? profile.Doctor_Info.priceData.valueVi
                : ""}{" "}
              &#8363;
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
