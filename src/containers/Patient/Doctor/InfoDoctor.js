import React, { Component } from "react";
import { connect } from "react-redux";
import "./InfoDoctor.scss";
import { getDetailDoctorExtraInfoById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";

class InfoDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPrice: true,
      extraInfo: [],
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let data = await getDetailDoctorExtraInfoById(
        this.props.doctorIdFromParent
      );
      if (data && data.status === "ok") {
        this.setState({
          extraInfo: data.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let { language } = this.props;
    if (this.props.language !== prevProps.language) {
    }

    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let data = await getDetailDoctorExtraInfoById(
        this.props.doctorIdFromParent
      );
      if (data && data.status === "ok") {
        this.setState({
          extraInfo: data.data,
        });
      }
    }
  }

  handleShowPrice = () => {
    this.setState({
      isShowPrice: !this.state.isShowPrice,
    });
  };

  render() {
    let { extraInfo } = this.state;
    console.log("extraInfo", extraInfo);
    return (
      <div className="info-doctor-container">
        <div className="content-up">
          <div className="content-up-title">Địa chỉ phòng khám</div>
          <div className="content-up-name-clinic">
            {extraInfo.Clinic && extraInfo.Clinic.name
              ? extraInfo.Clinic.name
              : ""}
          </div>
          <div className="content-up-address">
            {extraInfo.Clinic && extraInfo.Clinic.address
              ? extraInfo.Clinic.address
              : ""}
          </div>
        </div>
        <div className="content-down">
          <div
            className={`content-down-price-show ${
              this.state.isShowPrice ? "show" : "hide"
            }`}
          >
            Giá:{" "}
            <strong>
              {extraInfo.priceData ? extraInfo.priceData.valueVi : ""} &#8363;{" "}
            </strong>
            <span onClick={() => this.handleShowPrice()}>Xem chi tiết</span>
          </div>
          <div
            className={`content-down-price-hide ${
              !this.state.isShowPrice ? "show" : "hide"
            }`}
          >
            <div className="content-down-title">Giá khám</div>
            <div className="content-down-price-note">
              <span className="price">
                Giá: {extraInfo.priceData ? extraInfo.priceData.valueVi : ""}{" "}
                &#8363;
              </span>
              <span className="note">
                {extraInfo.note ? extraInfo.note : ""}
              </span>
            </div>
            <div className="content-down-payment">
              <span>
                Phương thức thanh toán:{" "}
                {extraInfo.paymentData ? extraInfo.paymentData.valueVi : ""}
              </span>
            </div>
            <div
              className="content-down-button"
              onClick={() => this.handleShowPrice()}
            >
              Ẩn bớt
            </div>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoDoctor);
