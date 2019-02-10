import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchTotal(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/total`, config)
        yield put({ type: 'SET_TOTAL', payload: response.data });
    } catch (error) {
        console.log(`Error getting all meals ${error}`);
    }
}

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

function* fetchFarmMeals(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/allfarm`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
        console.log(`Error getting all location category meals ${error}`);
    }
}

function* fetchLocationFarmMeals(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/allfarmlocation`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
        console.log(`Error getting all location category meals ${error}`);
    }
}

function* fetchCategoryFarmMeals(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/allfarmcategory`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
        console.log(`Error getting all location category meals ${error}`);
    }
}

function* fetchLocationCategoryFarmMeals(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/allfarmlocationcategory`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
        console.log(`Error getting all location category meals ${error}`);
    }
}

function* fetchSummerMeals(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/allsummer`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
        console.log(`Error getting all location category meals ${error}`);
    }
}

function* fetchLocationSummerMeals(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/allsummerlocation`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
        console.log(`Error getting all location category meals ${error}`);
    }
}

function* fetchCategorySummerMeals(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/allsummercategory`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
        console.log(`Error getting all location category meals ${error}`);
    }
}

function* fetchLocationCategorySummerMeals(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/allsummerlocationcategory`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
        console.log(`Error getting all location category meals ${error}`);
    }
}

function* reportSaga() {
    yield takeEvery('FETCH_TOTAL', fetchTotal);

    yield takeEvery('FETCH_ALL_MEALS', fetchReportMeals);
    yield takeEvery('FETCH_LOCATION_MEALS', fetchLocationMeals);
    yield takeEvery('FETCH_CATEGORY_MEALS', fetchCategoryMeals);
    yield takeEvery('FETCH_LOCATION_CATEGORY_MEALS', fetchLocationCategoryMeals);

    yield takeEvery('FETCH_ALL_FARM_MEALS', fetchFarmMeals);
    yield takeEvery('FETCH_LOCATION_FARM_MEALS', fetchLocationFarmMeals);
    yield takeEvery('FETCH_CATEGORY_FARM_MEALS', fetchCategoryFarmMeals);
    yield takeEvery('FETCH_LOCATION_CATEGORY_FARM_MEALS', fetchLocationCategoryFarmMeals);

    yield takeEvery('FETCH_ALL_SUMMER_MEALS', fetchSummerMeals);
    yield takeEvery('FETCH_LOCATION_SUMMER_MEALS', fetchLocationSummerMeals);
    yield takeEvery('FETCH_CATEGORY_SUMMER_MEALS', fetchCategorySummerMeals);
    yield takeEvery('FETCH_LOCATION_CATEGORY_SUMMER_MEALS', fetchLocationCategorySummerMeals);
}

export default reportSaga;