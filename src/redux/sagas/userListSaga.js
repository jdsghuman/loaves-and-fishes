import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import swal from "sweetalert";

function* fetchUserList() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/userList', config);
        yield put({ type: 'SET_USER_LIST', payload: response.data });
    } catch (error) {
    }
}

function* deleteUsers(action) {
    try {
        const response = yield axios.delete(`/api/userList/${action.payload}`);
        if(response) {
            swal("Deleted!", "User has been deleted!", "success");
        }
        yield put({ type: 'FETCH_USER_LIST' });
        yield put({ type: 'FETCH_USER', payload: action.payload });

    } catch (error) {
    }
}

function* editUsers(action) {
    try {
        const response = yield axios.put(`/api/userList/${action.payload.id}`, action.payload);
        if (response) {
            swal({
                title: `Updated User!`,
                text: "User successfully updated!",
                icon: "success",
                buttons: "Ok",
            })
        }
        yield put({ type: 'FETCH_USER_LIST' });
    } catch (error) {
        swal({
            title: "Error",
            text: "User is not updated!",
            icon: "warning",
            button: "Ok"
        });
    }
}

function* userListSaga() {
    yield takeEvery('FETCH_USER_LIST', fetchUserList);
    yield takeEvery('DELETE_USERS', deleteUsers);
    yield takeEvery('EDIT_USER', editUsers);
}

export default userListSaga;