import axios from 'axios';
import { takeEvery } from 'redux-saga/effects';

function* addMealCount(action) {
  try {
    yield axios.post('/api/count', action.payload);
  } catch (error) {
  }
}

function* addMealCountAdult(action) {
  try {
    yield axios.post('/api/count/adult', action.payload);
  } catch(error) {
  }
}

function* addMealCountChild(action) {
  try {
    yield axios.post('/api/count/child', action.payload);
  } catch(error) {
  }
}

function* mealCountSaga() {
  yield takeEvery('ADD_MEAL_COUNT', addMealCount);
  yield takeEvery('ADD_MEAL_COUNT_ADULT', addMealCountAdult);
  yield takeEvery('ADD_MEAL_COUNT_CHILD', addMealCountChild);
}

export default mealCountSaga;