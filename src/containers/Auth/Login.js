import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLogin } from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isHiddenPassword: true,
      errorMessage: "",
    };
  }

  handleOnChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
    console.log(e.target.value);
  }

  handleOnChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
    console.log(e.target.value);
  }

  showHiddenPassword() {
    this.setState({
      isHiddenPassword: !this.state.isHiddenPassword,
    });
  }

  login = async () => {
    // console.log("username: " + this.state.username);
    // console.log("password: " + this.state.password);
    this.setState({
      errorMessage: "",
    });
    try {
      const data = await handleLogin(this.state.username, this.state.password);
      if (data && data.status != "ok") {
        this.setState({
          errorMessage: data.message,
        });
      }
      if (data && data.status == "ok") {
        this.props.userLoginSuccess(data.data);
        console.log(data.data);
        console.log("login success");
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errorMessage: e.response.data.message,
          });
        }
      }
      // console.log(e.response);
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container row">
          <div className="login-content">
            <div className="col-12 text-center login-header">Member log in</div>
            <div className="col-12 form-group login-input">
              <label>Username: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                defaultValue={this.state.username}
                onChange={(e) => this.handleOnChangeUsername(e)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    this.login();
                  }
                }}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password: </label>
              <div className="input-password">
                <input
                  type={this.state.isHiddenPassword ? "password" : "text"}
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={(e) => this.handleOnChangePassword(e)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      this.login();
                    }
                  }}
                />
                <span
                  onMouseDown={() => {
                    this.showHiddenPassword();
                  }}
                  onMouseUp={() => {
                    this.showHiddenPassword();
                  }}
                >
                  <i
                    class={
                      this.state.isHiddenPassword
                        ? "fas fa-eye-slash"
                        : "fas fa-eye"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red", fontSize: "12px" }}>
              {this.state.errorMessage}
            </div>

            <div className="col-12">
              <button
                className="login-btn"
                onClick={() => {
                  this.login();
                }}
                // onKeyPress={(e) => {
                //   if (e.keyCode === 13) {
                //     console.log("Enter");
                //     // this.login();
                //   }
                // }}
              >
                Login
              </button>
            </div>
            {/* <div className="col-12">
              <span className="login-forgot">Forgot password?</span>
            </div>
            <div className="col-12 text-center">
              <span>Or login with</span>
            </div>
            <div className="col-12 social">
              <i class="fab fa-facebook facebook"></i>
              <i class="fab fa-google google"></i>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) =>
    //   dispatch(actions.adminLoginSuccess(adminInfo)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
