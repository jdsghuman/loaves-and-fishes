const dashboard = (state = [], action) => {
    switch (action.type) {
        case 'SET_COUNT':
            return action.payload;
        default:
            return state;
    }
};


export default dashboard;