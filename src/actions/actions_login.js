import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { ROOT_URL } from '../Credentials';
import qs from 'qs';
import { LOGIN_ERROR, LOGIN_PROCESSING } from './type';

export const login = (email, password, navigation) => {
  return dispatch => {
    let data = {
      email,
      password
    };

    let params = qs.stringify(data);

    //console.log('Stringified: ' + params);

    dispatch({
      type: LOGIN_PROCESSING,
      payload: true
    });

    axios
      .get(`${ROOT_URL}login/${params}`)
      .then(response => {
        //console.log('Login: ' + JSON.stringify(response));

        if (JSON.stringify(response.data).includes('success')) {
          const user_data = response.data.success.original;

          _signInAsync(user_data);

          navigation.navigate('App');
        } else if (JSON.stringify(response.data).includes('error')) {
          dispatch({
            type: LOGIN_ERROR,
            payload: response.data.error
          });
        }

        dispatch({ type: LOGIN_PROCESSING, payload: false });
      })
      .catch(error => {
        console.log(JSON.stringify(error));

        dispatch({
          type: LOGIN_ERROR,
          payload: error
        });

        dispatch({
          type: LOGIN_PROCESSING,
          payload: false
        });
      });
  };
};

const _signInAsync = async user_data => {
  try {
    //console.log('user data saved');
    await AsyncStorage.setItem('user_data', JSON.stringify(user_data));
  } catch (error) {
    console.log('Error saving data: ' + error);
  }
};

export const setLoginError = message => {
  return {
    type: LOGIN_ERROR,
    payload: message
  };
};
