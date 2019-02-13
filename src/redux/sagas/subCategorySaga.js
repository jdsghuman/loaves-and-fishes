import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import swal from "sweetalert";


function* fetchSubCategory() {
    try {
        const response = yield axios.get('/api/subcategory');
        yield put({ type: 'SET_SUB_CATEGORY', payload: response.data });
    } catch (error) {
        console.log('subCategory GET request failed', error);
    }
}

function* postSubCategory(action) {
    try {
        yield axios.post('/api/subcategory', action.payload);
        yield put({ type: 'FETCH_SUB_CATEGORY' });
        swal({
            title: "Successfully submitted!",
            text: "Sub-Category will display in drop down when adding a new location.",
            icon: "success",
            button: "Ok"
        });
    } catch (error) {
        console.log('subCategory POST request failed', error);
    }
}

function* deleteSubCategory(action) {
    try {
        yield axios.delete(`/api/subcategory/${action.payload}`);
        yield put({ type: 'FETCH_SUB_CATEGORY' });
    } catch (error) {
        console.log('delete saga failed for SUB CATEGORY', error);
    }
}

function* updateSubCategory(action) {
    try {
        const response = yield axios.put(`/api/subcategory/${action.payload.id}`, action.payload);
        if(response) {
            swal({
                title: `Updated Sub Category`,
                text: "Sub Category successfully updated",
                icon: "success",
                buttons: "Ok",
            })
        } 
        yield put({ type: 'FETCH_SUB_CATEGORY' });
    } catch (error) {
        console.log(`Error with edit sub category saga ${error}`);
        swal({
            title: "Error",
            text: "Sub-Category not updated!",
            icon: "warning",
            button: "Ok"
        });
    }
}

function* subCategorySaga() {
    yield takeEvery('FETCH_SUB_CATEGORY', fetchSubCategory);
    yield takeEvery('ADD_SUB_CATEGORY', postSubCategory);
    yield takeEvery('DELETE_SUB_CATEGORY', deleteSubCategory);
    yield takeEvery('UPDATE_SUB_CATEGORY', updateSubCategory);
}

export default subCategorySaga;