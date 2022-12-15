import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allRequiredInfo: [],
};

const adminrReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.genders = [];
      state.isLoadingGender = false;
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      state.positions = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAIL:
      state.users = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_FAIL:
      state.topDoctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.doctors;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_FAIL:
      state.allDoctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_TIME_ALLCODE_SUCCESS:
      state.timeArr = action.timeData;
      return {
        ...state,
      };

    case actionTypes.FETCH_TIME_ALLCODE_FAIL:
      state.timeArr = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_INFO_SUCCESS:
      state.allRequiredInfo = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.allRequiredInfo = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminrReducer;
