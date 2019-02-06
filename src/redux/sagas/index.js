import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import userListSaga from './userListSaga';
import locationSaga from './locationSaga';
import demoSaga from './demoSaga';
import categorySaga from './categorySaga';

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
    categorySaga(),
  ]);
}
