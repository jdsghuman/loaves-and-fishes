const raceReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RACE':
            return action.payload;
        default:
            return state;
    }
};

export default raceReducer;