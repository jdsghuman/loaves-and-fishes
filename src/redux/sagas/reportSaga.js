import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchReportMeals(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/all`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
        console.log(`Error getting all meals ${error}`);
    }
}

function* fetchLocationMeals(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/alllocation`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
        console.log(`Error getting all location meals ${error}`);
    }
}

function* fetchCategoryMeals(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/allcategory`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
        console.log(`Error getting all category meals ${error}`);
    }
}

function* fetchLocationCategoryMeals(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/alllocationcategory`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
        console.log(`Error getting all location category meals ${error}`);
    }
}

function* reportSaga() {
    yield takeEvery('FETCH_ALL_MEALS', fetchReportMeals);
    yield takeEvery('FETCH_LOCATION_MEALS', fetchLocationMeals);
    yield takeEvery('FETCH_CATEGORY_MEALS', fetchCategoryMeals);
    yield takeEvery('FETCH_LOCATION_CATEGORY_MEALS', fetchLocationCategoryMeals);
}

export default reportSaga;