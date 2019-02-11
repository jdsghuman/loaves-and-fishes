import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchSubCategory() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/subcategory', config);
        yield put({ type: 'SET_SUB_CATEGORY', payload: response.data });
    } catch (error) {
        console.log('subCategory GET request failed', error);
    }
}

function* postSubCategory(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.post('/api/subcategory', action.payload);
        yield put({ type: 'FETCH_SUB_CATEGORY' });
    } catch (error) {
        console.log('subCategory POST request failed', error);
    }
}

function* subCategorySaga() {
    yield takeEvery('FETCH_SUB_CATEGORY', fetchSubCategory);
    yield takeEvery('ADD_SUB_CATEGORY', postSubCategory);
}

export default subCategorySaga;