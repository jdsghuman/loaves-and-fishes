const categoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CATEGORY_OUTLET':
            return action.payload;
        default:
            return state;
    }
};


export default categoryReducer;