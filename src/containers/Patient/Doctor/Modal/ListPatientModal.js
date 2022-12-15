import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListPatientModal.scss";
import { Modal } from "reactstrap";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import { getSchedulePatients } from "../../../../services/userService";
import moment from "moment";

class ListPatientModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).add(0, "days").startOf("day").valueOf(),
      patientBookings: [],
    };
  }

  async getPatients() {
    if (this.props.doctorId) {
      let { currentDate } = this.state;
      let doctorId = this.props.doctorId;

      let formattedDate = new Date(currentDate).getTime();
      let res = await getSchedulePatients({
        doctorId,
        date: formattedDate,
      });
      // console.log("check response", res);

      if (res && res.status === "ok") {
        this.setState({
          patientBookings: res.data,
        });
      }
    }
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

  async componentDidMount() {
    await this.getPatients();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { isOpenModal, closeModal } = this.props;
    let { patientBookings } = this.state;
    // console.log("check state patientBookings", patientBookings);
    return (
      <Modal
        isOpen={isOpenModal}
        centered
        className={"modal-container"}
        size="lg"
      >
        <div className="section-modal-body">
          <div className="modal-booking-header">
            <span></span>
            <span className="modal-booking-title">Danh sách bệnh nhân</span>
            <span className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="modal-booking-body">
            <div className="row">
              <div className="col-3 form-group">
                <label>Ngày khám</label>
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
            <div>
              <table className="table table-bordered table-hover">
                <thead className="table-primary">
                  <th>STT</th>
                  <th>Tên bệnh nhân</th>
                  <th>Giới tính</th>
                  {/* <th>Ngày khám</th> */}
                  <th>Giờ khám</th>
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
                            {item.patientData
                              ? item.patientData.genderData
                                ? item.patientData.genderData.valueVi
                                : ""
                              : ""}
                          </td>
                          {/* <td>{item.date ? item.date : ""}</td> */}
                          <td>
                            {item.timeTypeDataBooking
                              ? item.timeTypeDataBooking.valueVi
                              : ""}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6"> Không có dữ liệu</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-booking-footer">
            <button className="btn btn-booking-cancel" onClick={closeModal}>
              Hủy
            </button>
          </div>
        </div>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPatientModal);
