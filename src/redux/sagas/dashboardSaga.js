import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchDashboardCount() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/template', config);
        yield put({ type: 'SET_COUNT', payload: response.data });
    } catch (error) {
        console.log('User get request failed', error);
    }
}


function* dashboardSaga() {
    yield takeEvery('FETCH_DASHBOARD_COUNT', fetchDashboardCount);
}

export default dashboardSaga;