import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageRedux(language);
  };

  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="header-container">
          <div className="header-content">
            <div className="header-content-logo">
              <Link className="header-content-logo-img" to="/home"></Link>
            </div>
            <div className="header-content-center">
              <div className="header-content-center-children">
                <FormattedMessage id="home-header.specialty" />
              </div>
              <div className="header-content-center-children">
                {" "}
                <FormattedMessage id="home-header.clinic" />
              </div>
              <div className="header-content-center-children">
                <FormattedMessage id="home-header.doctor" />
              </div>
              <div className="header-content-center-children">
                <FormattedMessage id="home-header.fee" />
              </div>
            </div>
            <div className="header-content-support">
              <div>
                <i className="fas fa-question-circle"></i>
                <a
                  href="http://localhost:3001"
                  style={{ color: "inherit", textDecoration: "none" }}
                  target="_blank"
                >
                  <FormattedMessage id="home-header.support" />
                </a>
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span
                  onClick={() => {
                    this.changeLanguage(LANGUAGES.VI);
                  }}
                >
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span
                  onClick={() => {
                    this.changeLanguage(LANGUAGES.EN);
                  }}
                >
                  EN
                </span>
              </div>
              <div>
                <a
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    marginLeft: "10px",
                  }}
                  href="/login"
                  target="_blank"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner ? (
          <div className="banner-container">
            <div className="banner-container-title">
              <div className="title-short">
                <FormattedMessage id="banner.title-short" />
              </div>
              <div className="title-long">
                <FormattedMessage id="banner.title-long" />
              </div>
            </div>
            {/* <div className="banner-container-search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Nhập phòng khám cần tìm kiếm"
                onKeyPress={(e) => {
                  if (e.key === "Enter") alert("Hello");
                }}
              />
            </div> */}
            <div className="banner-container-list">
              <ul className="banner-list">
                <li className="banner-list-item">
                  <div className="background-icon">
                    <i className="fas fa-hospital-symbol"></i>
                  </div>
                  <p>
                    <FormattedMessage id="banner.child1" />
                  </p>
                </li>
                <li className="banner-list-item">
                  <div className="background-icon">
                    <i className="fas fa-first-aid"></i>
                  </div>
                  <p>
                    <FormattedMessage id="banner.child2" />
                  </p>
                </li>
                <li className="banner-list-item">
                  <div className="background-icon">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <p>
                    <FormattedMessage id="banner.child3" />
                  </p>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <></>
        )}
      </React.Fragment>
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
  return {
    changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
