const dashboardMonthly = (state = [], action) => {
    switch (action.type) {
        case 'SET_DASHBOARD_COUNT_MONTHLY':
            return action.payload;
        default:
            return state;
    }
};


export default dashboardMonthly;