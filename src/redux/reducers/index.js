import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import userListReducer from './userListReducer';
import locationReducer from './locationReducer';
import onSiteReducer from './onsiteReducer';
import genderReducer from './genderReducer';
import categoryReducer from './categoryReducer';
import adminLocationReducer from './adminLocationReducer';
import ageReducer from './ageReducer';
import raceReducer from './raceReducer';
import subCategoryReducer from './subCategoryReducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  userListReducer,
  locationReducer,
  onSiteReducer,
  genderReducer, 
  categoryReducer,
  adminLocationReducer,
  ageReducer,
  raceReducer,
  subCategoryReducer,
});

export default rootReducer;
