import { combineReducers } from 'redux';
import loginReducer from './reducer_login';
import registerReducer from './reducer_register';
import paymentTypeReducer from './reducer_payment_type';
import settingsReducer from './reducer_settings';
import notificationReducer from './reducer_notifications';
import historyReducer from './reducer_history';
import countryCodeReducer from './reducer_country_code';
import profileReducer from './reducer_profile';
import coordinateReducer from './reducer_coordinates';
import orderReducer from './reducer_order';

export default combineReducers({
  loginReducer,
  registerReducer,
  paymentTypeReducer,
  settingsReducer,
  notificationReducer,
  historyReducer,
  countryCodeReducer,
  profileReducer,
  coordinateReducer,
  orderReducer
});
