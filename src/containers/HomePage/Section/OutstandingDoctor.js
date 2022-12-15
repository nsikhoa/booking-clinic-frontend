import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutstandingDoctor.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router-dom";

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctors: this.props.topDoctors,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleRedirectViewDetailDoctor = (item) => {
    // /doctor/:id
    // console.log(this.props);
    if (this.props.history) this.props.history.push(`/doctor/${item.id}`);
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    // arrDoctors = arrDoctors.concat(arrDoctors);
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">
              <FormattedMessage id="home-content.doctor" />
            </span>
            <button className="section-btn">
              <FormattedMessage id="home-content.more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  // console.log("image ", item);
                  let nameVi = `${item.majorData.valueVi}, ${item.fullname}`;
                  let nameEn = `${item.majorData.valueEn}, ${item.fullname}`;
                  return (
                    <div
                      className="section-customize outstanding-doctor"
                      key={index}
                      onClick={() => this.handleRedirectViewDetailDoctor(item)}
                    >
                      <div className="outer-bg">
                        <div
                          className="image img-outstanding-doctor"
                          style={{
                            backgroundImage: `url(${imageBase64})`,
                          }}
                        />
                      </div>
                      <div className="position text-center">
                        <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                      </div>
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
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);
