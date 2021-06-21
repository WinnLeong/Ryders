import {
  REGISTER_DATA,
  REGISTER_PROCESSING,
  SMS_OVERLAY,
  REGISTER_OVERLAY,
  REGISTER_ERROR,
  SMS_CODE_INCORRECT
} from '../actions/type';

const INITIAL_STATE = {
  register_process: false,
  overlayVisible: false,
  sms_overlay: false,
  user_data: '',
  sms_code_error: '',
  register_error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_PROCESSING:
      return { ...state, register_process: action.payload };
    case SMS_OVERLAY:
      return { ...state, sms_overlay: action.payload };
    case REGISTER_OVERLAY:
      return { ...state, overlayVisible: action.payload };
    case REGISTER_DATA:
      return { ...state, user_data: action.payload };
    case REGISTER_ERROR:
      return { ...state, register_error: action.payload };
    case SMS_CODE_INCORRECT:
      return { ...state, sms_code_error: action.payload };
    default:
      return state;
  }
};
