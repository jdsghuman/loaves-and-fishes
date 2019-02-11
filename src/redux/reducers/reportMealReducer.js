const reportMealReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_REPORT_MEALS':
            return action.payload;
        case 'CLEAR_REPORT_MEALS':
            return state = [];
        default:
            return state;
    }
};


export default reportMealReducer;