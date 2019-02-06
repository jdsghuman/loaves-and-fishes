import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchLocations() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/location', config);
        yield put({ type: 'SET_LOCATIONS', payload: response.data });
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* addLastLocation(action) {
    try {
        yield axios.put('/api/user/location', action.payload);
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* locationSaga() {
    yield takeEvery('FETCH_LOCATIONS', fetchLocations);
    yield takeEvery('SET_LAST_LOCATION', addLastLocation);
}

export default locationSaga;