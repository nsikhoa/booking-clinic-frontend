import React, { Component } from "react";
import { connect } from "react-redux";
import "./SpecialtyManage.scss";
import _ from "lodash";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import CommonUtils from "../../../utils/CommonUtils";
import { createMedicalSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class SpecialtyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      desHTML: "",
      desMarkdown: "",
      previewImgURL: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
  }

  handleOnChangeInput = (e, type) => {
    let copyState = { ...this.state };
    copyState[type] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      desHTML: html,
      desMarkdown: text,
    });
  };

  handleOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectURL,
        image: base64,
      });
    }
  };

  handleSave = async () => {
    console.log("check state", this.state);

    let res = await createMedicalSpecialty({
      name: this.state.name,
      desHTML: this.state.desHTML,
      desMarkdown: this.state.desMarkdown,
      image: this.state.image,
    });

    if (res && res.status === "ok") {
      toast.success("Thêm thông tin chuyên khoa thành công!");
      this.setState({
        name: "",
        image: "",
        desHTML: "",
        desMarkdown: "",
        previewImgURL: "",
      });
    } else {
      toast.error("Thêm thông tin chuyên khoa thất bại!");
    }
  };

  render() {
    return (
      <div className="specialty-manage-container">
        <div className="specialty-manage-title title">Quản lý chuyên khoa</div>

        <div className="specialty-manage-content row">
          <div className="form-group col-6">
            <label>Tên chuyên khoa</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(e) => this.handleOnChangeInput(e, "name")}
            />
          </div>
          <div className="form-group col-6">
            <label>Ảnh</label>
            <input
              className="form-control-file"
              type="file"
              onChange={(e) => this.handleOnChangeImage(e)}
            />
          </div>

          <div className="col-12">
            <MdEditor
              style={{ height: "350px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.desMarkdown}
            />
          </div>

          <div className="col-12">
            <button
              className="btn btn-primary"
              onClick={() => this.handleSave()}
            >
              Lưu
            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
