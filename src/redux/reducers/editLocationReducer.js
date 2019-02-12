const editLocationReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_EDIT_LOCATION':
            return action.payload;
        default:
            return state;
    }
};

export default editLocationReducer;