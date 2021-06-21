import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { ROOT_URL } from '../Credentials';
import qs from 'qs';
import {
  REGISTER_DATA,
  REGISTER_PROCESSING,
  SMS_OVERLAY,
  REGISTER_OVERLAY,
  REGISTER_ERROR,
  SMS_CODE_INCORRECT
} from './type';

export const register = (
  name,
  email,
  password,
  confirm_password,
  country_code,
  phone_number,
  role
) => {
  return dispatch => {
    let data = {
      name,
      email,
      password,
      confirm_password,
      country_code,
      phone_number,
      role
    };

    let params = qs.stringify(data);

    console.log('qsStringified: ' + params);

    dispatch({
      type: REGISTER_PROCESSING,
      payload: true
    });

    axios
      .get(`${ROOT_URL}register/${params}`)
      .then(response => {
        console.log('response: ' + JSON.stringify(response.data));

        if (JSON.stringify(response.data).includes('success')) {
          const user_data = response.data.success.original;

          dispatch({
            type: REGISTER_DATA,
            payload: user_data
          });

          dispatch({
            type: SMS_OVERLAY,
            payload: true
          });
        } else if (JSON.stringify(response.data).includes('error')) {
          dispatch({
            type: REGISTER_ERROR,
            payload: response.data.error
          });
        }

        dispatch({
          type: REGISTER_PROCESSING,
          payload: false
        });
      })
      .catch(error => {
        console.log('Error: ' + error);

        dispatch({
          type: REGISTER_PROCESSING,
          payload: false
        });
      });
  };
};

export const verifyNumber = (country_code, phone_number, code, user_data) => {
  return dispatch => {
    let data = {
      country_code,
      phone_number,
      code
    };

    let params = qs.stringify(data);

    console.log('verifyNumberString: ' + params);

    axios
      .get(`${ROOT_URL}verifiednumber/${params}`)
      .then(response => {
        console.log('verifiednumber: ' + JSON.stringify(response.data));

        if (JSON.stringify(response.data).includes('success')) {
          _registerAsync(user_data);

          dispatch({
            type: SMS_OVERLAY,
            payload: false
          });

          dispatch({
            type: REGISTER_OVERLAY,
            payload: true
          });
        } else if (JSON.stringify(response.data).includes('error')) {
          dispatch({
            type: SMS_CODE_INCORRECT,
            payload: response.data.error
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const resendVerificationCode = (country_code, phone_number) => {
  return dispatch => {
    let data = {
      country_code,
      phone_number
    };

    let params = qs.stringify(data);

    console.log('resendVerificationCode: ' + params);

    axios
      .get(`${ROOT_URL}resendVerificationCode/${params}`)
      .then(response => {
        console.log('resendVerificationCode: ' + JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

const _registerAsync = async user_data => {
  try {
    //console.log('user data saved');
    await AsyncStorage.setItem('user_data', JSON.stringify(user_data));
  } catch (error) {
    console.log('Error saving data: ' + error);
  }
};

/*export const registerProcess = status => {
  return {
    type: REGISTER_PROCESSING,
    payload: status
  };
};*/

export const setOverlay = status => {
  return { type: REGISTER_OVERLAY, payload: status };
};

export const setRegisterError = message => {
  return {
    type: REGISTER_ERROR,
    payload: message
  };
};

export const setSmsError = message => {
  return {
    type: SMS_CODE_INCORRECT,
    payload: message
  };
};
