import React, { Component } from "react";
import { connect } from "react-redux";
import "./ConfirmBookingModal.scss";
import { Modal } from "reactstrap";
import _ from "lodash";
import { toast } from "react-toastify";
// import { LANGUAGES } from "../../../utils";
import { CommonUtils } from "../../../utils";

class ConfirmBookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgMedicalBill: "",
    };
  }

  async componentDidMount() {
    if (this.props.data.email) {
      this.setState({
        email: this.props.data.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        email: this.props.data.email,
      });
    }
  }

  handleOnChangeInput = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgMedicalBill: base64,
      });
    }
  };

  sendMedicalBill = () => {
    // console.log("checkstatemodal", this.state);
    this.props.sendBill(this.state);
  };

  render() {
    let { isOpenModal, data, closeModal } = this.props;
    // console.log("dataTime date", dataTime.date);
    return (
      <Modal
        isOpen={isOpenModal}
        centered
        className={"modal-container"}
        size="md"
      >
        <div className="section-modal-body">
          <div className="modal-booking-header">
            <span></span>
            <span className="modal-booking-title">
              Xác nhận và gửi hóa đơn khám bệnh
            </span>
            <span className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>

          <div className="modal-booking-body">
            <div className="row">
              <div className="col-6 form-group">
                <label>Email bệnh nhân</label>
                <input
                  required
                  className="form-control"
                  value={this.state.email}
                  onChange={(e) => this.handleOnChangeInput(e)}
                />
              </div>
              <div className="col-6 form-group">
                <label>Gửi ảnh đơn thuốc</label>
                <input
                  required
                  type="file"
                  className="form-control-file"
                  onChange={(e) => this.handleImage(e)}
                />
              </div>
            </div>
            <div className="modal-booking-footer">
              <button
                className="btn btn-warning btn-booking-confirm"
                onClick={() => this.sendMedicalBill()}
              >
                Xác nhận
              </button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmBookingModal);
