import {SIGN_IN_FAIL, SIGN_IN_SUCCESS, SIGN_IN_VALIDATION, SIGN_OUT} from "../actionTypes";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    userId: null,
    isFetching: false,
    errorMessage: null,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_VALIDATION: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case SIGN_IN_SUCCESS : {
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                userId: action.payload.userId,
                isFetching: false,
            };
        }
        case  SIGN_IN_FAIL : {
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                userId: null,
                isFetching: false,
                errorMessage: action.payload.errorMessage,
            };
        }
        case  SIGN_OUT : {

            return {
                token: null,
                isAuthenticated: null,
                userId: null,
                isFetching: false,
            };
        }
        default: {
            return state;
        }
    }
};

export default auth;