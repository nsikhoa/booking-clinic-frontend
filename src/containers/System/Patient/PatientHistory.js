import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllPatientHistory } from "../../../services/userService";
import moment from "moment";
import "./PatientHistory.scss";
import Lightbox from "react-image-lightbox";

class PatientHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyInfos: [],
      previewImgURL: "",
      isOpenImageArr: [],
    };
  }

  async componentDidMount() {
    let { userInfo } = this.props;
    if (userInfo && userInfo.id) {
      let res = await getAllPatientHistory(userInfo.id);

      console.log("check res patient", res.data);
      if (res && res.status === "ok") {
        let arr = res.data;
        let isOpenImgArr = [];
        arr.map((item, index) => {
          if (item.image) {
            item.image = new Buffer(item.image, "base64").toString("binary");
          }

          if (item.date) {
            item.date = moment(new Date(+item.date)).format("DD/MM/YYYY");
          }
          isOpenImgArr[index] = false;
          return item;
        });

        this.setState({
          historyInfos: arr,
          isOpenImageArr: isOpenImgArr,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
  }

  openImage = (index) => {
    // if (!this.state.historyInfos.image) return;
    let isOpenImgArr = this.state.isOpenImageArr;
    isOpenImgArr[index] = true;

    this.setState({
      isOpenImageArr: isOpenImgArr,
    });
  };

  render() {
    let { historyInfos, isOpenImageArr } = this.state;
    // console.log(isOpenImageArr);
    console.log("check history info", historyInfos);
    return (
      <>
        <div className="container">
          <div className="title">Lịch sử khám bệnh</div>
          <div className="row">
            <table className="table table-bordered table-hover">
              <thead className="table-primary">
                <th>STT</th>
                <th>Bác sĩ khám</th>
                <th>Lí do khám</th>
                <th>Giờ khám</th>
                <th>Ngày khám</th>
                <th>Đơn thuốc</th>
              </thead>
              <tbody>
                {historyInfos &&
                  historyInfos.length > 0 &&
                  historyInfos.map((item, index) => {
                    // console.log("check item", item);
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {item.doctorDataScheduleHistory
                            ? item.doctorDataScheduleHistory.fullname
                            : ""}
                        </td>
                        <td>{item.reason ? item.reason : ""}</td>
                        <td>
                          {item.timeTypeDataHistory
                            ? item.timeTypeDataHistory.valueVi
                            : ""}
                        </td>
                        <td>{item.date ? item.date : ""}</td>
                        <td>
                          <div
                            className="preview-image"
                            style={{
                              backgroundImage: `url(${item.image})`,
                            }}
                            onClick={() => this.openImage(index)}
                          ></div>
                        </td>
                        {isOpenImageArr[index] && (
                          <Lightbox
                            mainSrc={item.image}
                            onCloseRequest={() => {
                              let isOpenImgArr = isOpenImageArr;
                              isOpenImgArr[index] = false;

                              this.setState({
                                isOpenImageArr: isOpenImgArr,
                              });
                            }}
                          />
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientHistory);
