import { OPEN_INGREDIENT_MODAL, CLOSE_MODAL } from "../actionTypes";

const initialState = {
  isVisible: false,
  text: null,
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL: {
      return {
        text: "Необходимо добавить минимум один ингридиент",
        isVisible: true,
      };
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
