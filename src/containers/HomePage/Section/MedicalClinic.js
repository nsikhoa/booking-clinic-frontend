import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router-dom";
import "./MedicalClinic.scss";

import Slider from "react-slick";

class MedicalClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    // console.log("check res clinic", res);
    if (res && res.status === "ok") {
      this.setState({
        clinics: res.data,
      });
    }
  }

  handleRedirectViewDetailMedicalClinic = (item) => {
    console.log("click me", item);
    if (this.props.history)
      this.props.history.push(`/medical-clinic/${item.id}`);
  };

  render() {
    const { clinics } = this.state;
    return (
      <div className="section-share section-medical-clinic">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">
              <FormattedMessage id="home-content.clinic" />
            </span>
            <button className="section-btn">
              <FormattedMessage id="home-content.more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {clinics &&
                clinics.length > 0 &&
                clinics.map((item, index) => {
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() =>
                        this.handleRedirectViewDetailMedicalClinic(item)
                      }
                    >
                      <div
                        className="image img-clinic"
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      />
                      <div>{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalClinic)
);
