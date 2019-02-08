import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* addMealCount(action) {
  try {
    yield axios.post('/api/count', action.payload);
  } catch(error) {
    console.log(`Error adding meal count ${error}`);
  } 
}

function* mealCountSaga() {
  yield takeEvery('ADD_MEAL_COUNT', addMealCount);
}

export default mealCountSaga;