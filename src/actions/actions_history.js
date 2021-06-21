import axios from 'axios';
import qs from 'qs';
import { ROOT_URL } from '../Credentials';

export const getOrderHistory = user_id => {
  return dispatch => {
    let data = {
      user_id,
      role: '1'
    };

    let params = qs.stringify(data);

    console.log('Stringified: ' + params);

    axios
      .get(`${ROOT_URL}getOrderHistory/${params}`)
      .then(response => {
        console.log('getOrderHistory: ' + response.data);
      })
      .catch(error => {
        console.log('Error: ' + error);
      });
  };
};
