import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import DoctorProfile from "../DoctorProfile";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { bookingAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
// import { LANGUAGES } from "../../../utils";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      date: "",
      gender: "M",
      doctorId: "",
      timeType: "",
      birthday: "",
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genders !== this.props.genders) {
      // if (this.props.genders.length > 0) {
      //   this.setState({
      //     gender:
      //   })
      // }
    }
    if (prevProps.dataTime !== this.props.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        this.setState({
          doctorId,
          timeType: this.props.dataTime.timeType,
        });
      }
    }
  }

  handleOnChangeInput = (e, type) => {
    let input = e.target.value;
    let copyState = { ...this.state };
    copyState[type] = input;

    this.setState({
      ...copyState,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  getTimeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let date = moment(new Date(+dataTime.date)).format("dddd - DD/MM/YYYY");
      return `${dataTime.timeTypeData.valueVi} - ${date}`;
    }
    return "";
  };

  getDoctorNameBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let name = `${dataTime.doctorData.fullname}`;
      return name;
    }
    return "";
  };

  handleConfirmBooking = async () => {
    let date = this.props.dataTime.date;
    let birthday = new Date(this.state.birthday).getTime();
    let timeString = this.getTimeBooking(this.props.dataTime);
    let doctorName = this.getDoctorNameBooking(this.props.dataTime);

    // console.log("date booking", date);

    if (!this.state.fullname) {
      toast.warn("Vui l??ng nh???p h??? v?? t??n!");
      return;
    }

    if (this.state.phoneNumber) {
      // (0[3|5|7|8|9])+([0-9]{9})\b
      if (!this.state.phoneNumber.match(/(0[3|5|7|8|9])+([0-9]{8})\b/)) {
        toast.warn("Vui l??ng nh???p ch??nh x??c s??? ??i???n tho???i!");
        return;
      }
    } else {
      toast.warn("Vui l??ng nh???p s??? ??i???n tho???i!");
      return;
    }

    if (this.state.email) {
      let isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email);
      if (!isEmail) {
        toast.warn("Vui l??ng nh???p ch??nh x??c ?????a ch??? email!");
        return;
      }
    } else {
      toast.warn("Vui l??ng nh???p ?????a ch??? email!");
      return;
    }

    if (!this.state.reason) {
      toast.warn("Vui l??ng nh???p l?? do kh??m!");
      return;
    }

    // console.log("time ", date);
    // return;

    this.setState({
      isLoading: true,
    });
    let res = await bookingAppointment({
      fullname: this.state.fullname,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      gender: this.state.gender,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString,
      doctorName,
      birthday,
    });

    if (res && res.status == "ok") {
      this.setState({
        isLoading: false,
      });
      toast.success("?????t l???ch kh??m th??nh c??ng!");
      this.props.closeModal();
    } else {
      this.setState({
        isLoading: false,
      });
      toast.error("?????t l???ch kh??m th???t b???i!");
    }
    // console.log("check state", this.state);
  };

  render() {
    let { isOpenModal, closeModal, dataTime, genders } = this.props;
    let doctorId = "";
    if (dataTime && _.isEmpty()) {
      doctorId = dataTime.doctorId;
    }
    // console.log("dataTime date", dataTime.date);
    return (
      <LoadingOverlay active={this.state.isLoading} spinner text="Loading...">
        <Modal
          isOpen={isOpenModal}
          centered
          className={"modal-container"}
          size="lg"
        >
          <div className="section-modal-body">
            <div className="modal-booking-header">
              <span></span>
              <span className="modal-booking-title">
                Th??ng tin ?????t l???ch kh??m b???nh
              </span>
              <span className="modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="modal-booking-body">
              {/* {JSON.stringify(dataTime)} */}
              <div className="doctor-info">
                <DoctorProfile
                  doctorId={doctorId}
                  isShowDescription={false}
                  dataTime={dataTime}
                  isShowMoreLinkDetailDoctor={false}
                  isShowPrice={true}
                />
              </div>
              {/* <div className="price">
              Gi?? kh??m:   &#8363;
            </div> */}
              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    H??? v?? t??n <span style={{ color: "red" }}>(*)</span>
                  </label>
                  <input
                    required
                    className="form-control"
                    onChange={(e) => this.handleOnChangeInput(e, "fullname")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    S??? ??i???n tho???i <span style={{ color: "red" }}>(*)</span>
                  </label>
                  <input
                    required
                    className="form-control"
                    onChange={(e) => this.handleOnChangeInput(e, "phoneNumber")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    Email <span style={{ color: "red" }}>(*)</span>
                  </label>
                  <input
                    required
                    className="form-control"
                    type="email"
                    onChange={(e) => this.handleOnChangeInput(e, "email")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>?????a ch??? li??n h???</label>
                  <input
                    className="form-control"
                    onChange={(e) => this.handleOnChangeInput(e, "address")}
                  />
                </div>
                <div className="col-12 form-group">
                  <label>
                    L?? do kh??m <span style={{ color: "red" }}>(*)</span>
                  </label>
                  <input
                    required
                    className="form-control"
                    onChange={(e) => this.handleOnChangeInput(e, "reason")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    Ng??y sinh <span style={{ color: "red" }}>(*)</span>
                  </label>
                  <DatePicker
                    required
                    className="form-control"
                    value={this.state.currentDate}
                    onChange={this.handleOnChangeDatePicker}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Gi???i t??nh</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "gender");
                    }}
                    value={this.state.gender}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {item.valueVi}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-booking-footer">
              <button
                className="btn btn-warning btn-booking-confirm"
                onClick={() => this.handleConfirmBooking()}
              >
                X??c nh???n
              </button>
              <button className="btn btn-booking-cancel" onClick={closeModal}>
                H???y
              </button>
            </div>
          </div>
        </Modal>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
