import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
// import "./MedicalBillImage.scss";
import _ from "lodash";

class MedicalBillImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.state) {
      this.setState({
        image: this.props.location.state.image,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location !== prevProps.location) {
      this.setState({
        image: this.props.location.state.image,
      });
    }
  }

  render() {
    const { userInfo } = this.props;
    console.log("check props", this.props);
    const { image } = this.state;
    return (
      <>
        <div
          style={{
            // backgroundImage: `url(${image})`,
            // width: "100%",
            // height: "auto",
            textAlign: "center",
          }}
        >
          <img src={image} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalBillImage);
