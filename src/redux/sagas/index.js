import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import userListSaga from './userListSaga';
import locationSaga from './locationSaga';
import demoSaga from './demoSaga';
import mealCountSaga from './mealCountSaga';
import categorySaga from './categorySaga';
import adminLocationSaga from './adminLocationSaga';
import subCategorySaga from './subCategorySaga';
import reportSaga from './reportSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    userListSaga(),
    locationSaga(),
    demoSaga(),
    mealCountSaga(),
    categorySaga(),
    adminLocationSaga(),
    subCategorySaga(),
    reportSaga(),
  ]);
}
