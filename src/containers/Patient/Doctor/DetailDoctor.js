import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import {
  getDetailDoctor,
  getNumberPatientsByDoctorId,
} from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import ScheduleDoctor from "./ScheduleDoctor";
import InfoDoctor from "./InfoDoctor";
import ListPatientModal from "./Modal/ListPatientModal";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: "",
      isOpenModal: false,
      countPatient: "",
      countPatientDone: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailDoctor(id);

      if (res && res.status === "ok") {
        this.setState({
          detailDoctor: res.data,
        });
      }

      let resNumberPatient = await getNumberPatientsByDoctorId(id);

      // console.log("check response count patient", resNumberPatient);

      if (resNumberPatient && resNumberPatient.status === "ok") {
        this.setState({
          countPatient: resNumberPatient.data.numberOfPatients,
          countPatientDone: resNumberPatient.data.numberOfPatientsDone,
        });
      }

      // console.log("detail doctor", res);

      // imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
  }

  handleCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  handleOpenModal = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { detailDoctor, isOpenModal, countPatient, countPatientDone } =
      this.state;
    let { language } = this.props;
    // console.log("check state", this.state);
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="doctor-detail-introduction">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="content-right-up">
                {detailDoctor && (
                  <span>
                    {language === LANGUAGES.VI
                      ? detailDoctor.majorData.valueVi
                      : detailDoctor.majorData.valueEn}{" "}
                    {detailDoctor.fullname}
                  </span>
                )}
              </div>
              <div className="content-right-down">
                {detailDoctor.Markdown && detailDoctor.Markdown.description && (
                  <span>{detailDoctor.Markdown.description}</span>
                )}
              </div>
              <div className="content-patients">
                <p>
                  Số lượng bệnh nhân đã đăng ký đặt lịch khám qua website:{" "}
                  <span>{countPatient}</span>
                </p>
                <p>
                  Số lượng đơn đã khám sau khi đặt lịch:{" "}
                  <span>{countPatientDone}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="doctor-detail-schedule">
            <div className="content-left">
              <ScheduleDoctor
                doctorIdFromParent={
                  detailDoctor && detailDoctor.id ? detailDoctor.id : -1
                }
              />
            </div>
            <div className="content-right">
              <InfoDoctor
                doctorIdFromParent={
                  detailDoctor && detailDoctor.id ? detailDoctor.id : -1
                }
              />
            </div>
            <div className="more-content">
              <button
                className="btn btn-link"
                onClick={() => this.handleOpenModal()}
              >
                <span>Xem danh sách bệnh nhân</span>
              </button>
            </div>
          </div>
          <div className="doctor-detail-info">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="doctor-detail-comment"> </div>
        </div>
        <ListPatientModal
          isOpenModal={isOpenModal}
          closeModal={this.handleCloseModal}
          doctorId={
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
