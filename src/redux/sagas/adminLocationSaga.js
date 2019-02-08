import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchAdminLocation() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/location', config);
        yield put({ type: 'SET_ADMIN_LOCATION', payload: response.data });
    } catch (error) {
        console.log('fetchAdminLocation GET request failed', error);
    }
}

function* postAdminLocation(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.post('/api/location', action.payload);
        yield put({ type: 'FETCH_ADMIN_LOCATION' });
    } catch (error) {
        console.log('adminLocation POST request failed', error);
    }
}

function* deleteAdminLocation(action) {
    try{
        yield axios.delete(`/api/location/${action.payload}`);
        yield put({ type: 'FETCH_ADMIN_LOCATION' });
    }catch (error){
        console.log('delete saga failed for Location', error);
    }
}

function* adminLocationSaga() {
    yield takeEvery('FETCH_ADMIN_LOCATION', fetchAdminLocation);
    yield takeEvery('ADD_LOCATION', postAdminLocation);
    yield takeEvery('DELETE_ADMIN_LOCATION', deleteAdminLocation);
}

export default adminLocationSaga;