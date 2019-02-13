import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import swal from "sweetalert";


function* fetchCategory() {
    try {
        const response = yield axios.get('/api/category');
        yield put({ type: 'SET_CATEGORY_OUTLET', payload: response.data });
    } catch (error) {
        console.log('category get request failed', error);
    }
}

function* postNewCategory(action) {
    try {
        yield axios.post('/api/category', action.payload);
        yield put({ type: 'FETCH_NEW_CATEGORY' });
        swal({
            title: "Successfully submitted!",
            text: "New outlet category has been added!",
            icon: "success",
            button: "Ok"
        });
    } catch (error) {
        console.log(' POST request failed', error);
    }
}


function* deleteCategories(action) {
    try{
        yield axios.delete(`/api/category/${action.payload}`);
        yield put({ type: 'FETCH_CATEGORY_OUTLET' });
    }catch (error){
        console.log('delete saga failed for CATEGORIES', error);
    }
}

function* editCategory(action) {
    try {
        const response = yield axios.put(`/api/category/${action.payload.id}`, action.payload);
        if (response) {
            swal({
                title: `Updated Category!`,
                text: "Category successfully updated.",
                icon: "success",
                buttons: "Ok",
            })
        }
        yield put({ type: 'FETCH_SUB_CATEGORY' });
    } catch (error) {
        console.log(`Error with edit sub category saga ${error}`);
        swal({
            title: "Error",
            text: "Category not updated!",
            icon: "warning",
            button: "Ok"
        });
    }
}

function* categorySaga() {
    yield takeEvery('FETCH_CATEGORY_OUTLET', fetchCategory);
    yield takeEvery('ADD_NEW_CATEGORY', postNewCategory);
    yield takeEvery('DELETE_CATEGORY_OUTLET', deleteCategories);
    yield takeEvery('EDIT_CATEGORY', editCategory);
}

export default categorySaga;