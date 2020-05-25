import {
  EMAIL_MATCH, AUTH_FAIL, AUTH_SUCCESS, SIGN_IN_VALIDATION, SIGN_OUT, SIGN_UP, OAUTH_TOKEN_VERIFICATION,
} from "../actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
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
    case OAUTH_TOKEN_VERIFICATION: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        isFetching: false,
      };
    }
    case AUTH_FAIL: {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isFetching: false,
        signInErrorMessage: true,
      };
    }
    case SIGN_OUT: {
      return {
        token: null,
        isAuthenticated: false,
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
