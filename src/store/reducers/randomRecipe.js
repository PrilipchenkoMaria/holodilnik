import {SET_RANDOM_RECIPE} from "../actionTypes";

const initialState = {
    recipe: null,
};

const randomRecipe = (state = initialState, action) => {
    switch (action.type) {
        case  SET_RANDOM_RECIPE : {
            return {
                ...state,
                recipe: action.payload.recipe,
            };
        }
        default: {
            return state;
        }
    }
};

export default randomRecipe;
