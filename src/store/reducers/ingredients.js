import {FETCH_INGREDIENTS, PUT_INGREDIENTS} from "../actionTypes";

const initialState = {
    ingredients: null,
    isFetching: false,
};

const ingredients = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INGREDIENTS : {
            return {
                ...state,
                isFetching: true,
            };
        }
        case  PUT_INGREDIENTS : {
            return {
                ...state,
                isFetching: false,
                ingredients: action.payload.ingredients,
            };
        }
        default: {
            return state;
        }
    }
};

export default ingredients;
