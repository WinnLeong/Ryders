import { LOGIN_PROCESSING, LOGIN_ERROR } from '../actions/type';

const INITIAL_STATE = {
  email_error: '',
  password_error: '',
  login_error: '',
  login_process: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_PROCESSING:
      return { ...state, login_process: action.payload };
    case LOGIN_ERROR:
      return { ...state, login_error: action.payload };
    default:
      return state;
  }
};
