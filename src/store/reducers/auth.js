import {
  EMAIL_MATCH, SIGN_IN_FAIL, SIGN_IN_SUCCESS, SIGN_IN_VALIDATION, SIGN_OUT, SIGN_UP,
} from "../actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  userId: null,
  isFetching: false,
  signInErrorMessage: null,
  signUpErrorMessage: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_VALIDATION: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userId: action.payload.userId,
        isFetching: false,
      };
    }
    case SIGN_IN_FAIL: {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        userId: null,
        isFetching: false,
        signInErrorMessage: true,
      };
    }
    case SIGN_OUT: {
      return {
        token: null,
        isAuthenticated: null,
        userId: null,
        isFetching: false,
      };
    }
    case SIGN_UP: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case EMAIL_MATCH: {
      return {
        signUpErrorMessage: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
