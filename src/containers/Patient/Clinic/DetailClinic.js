import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import ScheduleDoctor from "../Doctor/ScheduleDoctor";
import DoctorProfile from "../Doctor/DoctorProfile";
import InfoDoctor from "../Doctor/InfoDoctor";
import {
  getDetailClinic,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorClinicId: [],
      clinicDoctors: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailClinic(id);

      if (res && res.status === "ok") {
        let data = res.data;
        let arrDoctorClinicId = [];

        if (data && !_.isEmpty(data)) {
          let arrDoctors = data.doctors;
          if (arrDoctors && arrDoctors.length > 0) {
            arrDoctors.map((item) => {
              arrDoctorClinicId.push(item.doctorId);
            });
          }
        }

        this.setState({
          clinicDoctors: res.data,
          arrDoctorClinicId,
        });
      }
      // console.log("detail doctor", res);
      // imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let { language } = this.props;
    if (this.props.language !== prevProps.language) {
    }
  }

  // async handleOnChangeProvince(e) {
  //   // console.log(e.target.value);
  //   if (
  //     this.props.match &&
  //     this.props.match.params &&
  //     this.props.match.params.id
  //   ) {
  //     let id = this.props.match.params.id;
  //     let res = await getSpecialtyById({
  //       id,
  //       location: e.target.value,
  //     });

  //     if (res && res.status === "ok") {
  //       let data = res.data;
  //       let arrDoctorClinicId = [];

  //       if (data && !_.isEmpty(data)) {
  //         let arrDoctors = data.doctors;
  //         if (arrDoctors && arrDoctors.length > 0) {
  //           arrDoctors.map((item) => {
  //             arrDoctorClinicId.push(item.doctorId);
  //           });
  //         }
  //       }

  //       this.setState({
  //         clinicDoctors: res.data,
  //         arrDoctorClinicId,
  //       });
  //     }
  //   }
  // }

  render() {
    let { arrDoctorClinicId, clinicDoctors } = this.state;
    // console.log("check state", this.state);
    return (
      <>
        <HomeHeader />
        <div className="detail-specialty-container">
          <div className="detail-specialty-body">
            <div className="specialty-title">
              {clinicDoctors && !_.isEmpty(clinicDoctors) && (
                <>
                  {/* <div
                    dangerouslySetInnerHTML={{
                      __html: clinicDoctors.descriptionHTML,
                    }}
                  ></div> */}
                  <div className="clinic-name">{clinicDoctors.name}</div>
                  <div className="clinic-address">
                    Địa chỉ: {clinicDoctors.address}
                  </div>
                </>
              )}
            </div>
            {/* <div className="specialty-select">
              <select
                className="select-province"
                onChange={(e) => this.handleOnChangeProvince(e)}
              >
                <option value="ALL">Tất cả</option>
                {listProvince &&
                  listProvince.length > 0 &&
                  listProvince.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {item.valueVi}
                      </option>
                    );
                  })}
              </select>
            </div> */}
            {arrDoctorClinicId && arrDoctorClinicId.length > 0 ? (
              arrDoctorClinicId.map((item, index) => {
                return (
                  <div className="specialty-doctor" key={index}>
                    <div className="specialty-doctor-left">
                      <DoctorProfile
                        doctorId={item}
                        isShowDescription={true}
                        isShowMoreLinkDetailDoctor={true}
                        isShowPrice={false}
                        // dataTime={this.props.dataTime}
                      />
                    </div>
                    <div className="specialty-doctor-right">
                      <div className="content-right-doctor">
                        <ScheduleDoctor key={index} doctorIdFromParent={item} />
                        <InfoDoctor doctorIdFromParent={item} />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <em>Không có dữ liệu</em>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
