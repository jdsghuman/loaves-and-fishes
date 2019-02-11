const subCategoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SUB_CATEGORY':
            return action.payload;
        default:
            return state;
    }
};

export default subCategoryReducer;