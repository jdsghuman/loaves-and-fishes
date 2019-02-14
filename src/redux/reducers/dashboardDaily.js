const dashboardDaily = (state = [], action) => {
    switch (action.type) {
        case 'SET_DASHBOARD_COUNT_DAILY':
            return action.payload;
        default:
            return state;
    }
};


export default dashboardDaily;