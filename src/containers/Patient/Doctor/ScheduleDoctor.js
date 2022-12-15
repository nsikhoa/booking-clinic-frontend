import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./ScheduleDoctor.scss";
import moment, { lang } from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorDate } from "../../../services/userService";
import BookingModal from "./Modal/BookingModal";

class ScheduleDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allFreeTime: [],
      isOpenModal: false,
      dataTimeModal: [],
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getDates(language);
    if (allDays && allDays.length > 0) {
      let res = await getScheduleDoctorDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allDays,
        allFreeTime: res.data ? res.data : [],
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let { language } = this.props;
    if (this.props.language !== prevProps.language) {
      let allDays = this.getDates(language);
      this.setState({
        allDays,
      });
    }

    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getDates(language);
      let res = await getScheduleDoctorDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allFreeTime: res.data ? res.data : [],
      });
    }
  }

  getDates = (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let objDate = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let labelVi = moment(new Date()).format("DD/MM");
          let today = "Hôm nay - " + labelVi;
          objDate.label = today;
        } else {
          let label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
          label = label.charAt(0).toUpperCase() + label.slice(1);
          objDate.label = label;
        }
      } else {
        if (i === 0) {
          let labelEn = moment(new Date()).format("DD/MM");
          let today = "Today - " + labelEn;
          objDate.label = today;
        } else {
          objDate.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }

      objDate.value = moment(new Date())
        .add(i, "days")
        .startOf("day")
        .valueOf();

      arrDate.push(objDate);
    }

    return arrDate;
  };

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;

      let res = await getScheduleDoctorDate(doctorId, date);

      if (res && res.status == "ok") {
        this.setState({
          allFreeTime: res.data ? res.data : [],
        });
      }

      console.log("data bac si lich kham", res);
    }
  };

  handleClickSchedule = (time) => {
    this.setState({
      isOpenModal: true,
      dataTimeModal: time,
    });
    console.log("time", time);
  };

  handleCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  render() {
    let { allDays, allFreeTime, isOpenModal, dataTimeModal } = this.state;
    return (
      <>
        <div className="schedule-doctor-container">
          <div className="schedules">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="schedule-available-time">
            <div className="text-calendar">
              <span>
                <i className="fas fa-calendar-alt"></i>Lịch khám
              </span>
            </div>

            <div className="schedule-time-content">
              {allFreeTime && allFreeTime.length > 0 ? (
                allFreeTime.map((item, index) => {
                  return (
                    <button
                      onClick={() => this.handleClickSchedule(item)}
                      key={index}
                    >
                      {item.timeTypeData.valueVi}
                    </button>
                  );
                })
              ) : (
                <span style={{ gridColumn: "1 / -1" }}>
                  Bác sĩ không có lịch khám trong thời gian này
                </span>
              )}
            </div>
          </div>
        </div>

        <BookingModal
          isOpenModal={isOpenModal}
          closeModal={this.handleCloseModal}
          dataTime={dataTimeModal}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
