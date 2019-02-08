import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* addMealCount(action) {
  try {
    yield axios.post('/api/count', action.payload);
  } catch (error) {
    console.log(`Error adding meal count ${error}`);
  }
}

function* fetchAllMeals(action) {
  try {
    const config = {
      params : action.payload
    }
    const response = yield axios.get(`/api/report/all`, config)
    yield put({ type: 'SET_ALL_MEALS', payload: response.data });
  } catch (error) {
    console.log(`Error getting all meals ${error}`);
  }
}

function* mealCountSaga() {
  yield takeEvery('ADD_MEAL_COUNT', addMealCount);
  yield takeEvery('FETCH_ALL_MEALS', fetchAllMeals);
}

export default mealCountSaga;