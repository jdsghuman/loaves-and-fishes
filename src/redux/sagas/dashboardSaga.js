import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchDashboardCount() {
    try {
        const response = yield axios.get('/api/template');
        yield put({ type: 'SET_DASHBOARD_COUNT_DAILY', payload: response.data });
    } catch (error) {
        console.log('User get request failed', error);
    }
}


function* dashboardSaga() {
    yield takeEvery('FETCH_DASHBOARD_COUNT', fetchDashboardCount);
}

export default dashboardSaga;