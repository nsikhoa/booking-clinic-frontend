import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorService,
  createDoctorInfoService,
  getAllMedicalSpecialty,
  getAllClinic,
} from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      let res = await getAllCodeService("GENDER");
      if (res && res.status === "ok") {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log("fetchGenderStart Error", e);
    }
  };
};

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.status === "ok") {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchPositionFail());
      console.log("fetchPositionStart Error", e);
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.status === "ok") {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log("fetchRoleStart Error", e);
    }
  };
};

export const fetchGenderSuccess = (gender) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: gender,
});

export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

export const fetchPositionSuccess = (position) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: position,
});

export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

export const fetchRoleSuccess = (role) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: role,
});

export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createUserService(data);
      if (res && res.status === "ok") {
        toast.success("Create a new user success!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFail());
      }
    } catch (e) {
      dispatch(saveUserFail());
      console.log("saveUserFail Error", e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.SAVE_USER_SUCCESS,
});

export const saveUserFail = () => ({
  type: actionTypes.SAVE_USER_FAIL,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");

      if (res && res.status === "ok") {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFail());
      }
    } catch (e) {
      dispatch(fetchAllUserFail());
      console.log("fetchAllUserStart Error", e);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUserFail = () => ({
  type: actionTypes.FETCH_ALL_USER_FAIL,
});

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.status === "ok") {
        toast.success("Delete user success!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete error!");
        dispatch(deleteUserFail());
      }
    } catch (e) {
      toast.error("Delete error!");
      dispatch(deleteUserFail());
      console.log("saveUserFail Error", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.status === "ok") {
        toast.success("Edit user success!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Edit error!");
        dispatch(editUserFail());
      }
    } catch (e) {
      toast.error("Edit error!");
      dispatch(editUserFail());
      console.log("saveUserFail Error", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFail = () => ({
  type: actionTypes.EDIT_USER_FAIL,
});

export const fetchTopDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.status == "ok") {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTORS_FAIL", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAIL,
      });
    }
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorService();
      if (res && res.status == "ok") {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          doctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_DOCTORS_FAIL", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
      });
    }
  };
};

export const saveDetailsDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createDoctorInfoService(data);
      if (res && res.status == "ok") {
        toast.success("Save doctor information success!");

        dispatch({
          type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save doctor information error!");

        dispatch({
          type: actionTypes.SAVE_INFO_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      toast.error("Save doctor information error!");

      console.log("SAVE_INFO_DOCTOR_FAIL", e);
      dispatch({
        type: actionTypes.SAVE_INFO_DOCTOR_FAIL,
      });
    }
  };
};

export const fetchTimeSchedule = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.status === "ok") {
        dispatch({
          type: actionTypes.FETCH_TIME_ALLCODE_SUCCESS,
          timeData: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TIME_ALLCODE_FAIL,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_TIME_ALLCODE_FAIL,
      });
      console.log("FETCH_TIME_ALLCODE_FAIL Error", e);
    }
  };
};

export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_INFO_START });

      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllMedicalSpecialty();
      let resClinic = await getAllClinic();
      if (
        resPrice &&
        resPrice.status === "ok" &&
        resPayment &&
        resPayment.status === "ok" &&
        resProvince &&
        resProvince.status === "ok" &&
        resSpecialty &&
        resSpecialty.status === "ok" &&
        resClinic &&
        resClinic.status === "ok"
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInfoFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log("fetchGenderStart Error", e);
    }
  };
};
export const fetchRequiredDoctorInfoSuccess = (data) => ({
  type: actionTypes.FETCH_REQUIRED_INFO_SUCCESS,
  data,
});

export const fetchRequiredDoctorInfoFail = () => ({
  type: actionTypes.FETCH_REQUIRED_INFO_FAIL,
});
