import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllMedicalSpecialty } from "../../../services/userService";
import { withRouter } from "react-router-dom";
import "./Specialty.scss";

import Slider from "react-slick";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSpecialties: [],
    };
  }

  async componentDidMount() {
    let res = await getAllMedicalSpecialty();

    if (res && res.status === "ok") {
      this.setState({
        allSpecialties: res.data ? res.data : [],
      });
    }
  }

  handleRedirectViewDetailMedicalSpecialty = (item) => {
    // /doctor/:id
    // console.log("click", item);
    // console.log(this.props);
    if (this.props.history)
      this.props.history.push(`/medical-specialty/${item.id}`);
  };

  render() {
    let { allSpecialties } = this.state;
    // console.log(allSpecialties);
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">
              <FormattedMessage id="home-content.specialty" />
            </span>
            <button className="section-btn">
              <FormattedMessage id="home-content.more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {/* <div className="section-customize">
                <div className="image img-specialty" />
                <div>Cơ xương khớp</div>
              </div> */}
              {allSpecialties &&
                allSpecialties.length > 0 &&
                allSpecialties.map((item, index) => {
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() =>
                        this.handleRedirectViewDetailMedicalSpecialty(item)
                      }
                    >
                      <div
                        className="image img-specialty"
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
