import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import swal from 'sweetalert';


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

function* fetchLocationOutlet() {
    try {
        const response = yield axios.get('api/location/locationoutlet');
        yield put({ type: 'SET_LOCATION_OUTLET', payload: response.data });
    } catch(error) {
        console.log(`Error on loation_outlet ${error}`);
    }
}

function* fetchActiveLocations() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/location/active', config);
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

function* updateLocation(action) {
    try {
        yield axios.put('api/location/:id', action.payload);
        yield put({ type: 'FETCH_ADMIN_LOCATION' });
        yield put({ type: 'FETCH_LOCATION_OUTLET'});
        swal({
            title: `Updated Location!`,
            text: "Location successfully updated!",
            icon: "success",
            buttons: "Ok",
        })
    } catch(error) {
        console.log(`Error in update location ${error}`);
    }
}

function* updateOutletLocation(action) {
    try {
        yield axios.put('api/location/locationoutlet/:id', action.payload);
    } catch(error) {
        console.log(`Error update outlet location ${error}`);
    } 
}

function* locationSaga() {
    yield takeEvery('FETCH_LOCATIONS', fetchLocations);
    yield takeEvery('SET_LAST_LOCATION', addLastLocation);
    yield takeEvery('FETCH_ACTIVE_LOCATIONS', fetchActiveLocations);
    yield takeEvery('FETCH_LOCATION_OUTLET', fetchLocationOutlet);
    yield takeEvery('UPDATE_LOCATION', updateLocation);
    yield takeEvery('UPDATE_OUTLET_LOCATION', updateOutletLocation);
}

export default locationSaga;