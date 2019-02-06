const onSiteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ONSITE':
            return action.payload;
        default:
            return state;
    }
};


export default onSiteReducer;