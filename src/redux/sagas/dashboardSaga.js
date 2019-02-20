import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchDashboardCountDaily() {
    try {
        const response = yield axios.get('/api/dashboard');
        yield put({ type: 'SET_DASHBOARD_COUNT_DAILY', payload: response.data });
    } catch (error) {
    }
}
function* fetchDashboardCountMonthly() {
    try {
        const response = yield axios.get('/api/dashboard/monthly');
        yield put({ type: 'SET_DASHBOARD_COUNT_MONTHLY', payload: response.data });
    } catch (error) {
    }
}


function* dashboardSaga() {
    yield takeEvery('FETCH_DASHBOARD_COUNT_DAILY', fetchDashboardCountDaily);
    yield takeEvery('FETCH_DASHBOARD_COUNT_MONTHLY', fetchDashboardCountMonthly);
}

export default dashboardSaga;