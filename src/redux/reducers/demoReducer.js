const demoReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENDER':
            return action.payload;
        case 'SET_RACE':
            return action.payload;
        case 'SET_AGE':
            return action.payload;
        default:
            return state;
    }
};


export default demoReducer;