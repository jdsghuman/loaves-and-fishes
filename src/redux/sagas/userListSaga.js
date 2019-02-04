import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchUserList() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/userList', config);
        yield put({ type: 'SET_USER_LIST', payload: response.data });
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* userListSaga() {
    yield takeEvery('FETCH_USER_LIST', fetchUserList);
}

export default userListSaga;