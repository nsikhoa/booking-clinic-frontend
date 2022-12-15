import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions/adminActions";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import "./ScheduleManage.scss";
import { toast } from "react-toastify";
import _ from "lodash";
import { dateFormat } from "../../../utils";
import {
  createDoctorSchedule,
  getUserByEmail,
} from "../../../services/userService";

class ScheduleManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      selectedOption: {},
      currentDate: "",
      timeArr: [],
      isDisable: false,
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllTimeSchedule();
    // console.log("hello", this.props);
    if (this.props.userInfo && this.props.userInfo.roleId === "R2") {
      let res = await getUserByEmail(this.props.userInfo.email);
      if (res && res.data) {
        // console.log("check response get user by email", res.data);
        this.setState({
          selectedOption: { value: res.data.id, label: res.data.fullname },
          isDisable: true,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let options = this.buildDataInputSelect(this.props.allDoctors);
      // console.log("options ", options);
      this.setState({
        listDoctor: options,
      });
    }

    if (prevProps.timeData !== this.props.timeData) {
      let data = this.props.timeData;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isPress: false }));
      }
      this.setState({
        timeArr: data,
      });
    }
  }

  buildDataInputSelect = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        object.label = item.fullname;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleOnChange = async (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleChangeStatusButton = (item) => {
    // console.log(item);
    let { timeArr } = this.state;
    if (timeArr && timeArr.length > 0) {
      timeArr = timeArr.map((el) => {
        if (el.id === item.id) item.isPress = !item.isPress;
        return el;
      });

      this.setState({
        timeArr,
      });
    }
  };

  fillAllTime = () => {
    let { timeArr } = this.state;
    if (timeArr && timeArr.length > 0) {
      timeArr = timeArr.map((el) => ({ ...el, isPress: true }));

      this.setState({
        timeArr,
      });
    }
  };

  handleSaveSchedule = async () => {
    let { timeArr, selectedOption, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Vui lòng chọn ngày khám!");
      return;
    }

    if (selectedOption && _.isEmpty(selectedOption)) {
      toast.error("Vui lòng chọn bác sĩ!");
      return;
    }

    // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    let formattedDate = new Date(currentDate).getTime();
    if (timeArr && timeArr.length > 0) {
      let selectedTime = timeArr.filter((item) => item.isPress === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time) => {
          let object = {};
          object.doctorId = selectedOption.value;
          object.date = formattedDate;
          object.timeType = time.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Vui lòng chọn giờ khám!");
        return;
      }
    }

    let response = await createDoctorSchedule({
      schedulesArr: result,
      doctorId: selectedOption.value,
      date: "" + formattedDate,
    });

    console.log("response: ", response);

    if (response && response.status === "ok") {
      toast.success("Save success");
    } else {
      toast.error("Save error");
    }
  };

  render() {
    const { userInfo } = this.props;
    // console.log("check state", this.state.timeArr);
    // console.log("check props", this.props);
    // console.log("check state", this.state);
    let { timeArr } = this.state;
    return (
      <React.Fragment>
        <div className="schedule-manage-container">
          <div className="schedule-manage-title title">
            <FormattedMessage id="manage-schedule.title" />
          </div>

          <div className="container">
            <div className="row">
              {this.state.isDisable === false ? (
                <div className="col-6 form-group">
                  <label>Chọn bác sĩ</label>
                  <Select
                    // isDisabled={this.state.isDisable}
                    value={this.state.selectedOption}
                    onChange={this.handleOnChange}
                    options={this.state.listDoctor}
                  />
                </div>
              ) : (
                <div></div>
              )}
              <div className="col-6 form-group">
                <label>Chọn ngày</label>
                <DatePicker
                  className="form-control"
                  value={this.state.currentDate}
                  onChange={this.handleOnChangeDatePicker}
                  minDate={
                    new Date(new Date().setDate(new Date().getDate() - 1))
                  }
                  // selected={this.state.currentDate}
                  // defaultValue={new Date()}
                />
              </div>
              <div className="col-12">
                <button
                  className="btn btn-primary"
                  onClick={() => this.fillAllTime()}
                >
                  Chọn tất cả
                </button>
              </div>
              <div className="col-12 schedule-container">
                {timeArr &&
                  timeArr.length > 0 &&
                  timeArr.map((item, index) => {
                    return (
                      <button
                        className={item.isPress ? "btn active" : "btn"}
                        key={index}
                        onClick={() => this.handleChangeStatusButton(item)}
                      >
                        {item.valueVi}
                      </button>
                    );
                  })}
              </div>
              <div className="col-12">
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleSaveSchedule()}
                >
                  Lưu thông tin
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    timeData: state.admin.timeArr,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllTimeSchedule: () => dispatch(actions.fetchTimeSchedule()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);
