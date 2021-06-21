import axios from 'axios';
import { ROOT_URL } from '../Credentials';
import { COUNTRY_CODE } from './type';

export const showCountryCode = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}showCountryCode`)
      .then(response => {
        console.log(response);

        dispatch({
          type: COUNTRY_CODE,
          payload: response
        });
      })
      .catch(error => {
        console.log('Error: ' + error);
      });
  };
};
