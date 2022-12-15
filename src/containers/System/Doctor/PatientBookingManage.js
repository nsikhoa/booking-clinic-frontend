import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions/adminActions";
import DatePicker from "../../../components/Input/DatePicker";
import "./PatientBookingManage.scss";
import { toast } from "react-toastify";
import _, { template } from "lodash";
import {
  getSchedulePatients,
  sendMedicalBill,
  getListPatientHistory,
  getListPatientHistoryDistinctByDoctorId,
} from "../../../services/userService";
import moment from "moment";
import ConfirmBookingModal from "./ConfirmBookingModal";
import LoadingOverlay from "react-loading-overlay";
import HistoryPatientModal from "./HistoryPatientModal";

class PatientBookingManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).add(0, "days").startOf("day").valueOf(),
      patientBookings: [],
      isOpenModal: false,
      dataConfirmModal: [],
      isLoading: false,
      listPatientHistory: [],
      isShowListPatientHistory: false,
      isOpenModalHistory: false,
      dataHistoryModal: {},
    };
  }

  async componentDidMount() {
    // this.props.fetchAllDoctors();
    // this.props.fetchAllTimeSchedule();
    // console.log("hello", this.props);
    let { userInfo } = this.props;

    this.getPatients();
    let res = await getListPatientHistoryDistinctByDoctorId(userInfo.id);
    if (res && res.data) {
      let data = res.data;
      this.getDateBooking(data);
      this.setState({
        listPatientHistory: data,
      });
    }
  }

  async getPatients() {
    let { userInfo } = this.props;
    let { currentDate } = this.state;

    let formattedDate = new Date(currentDate).getTime();
    let res = await getSchedulePatients({
      doctorId: userInfo.id,
      date: formattedDate,
    });
    // console.log("check response", res);

    if (res && res.status === "ok") {
      this.setState({
        patientBookings: res.data,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    // if (this.state.listPatientHistory !== prevState.listPatientHistory) {
    //   let { userInfo } = this.props;
    //   let res = await getListPatientHistoryDistinctByDoctorId(userInfo.id);
    //   if (res && res.status === "ok") {
    //     this.setState({
    //       listPatientHistory: res.data,
    //     });
    //   }
    // }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getPatients();
      }
    );
  };

  confirmBooking(item) {
    // console.log("item", item);
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData ? item.patientData.email : "",
      timeType: item.timeType,
      patientName: item.patientData ? item.patientData.fullname : "",
      doctorName: item.doctorDataSchedule
        ? item.doctorDataSchedule.fullname
        : "",
    };
    // console.log("check item modal", item);

    this.setState({
      isOpenModal: true,
      dataConfirmModal: data,
    });
  }

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      dataConfirmModal: {},
    });
  };

  sendBill = async (dataFromChild) => {
    this.setState({
      isLoading: true,
    });
    let { currentDate } = this.state;

    let formattedDate = new Date(currentDate).getTime();
    let res = await sendMedicalBill({
      email: dataFromChild.email,
      image: dataFromChild.imgMedicalBill,
      doctorId: this.state.dataConfirmModal.doctorId,
      patientId: this.state.dataConfirmModal.patientId,
      timeType: this.state.dataConfirmModal.timeType,
      patientName: this.state.dataConfirmModal.patientName,
      doctorName: this.state.dataConfirmModal.doctorName,
      date: formattedDate,
    });

    if (res && res.status === "ok") {
      this.setState({
        isLoading: false,
      });
      toast.success("Thành công");
      await this.getPatients();
      this.setState({
        isOpenModal: false,
      });
    } else {
      this.setState({
        isLoading: false,
      });
      toast.error("Thất bại");
    }
  };

  getDateBooking = (listPatientHistory) => {
    // let labelEn = moment(new Date()).format("DD/MM");
    if (listPatientHistory) {
      listPatientHistory.map((item) => {
        if (item && item.date) {
          item.date = moment(new Date(+item.date)).format("DD/MM/YYYY");
        }
        return item;
      });
    }
  };

  handleEmergeListPatientHistory = () => {
    this.setState({
      isShowListPatientHistory: !this.state.isShowListPatientHistory,
    });
  };

  openHistoryModal = (item) => {
    this.setState({
      isOpenModalHistory: true,
      dataHistoryModal: item,
    });
  };

  closeModalHistory = () => {
    this.setState({
      isOpenModalHistory: false,
      dataHistoryModal: {},
    });
  };

  render() {
    const {
      patientBookings,
      isOpenModal,
      dataConfirmModal,
      listPatientHistory,
      isShowListPatientHistory,
      isOpenModalHistory,
      dataHistoryModal,
    } = this.state;
    return (
      <>
        <LoadingOverlay active={this.state.isLoading} spinner text="Loading...">
          <div className="booking-manage-container container">
            <div className="title">Quản lý lịch hẹn khám bệnh</div>
            <div className="row">
              <div className="col-3 form-group">
                <label>Chọn ngày khám</label>
                <DatePicker
                  className="form-control"
                  value={this.state.currentDate}
                  onChange={this.handleOnChangeDatePicker}
                  minDate={
                    new Date(new Date().setDate(new Date().getDate() - 1))
                  }
                />
              </div>
            </div>
            <table className="table table-bordered table-hover">
              <thead className="table-primary">
                <th>STT</th>
                <th>Tên bệnh nhân</th>
                <th>Email</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Lí do khám</th>
                <th>Giờ khám</th>
                <th>Actions</th>
              </thead>
              <tbody>
                {patientBookings && patientBookings.length > 0 ? (
                  patientBookings.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {item.patientData ? item.patientData.fullname : ""}
                        </td>
                        <td>
                          {item.patientData ? item.patientData.email : ""}
                        </td>
                        <td>
                          {item.patientData
                            ? item.patientData.genderData
                              ? item.patientData.genderData.valueVi
                              : ""
                            : ""}
                        </td>
                        <td>
                          {item.patientData ? item.patientData.phoneNumber : ""}
                        </td>
                        <td>{item.reason ? item.reason : ""}</td>
                        <td>
                          {item.timeTypeDataBooking
                            ? item.timeTypeDataBooking.valueVi
                            : ""}
                        </td>
                        <td>
                          <button
                            onClick={() => this.confirmBooking(item)}
                            className="btn btn-danger"
                          >
                            Xác nhận
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7"> Không có dữ liệu</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="container">
            <div className="row">
              {isShowListPatientHistory === false ? (
                <button
                  className="btn btn-link"
                  onClick={() => this.handleEmergeListPatientHistory()}
                >
                  Xem danh sách bệnh nhân đã khám
                </button>
              ) : (
                <button
                  className="btn btn-link"
                  onClick={() => this.handleEmergeListPatientHistory()}
                >
                  Ẩn bớt
                </button>
              )}
            </div>
          </div>
          {isShowListPatientHistory === true ? (
            <div className="booking-manage-history container">
              <div className="title">Danh sách bệnh nhân đã khám</div>

              <table className="table table-bordered table-hover">
                <thead className="table-primary">
                  <th>STT</th>
                  <th>Tên bệnh nhân</th>
                  <th>Email</th>
                  <th>Giới tính</th>
                  <th>Số điện thoại</th>
                  {/* <th>Lí do khám</th>
                  <th>Giờ khám</th>
                  <th>Ngày khám</th> */}
                  <th>Actions</th>
                </thead>
                <tbody>
                  {listPatientHistory && listPatientHistory.length > 0 ? (
                    listPatientHistory.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {item.patientDataHistory
                              ? item.patientDataHistory.fullname
                              : ""}
                          </td>
                          <td>
                            {item.patientDataHistory
                              ? item.patientDataHistory.email
                              : ""}
                          </td>
                          <td>
                            {item.patientDataHistory
                              ? item.patientDataHistory.genderData
                                ? item.patientDataHistory.genderData.valueVi
                                : ""
                              : ""}
                          </td>
                          <td>
                            {item.patientDataHistory
                              ? item.patientDataHistory.phoneNumber
                              : ""}
                          </td>
                          {/* <td>{item.reason ? item.reason : ""}</td>
                          <td>
                            {item.timeTypeDataHistory
                              ? item.timeTypeDataHistory.valueVi
                              : ""}
                          </td>
                          <td>{item.date ? item.date : ""}</td> */}
                          <td>
                            <button
                              onClick={() => this.openHistoryModal(item)}
                              className="btn btn-link"
                            >
                              Xem chi tiết
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8"> Không có dữ liệu</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <></>
          )}

          <HistoryPatientModal
            isOpenModal={isOpenModalHistory}
            closeModal={this.closeModalHistory}
            data={dataHistoryModal}
          />

          <ConfirmBookingModal
            isOpenModal={isOpenModal}
            data={dataConfirmModal}
            closeModal={this.closeModal}
            sendBill={this.sendBill}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllTimeSchedule: () => dispatch(actions.fetchTimeSchedule()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientBookingManage);
