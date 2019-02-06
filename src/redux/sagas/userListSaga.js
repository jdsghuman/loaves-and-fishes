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

function* deleteUsers(action) {
    try{
        yield axios.delete(`/api/userList/${action.payload}`);
        yield put({ type: 'FETCH_USER_LIST' });
        yield put({ type: 'FETCH_USER', payload: action.payload.user });

    }catch (error){
        console.log('delete saga failed for USERS', error);
    }
}

function* editUsers(action) {
    console.log('editUsers');
    try{
        yield axios.put(`/api/userList/${action.payload.id}`, action.payload );
        yield put({ type: 'FETCH_USER_LIST' });
    }catch (error) {
        console.log('problem with edit saga', error)
    }
}

function* userListSaga() {
    yield takeEvery('FETCH_USER_LIST', fetchUserList);
    yield takeEvery('DELETE_USERS', deleteUsers);
    yield takeEvery('EDIT_USERS', editUsers);
}

export default userListSaga;