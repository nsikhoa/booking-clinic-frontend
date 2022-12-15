import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_Actions } from "../../../utils/constant";
import * as actions from "../../../store/actions/adminActions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./UserManage.scss";
import TableManageUser from "./TableManageUser";
import CommonUtils from "../../../utils/CommonUtils";
import { toast } from "react-toastify";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      fullname: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();

    // try {
    //   let res = await getAllCodeService("gender");
    //   if (res && res.status === "ok") {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    // } catch (e) {}
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gender !== this.props.gender) {
      let arrGenders = this.props.gender;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }

    if (prevProps.positions !== this.props.positions) {
      let arrPositions = this.props.positions;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0
            ? arrPositions[0].keyMapMap
            : "",
      });
    }

    if (prevProps.roles !== this.props.roles) {
      let arrRoles = this.props.roles;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }

    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.gender;
      let arrPositions = this.props.positions;
      let arrRoles = this.props.roles;
      this.setState({
        email: "",
        password: "",
        fullname: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        previewImgURL: "",
        action: CRUD_Actions.CREATE,
      });
    }
  }

  handleImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectURL,
        avatar: base64,
      });
    }
  };

  openImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  validateInput = () => {
    let isValid = true;
    let arrCheck = ["email", "password", "phoneNumber", "address", "fullname"];

    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        toast.error(`${arrCheck[i]} input required!`);
        break;
      }
    }
    return isValid;
  };

  saveUser = () => {
    let isValid = this.validateInput();
    if (isValid === false) return;

    let { action } = this.state;

    if (action === CRUD_Actions.EDIT) {
      this.props.editUser({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        fullname: this.state.fullname,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        majorId: this.state.position,
        avatar: this.state.avatar,
      });
    }

    // console.log(this.state);
    if (action === CRUD_Actions.CREATE) {
      this.props.createUser({
        email: this.state.email,
        password: this.state.password,
        fullname: this.state.fullname,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        majorId: this.state.position,
        avatar: this.state.avatar,
      });
    }

    this.props.fetchUsers();
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "HARDCODE",
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.majorId,
      role: user.roleId,
      avatar: "",
      previewImgURL: imageBase64,
      action: CRUD_Actions.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;

    let {
      email,
      password,
      fullname,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;

    return (
      <div className="container">
        <div className="title">Quản lý tài khoản người dùng</div>
        <div className="body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-12">
                {isLoadingGender === true ? "Loading gender" : ""}
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    this.onChangeInput(e, "email");
                  }}
                  disabled={
                    this.state.action === CRUD_Actions.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    this.onChangeInput(e, "password");
                  }}
                  disabled={
                    this.state.action === CRUD_Actions.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-user.fullname" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={fullname}
                  onChange={(e) => {
                    this.onChangeInput(e, "fullname");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => {
                    this.onChangeInput(e, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(e) => {
                    this.onChangeInput(e, "address");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "gender");
                  }}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "position");
                  }}
                  value={position}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "role");
                  }}
                  value={role}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewing"
                    className=""
                    type="file"
                    hidden
                    onChange={(e) => this.handleImage(e)}
                  />
                  <label className="label-upload" htmlFor="previewing">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openImage()}
                  ></div>
                </div>
              </div>

              <div className="col-12 mt-3">
                <button
                  className={
                    this.state.action === CRUD_Actions.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.saveUser()}
                >
                  {this.state.action === CRUD_Actions.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>

              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gender: state.admin.genders,
    roles: state.admin.roles,
    positions: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUsers: () => dispatch(actions.fetchAllUserStart()),
    editUser: (data) => dispatch(actions.editUser(data)),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
