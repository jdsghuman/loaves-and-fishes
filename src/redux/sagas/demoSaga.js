import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchGender() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/onsite/gender', config);
        yield put({ type: 'SET_GENDER', payload: response.data });
    } catch (error) {
        console.log('gender GET request failed', error);
    }
}

function* fetchRace() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/onsite/race', config);
        yield put({ type: 'SET_RACE', payload: response.data });
    } catch (error) {
        console.log('race GET request failed', error);
    }
}

function* fetchAge() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/onsite/age', config);
        yield put({ type: 'SET_AGE', payload: response.data });
    } catch (error) {
        console.log('age GET request failed', error);
    }
}

function* postDemo(action) {
    try {
        yield axios.post('/api/onsite', action.payload);
        yield put({ type: 'FETCH_GENDER' });
        yield put({ type: 'FETCH_RACE' });
        yield put({ type: 'FETCH_AGE' });
    } catch (error) {
        console.log('demo POST request failed', error);
    }
}

function* demoSaga() {
    yield takeEvery('FETCH_GENDER', fetchGender);
    yield takeEvery('FETCH_RACE', fetchRace);
    yield takeEvery('FETCH_AGE', fetchAge);
    yield takeEvery('ADD_DEMO', postDemo);
}

export default demoSaga;