import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('api/user/register', action.payload);
    swal({
      title: "Thank you for registering",
      text: "Upon approval you will receive an email and be able to log in, contact the administrator with any questions at 612-379-2346",
      dangerMode: true,
    })
      .then(willSubmit => {
        if (willSubmit) {
          // this.props.history.push('/home');
          swal("Submited!", "Account created!", "success");
        }
      });

    // // automatically log a user in after registration
    // yield put({ type: 'LOGIN', payload: action.payload });
    
    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({type: 'SET_TO_LOGIN_MODE'});
  } catch (error) {
      console.log('Error with user registration:', error);
      yield put({type: 'REGISTRATION_FAILED'});
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
