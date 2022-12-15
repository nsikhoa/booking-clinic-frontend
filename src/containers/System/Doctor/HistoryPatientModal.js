import React, { Component } from "react";
import { connect } from "react-redux";
import "./HistoryPatientModal.scss";
import { Modal } from "reactstrap";
import _ from "lodash";
import { toast } from "react-toastify";
import moment from "moment";
import { getListPatientHistoryDetail } from "../../../services/userService";
import Lightbox from "react-image-lightbox";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import MedicalBillImage from "./MedicalBillImage";

class HistoryPatientModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHistoryPatient: [],
      isOpenImageArr: "",
    };
  }

  async componentDidMount() {
    let { doctorId, patientId } = this.props.data;
    let res = await getListPatientHistoryDetail(doctorId, patientId);

    if (res && res.data) {
      let arr = res.data;
      let isOpenImgArr = [];
      arr.map((item, index) => {
        if (item.image) {
          item.image = new Buffer(item.image, "base64").toString("binary");
        }

        if (item.date) {
          item.date = moment(new Date(+item.date)).format("DD/MM/YYYY");
        }
        isOpenImgArr[index] = false;
        return item;
      });

      this.setState({
        dataHistoryPatient: arr,
        isOpenImageArr: isOpenImgArr,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.data !== prevProps.data) {
      let { doctorId, patientId } = this.props.data;
      let res = await getListPatientHistoryDetail(doctorId, patientId);

      if (res && res.data) {
        let arr = res.data;
        let isOpenImgArr = [];
        arr.map((item, index) => {
          if (item.image) {
            item.image = new Buffer(item.image, "base64").toString("binary");
          }

          if (item.date) {
            item.date = moment(new Date(+item.date)).format("DD/MM/YYYY");
          }
          isOpenImgArr[index] = false;
          return item;
        });

        this.setState({
          dataHistoryPatient: arr,
          isOpenImageArr: isOpenImgArr,
        });
      }
    }
  }

  openImage = (item) => {
    // if (!this.state.historyInfos.image) return;
    // let isOpenImgArr = this.state.isOpenImageArr;
    // isOpenImgArr[index] = true;
    // this.setState({
    //   isOpenImageArr: isOpenImgArr,
    // });
    this.props.history.push(
      {
        pathname: `/image/patient/history-booking`,
      },
      {
        image: item.image,
      }
    );
  };

  render() {
    let { isOpenModal, data, closeModal } = this.props;
    let { dataHistoryPatient, isOpenImageArr } = this.state;
    // console.log("dataTime date", dataTime.date);
    // console.log("check props", this.props);
    // console.log("check state", this.state);
    // console.log(data);
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
            <span className="modal-booking-title">
              Lịch sử khám bệnh của{" "}
              {data.patientDataHistory ? data.patientDataHistory.fullname : ""}
            </span>
            <span className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>

          <div className="modal-booking-body">
            <div className="">
              <table className="table table-bordered table-hover">
                <thead className="table-primary">
                  <th>STT</th>
                  <th>Lí do khám</th>
                  <th>Giờ khám</th>
                  <th>Ngày khám</th>
                  {/* <th>Đơn khám</th> */}
                  {/* <th>Giờ khám</th> */}
                </thead>
                <tbody>
                  {dataHistoryPatient && dataHistoryPatient.length > 0 ? (
                    dataHistoryPatient.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.reason ? item.reason : ""}</td>
                          <td>
                            {item.timeTypeDataHistory
                              ? item.timeTypeDataHistory.valueVi
                                ? item.timeTypeDataHistory.valueVi
                                : ""
                              : ""}
                          </td>
                          {/* <td>{item.date ? item.date : ""}</td> */}
                          <td>{item.date ? item.date : ""}</td>
                          {/* <td>
                            <div
                              className="preview-image"
                              style={{
                                backgroundImage: `url(${item.image})`,
                              }}
                              onClick={() => this.openImage(item)}
                            ></div>
                          </td> */}
                          {/* {isOpenImageArr[index] && (
                            <Lightbox
                              style={{ zIndex: 10000 }}
                              mainSrc={item.image}
                              onCloseRequest={() => {
                                let isOpenImgArr = isOpenImageArr;
                                isOpenImgArr[index] = false;

                                this.setState({
                                  isOpenImageArr: isOpenImgArr,
                                });
                              }}
                            />
                          )} */}
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
            <div className="modal-booking-footer">
              <button className="btn btn-booking-cancel" onClick={closeModal}>
                Hủy
              </button>
            </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HistoryPatientModal)
);
