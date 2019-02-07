import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchCategory() {
    try {
        const response = yield axios.get('/api/category');
        yield put({ type: 'SET_CATEGORY_OUTLET', payload: response.data });
    } catch (error) {
        console.log('category get request failed', error);
    }
}


function* deleteCategories(action) {
    try{
        yield axios.delete(`/api/category/${action.payload}`);
        yield put({ type: 'FETCH_CATEGORY_OUTLET' });
    }catch (error){
        console.log('delete saga failed for CATEGORIES', error);
    }
}


function* categorySaga() {
    yield takeEvery('FETCH_CATEGORY_OUTLET', fetchCategory);
    yield takeEvery('DELETE_CATEGORY_OUTLET', deleteCategories);
}

export default categorySaga;