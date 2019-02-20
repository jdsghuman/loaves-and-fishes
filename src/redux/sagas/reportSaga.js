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
    }
}

function* fetchDemoGender(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demogender`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* fetchDemoRace(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demorace`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* fetchDemoAge(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demoage`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* fetchDemoGenderRace(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demogenderrace`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* fetchDemoGenderAge(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demogenderage`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* fetchDemoGenderRaceAge(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demogenderraceage`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* fetchDemoLocationGender(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demolocationgender`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* fetchDemoLocationRace(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demolocationrace`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* fetchDemoLocationAge(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demolocationage`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* fetchDemoLocationGenderRace(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demolocationgenderrace`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* fetchDemoLocationGenderAge(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demolocationgenderage`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* fetchDemoLocationGenderRaceAge(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demolocationgenderraceage`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* fetchDemoRaceAge(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demoraceage`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* fetchDemoLocationRaceAge(action) {
    try {
        const config = {
            params: action.payload
        }
        const response = yield axios.get(`/api/report/demolocationraceage`, config)
        yield put({ type: 'SET_REPORT_MEALS', payload: response.data });
    } catch (error) {
    }
}

function* reportSaga() {
    yield takeEvery('FETCH_TOTAL', fetchTotal);

    //All Meals
    yield takeEvery('FETCH_ALL_MEALS', fetchReportMeals);
    yield takeEvery('FETCH_LOCATION_MEALS', fetchLocationMeals);
    yield takeEvery('FETCH_CATEGORY_MEALS', fetchCategoryMeals);
    yield takeEvery('FETCH_LOCATION_CATEGORY_MEALS', fetchLocationCategoryMeals);

    //Farm Meals
    yield takeEvery('FETCH_ALL_FARM_MEALS', fetchFarmMeals);
    yield takeEvery('FETCH_LOCATION_FARM_MEALS', fetchLocationFarmMeals);
    yield takeEvery('FETCH_CATEGORY_FARM_MEALS', fetchCategoryFarmMeals);
    yield takeEvery('FETCH_LOCATION_CATEGORY_FARM_MEALS', fetchLocationCategoryFarmMeals);

    //Summer Meals
    yield takeEvery('FETCH_ALL_SUMMER_MEALS', fetchSummerMeals);
    yield takeEvery('FETCH_LOCATION_SUMMER_MEALS', fetchLocationSummerMeals);
    yield takeEvery('FETCH_CATEGORY_SUMMER_MEALS', fetchCategorySummerMeals);
    yield takeEvery('FETCH_LOCATION_CATEGORY_SUMMER_MEALS', fetchLocationCategorySummerMeals);

    //Demographic Meals
    yield takeEvery('FETCH_DEMO_GENDER', fetchDemoGender);
    yield takeEvery('FETCH_DEMO_RACE', fetchDemoRace);
    yield takeEvery('FETCH_DEMO_AGE', fetchDemoAge);
    yield takeEvery('FETCH_DEMO_GENDER_RACE', fetchDemoGenderRace);
    yield takeEvery('FETCH_DEMO_GENDER_AGE', fetchDemoGenderAge);
    yield takeEvery('FETCH_DEMO_RACE_AGE', fetchDemoRaceAge);
    yield takeEvery('FETCH_DEMO_GENDER_RACE_AGE', fetchDemoGenderRaceAge);

    //Demographic with location
    yield takeEvery('FETCH_DEMO_LOCATION_GENDER', fetchDemoLocationGender);
    yield takeEvery('FETCH_DEMO_LOCATION_RACE', fetchDemoLocationRace);
    yield takeEvery('FETCH_DEMO_LOCATION_AGE', fetchDemoLocationAge);
    yield takeEvery('FETCH_DEMO_LOCATION_GENDER_RACE', fetchDemoLocationGenderRace);
    yield takeEvery('FETCH_DEMO_LOCATION_GENDER_AGE', fetchDemoLocationGenderAge);
    yield takeEvery('FETCH_DEMO_LOCATION_RACE_AGE', fetchDemoLocationRaceAge);
    yield takeEvery('FETCH_DEMO_LOCATION_GENDER_RACE_AGE', fetchDemoLocationGenderRaceAge);
}

export default reportSaga;