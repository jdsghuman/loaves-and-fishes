const adminLocationReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN_LOCATION':
            return action.payload;
        default:
            return state;
    }
};


export default adminLocationReducer;