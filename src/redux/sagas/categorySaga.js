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

function* postNewCategory(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.post('/api/category', action.payload);
        yield put({ type: 'FETCH_NEW_CATEGORY' });
    } catch (error) {
        console.log(' POST request failed', error);
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
    yield takeEvery('ADD_NEW_CATEGORY', postNewCategory);
    yield takeEvery('DELETE_CATEGORY_OUTLET', deleteCategories);
}

export default categorySaga;