import { FETCH_INGREDIENTS, PUT_INGREDIENTS, PUT_INGREDIENTS_FILTER } from "../actionTypes";

const initialState = {
    ingredients: null,
    isFetching: false,
    filterCondition: null,
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
        case PUT_INGREDIENTS_FILTER : {
            return {
                ...state,
                filterCondition: action.payload.string,
            };
        }
        default: {
            return state;
        }
    }
};

export default ingredients;
