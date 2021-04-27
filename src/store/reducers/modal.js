import { OPEN_MODAL, CLOSE_MODAL } from "../actionTypes";

const initialState = {
  isVisible: false,
  text: null,
  type: "message",
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return { isVisible: true, ...action.payload };
    }
    case CLOSE_MODAL: {
      return {
        isVisible: false,
        text: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default modal;
