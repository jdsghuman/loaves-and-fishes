import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import swal from "sweetalert";


function* fetchSubCategory() {
    try {
        const response = yield axios.get('/api/subcategory');
        yield put({ type: 'SET_SUB_CATEGORY', payload: response.data });
    } catch (error) {
    }
}

function* postSubCategory(action) {
    try {
        yield axios.post('/api/subcategory', action.payload);
        yield put({ type: 'FETCH_SUB_CATEGORY' });
        swal({
            title: "Successfully submitted!",
            text: "Sub Category will display in the drop down menu when adding a new Oulet Category.",
            icon: "success",
            button: "Ok"
        });
    } catch (error) {
    }
}

function* deleteSubCategory(action) {
    try {
        yield axios.delete(`/api/subcategory/${action.payload}`);
        yield put({ type: 'FETCH_SUB_CATEGORY' });
        swal("Deleted!", "Sub Category has been deleted!", "success");
    } catch (error) {
        swal({
            title: "Error",
            text: "Sub Category not deleted. Sub Category is linked to an Outlet Category. Please make sure to unlink the Sub Category from the Outlet Category to None in order to delete!",
            icon: "warning",
            button: "Ok"
        });
    }
}

function* updateSubCategory(action) {
    try {
        const response = yield axios.put(`/api/subcategory/${action.payload.id}`, action.payload);
        if(response) {
            swal({
                title: `Updated Sub Category!`,
                text: "Sub Category successfully updated.",
                icon: "success",
                buttons: "Ok",
            })
        } 
        yield put({ type: 'FETCH_SUB_CATEGORY' });
    } catch (error) {
        swal({
            title: "Error",
            text: "Sub Category not updated!",
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