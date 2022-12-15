import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import * as actions from "../../../store/actions/adminActions";
import { LANGUAGES } from "../../../utils";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import "./DoctorManage.scss";
import Select from "react-select";
import { getDetailDoctor } from "../../../services/userService";
import { CRUD_Actions } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class DoctorManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: null,
      description: "",
      listDoctor: [],
      hasMarkdownData: false,

      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getRequiredDoctorInfo();
  }

  buildDataInputSelect = (data, type) => {
    let language = this.props.language;
    let result = [];
    if (data && data.length > 0) {
      if (type === "USERS") {
        data.map((item, index) => {
          let object = {};
          object.label = item.fullname;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "PRICE" || type === "PAYMENT" || type === "PROVINCE") {
        data.map((item, index) => {
          let object = {};
          if (type === "PAYMENT" && language === LANGUAGES.EN)
            object.label = item.valueEn;
          else object.label = item.valueVi;
          object.value = item.keyMap;
          result.push(object);
        });
      }

      if (type === "SPECIALTY" || type === "CLINIC") {
        data.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let options = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      // console.log("options ", options);
      this.setState({
        listDoctor: options,
      });
    }

    if (prevProps.language !== this.props.language) {
      let options = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      let { resPrice, resProvince, resPayment, resSpecialty } =
        this.props.allRequiredInfo;

      let dataPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
      let dataPayment = this.buildDataInputSelect(resPayment, "PAYMENT");

      this.setState({
        listDoctor: options,
        listPrice: dataPrice,
        listPayment: dataPayment,
        listProvince: dataProvince,
      });
    }

    if (prevProps.allRequiredInfo !== this.props.allRequiredInfo) {
      // console.log("all require ", this.props.allRequiredInfo);
      let { resPrice, resProvince, resPayment, resSpecialty, resClinic } =
        this.props.allRequiredInfo;
      let dataPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
      let dataPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY");
      let dataClinic = this.buildDataInputSelect(resClinic, "CLINIC");

      this.setState({
        listPrice: dataPrice,
        listPayment: dataPayment,
        listProvince: dataProvince,
        listSpecialty: dataSpecialty,
        listClinic: dataClinic,
      });
    }
  }

  handleOnChangeInputText = (e, type) => {
    let copyState = { ...this.state };
    copyState[type] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
    // console.log("handleEditorChange", html, text);
  };

  handleSaveContent = () => {
    this.props.saveDetailsDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: this.state.hasMarkdownData
        ? CRUD_Actions.EDIT
        : CRUD_Actions.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : "",
      specialtyId: this.state.selectedSpecialty.value,
    });

    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: null,
      description: "",
      addressClinic: "",
      nameClinic: "",
      note: "",
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedSpecialty: "",
      selectedClinic: "",
    });
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } =
      this.state;
    // console.log(`Option selected:`, selectedOption);
    let res = await getDetailDoctor(selectedOption.value);
    if (res && res.status === "ok" && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        specialtyId = "",
        clinicId = "";
      if (res.data.Doctor_Info) {
        addressClinic = res.data.Doctor_Info.addressClinic;
        nameClinic = res.data.Doctor_Info.nameClinic;
        note = res.data.Doctor_Info.note;
        paymentId = res.data.Doctor_Info.paymentId;
        priceId = res.data.Doctor_Info.priceId;
        provinceId = res.data.Doctor_Info.provinceId;
        specialtyId = res.data.Doctor_Info.specialtyId;
        clinicId = res.data.Doctor_Info.clinicId;

        var selectedPrice = listPrice.find(
          (item) => item && item.value === priceId
        );
        var selectedPayment = listPayment.find(
          (item) => item && item.value === paymentId
        );
        var selectedProvince = listProvince.find(
          (item) => item && item.value === provinceId
        );
        var selectedSpecialty = listSpecialty.find(
          (item) => item && item.value === specialtyId
        );
        var selectedClinic = listClinic.find(
          (item) => item && item.value === clinicId
        );
        // selectedPayment: "",
        // selectedProvince: "",
      }
      // console.log("ádasd", addressClinic, nameClinic, note);
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasMarkdownData: true,
        addressClinic,
        nameClinic,
        note,
        selectedPrice,
        selectedPayment,
        selectedProvince,
        selectedSpecialty,
        selectedClinic,
      });

      // console.log(this.state);
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasMarkdownData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        selectedSpecialty: "",
      });
    }
    // console.log(res);
  };

  handleOnChangeSelectDoctorInfoExtra = async (selectedOption, name) => {
    let state = name.name;
    let stateCopy = { ...this.state };

    stateCopy[state] = selectedOption;

    this.setState({
      ...stateCopy,
    });

    // console.log(selectedOption, name);
  };

  render() {
    // console.log("state ", this.state);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title title">
          <FormattedMessage id="manage-doctor.title" />
        </div>
        <div className="more-info">
          <div className="more-info-content-left form-group">
            <label>
              <FormattedMessage id="manage-doctor.choose-doctor" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.listDoctor}
              placeholder="Chọn bác sĩ"
            />
          </div>
          <div className="more-info-content-right form-group">
            <label>
              <FormattedMessage id="manage-doctor.introduction-info" />
            </label>
            <textarea
              rows={5}
              className="form-control"
              onChange={(e) => {
                this.handleOnChangeInputText(e, "description");
              }}
              value={this.state.description}
            ></textarea>
          </div>
        </div>

        <div className="more-info-extra">
          <div className="row">
            <div className="col-4 form-group">
              <label>Chọn giá</label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.handleOnChangeSelectDoctorInfoExtra}
                options={this.state.listPrice}
                placeholder="Chọn giá"
                name="selectedPrice"
              />
            </div>
            <div className="col-4 form-group">
              <label>Phương thức thanh toán</label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handleOnChangeSelectDoctorInfoExtra}
                options={this.state.listPayment}
                placeholder="Chọn phương thức thanh toán"
                name="selectedPayment"
              />
            </div>
            <div className="col-4 form-group">
              <label>Chọn tỉnh thành</label>
              <Select
                value={this.state.selectedProvince}
                onChange={this.handleOnChangeSelectDoctorInfoExtra}
                options={this.state.listProvince}
                placeholder="Chọn tỉnh thành"
                name="selectedProvince"
              />
            </div>

            {/* <div className="col-4 form-group">
              <label>Tên phòng khám</label>
              <input
                className="form-control"
                onChange={(e) => this.handleOnChangeInputText(e, "nameClinic")}
                value={this.state.nameClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label>Địa chỉ phòng khám</label>
              <input
                className="form-control"
                onChange={(e) =>
                  this.handleOnChangeInputText(e, "addressClinic")
                }
                value={this.state.addressClinic}
              />
            </div> */}
            <div className="col-4 form-group">
              <label>Ghi chú</label>
              <input
                className="form-control"
                onChange={(e) => this.handleOnChangeInputText(e, "note")}
                value={this.state.note}
              />
            </div>

            <div className="col-4 form-group">
              <label>Chọn chuyên khoa</label>
              <Select
                value={this.state.selectedSpecialty}
                onChange={this.handleOnChangeSelectDoctorInfoExtra}
                options={this.state.listSpecialty}
                placeholder="Chọn chuyên khoa"
                name="selectedSpecialty"
              />
            </div>

            <div className="col-4 form-group">
              <label>Chọn phòng khám</label>
              <Select
                value={this.state.selectedClinic}
                onChange={this.handleOnChangeSelectDoctorInfoExtra}
                options={this.state.listClinic}
                placeholder="Chọn phòng khám"
                name="selectedClinic"
              />
            </div>
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={`save-content-markdown btn mt-3 ${
            this.state.hasMarkdownData ? "btn-warning" : "btn-primary"
          }`}
          onClick={() => this.handleSaveContent()}
        >
          {this.state.hasMarkdownData ? "Sửa thông tin" : "Lưu thông tin"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredInfo: state.admin.allRequiredInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    saveDetailsDoctor: (data) => dispatch(actions.saveDetailsDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
