import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "react-image-lightbox/style.css";
import * as actions from "../../../store/actions/adminActions";
// import "./TableManagerUser.scss";

class TableManagerUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        userArr: this.props.listUsers,
      });
    }
  }

  deleteUser = (user) => {
    // console.log(user);
    this.props.deleteUser(user.id);
  };

  updateUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };

  render() {
    // console.log(this.state.userArr);
    let arrUsers = this.state.userArr;
    return (
      <React.Fragment>
        <table className="table table-bordered table-hover">
          <thead className="table-primary">
            <th>Email</th>
            <th>Fullname</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.fullname}</td>
                    <td>
                      {item.gender === "M"
                        ? "Nam"
                        : item.gender === "F"
                        ? "Nữ"
                        : "Khác"}
                    </td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        onClick={() => this.updateUser(item)}
                        className="btn"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn"
                        onClick={() => this.deleteUser(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(actions.fetchAllUserStart()),
    deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
