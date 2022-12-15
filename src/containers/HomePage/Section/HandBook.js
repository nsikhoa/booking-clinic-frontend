import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
// import "./HandBook.scss";

import Slider from "react-slick";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">
              <FormattedMessage id="home-content.handbook" />
            </span>
            <button className="section-btn">
              <FormattedMessage id="home-content.more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="image img-handbook" />
                <div>Cơ xương khớp</div>
              </div>
              <div className="section-customize">
                <div className="image img-handbook" />
                <div>Thần kinh</div>
              </div>
              <div className="section-customize">
                <div className="image img-handbook" />
                <div>Tim mạch</div>
              </div>
              <div className="section-customize">
                <div className="image img-handbook" />
                <div>Răng hàm mặt</div>
              </div>
              <div className="section-customize">
                <div className="image img-handbook" />
                <div>Huyết học</div>
              </div>
              <div className="section-customize">
                <div className="image img-handbook" />
                <div>Nội khoa</div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
