const reportMealReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_REPORT_MEALS':
            return action.payload;
        default:
            return state;
    }
};


export default reportMealReducer;