const ageReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_AGE':
            return action.payload;
        default:
            return state;
    }
};

export default ageReducer;