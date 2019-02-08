const allMealReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ALL_MEALS':
            return action.payload;
        default:
            return state;
    }
};


export default allMealReducer;