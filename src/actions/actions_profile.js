import axios from 'axios';
import qs from 'qs';
import { ROOT_URL } from '../Credentials';
import { UPDATE_USER_PROFILE } from './type';

export const updateUserProfile = (user_id, username) => {
  return dispatch => {
    let data = {
      user_id,
      username,
      fullname: '',
      birthdate: ''
    };

    let params = qs.stringify(data);

    console.log('Stringified: ' + params);

    axios
      .get(`${ROOT_URL}updateUserProfile/${params}`)
      .then(response => {
        console.log('updateUserProfile: ' + JSON.stringify(response));
      })
      .catch(error => {
        console.log('Error: ' + error);
      });
  };
};

export const updateProfilePicture = (user_id, picture) => {
  return dispatch => {
    let data = {
      user_id,
      picture
    };

    let params = qs.stringify(data);

    console.log('Stringified: ' + params);

    axios
      .get(`${ROOT_URL}updateProfilePicture/${params}`)
      .then(response => {
        console.log('updateProfilePicture: ' + JSON.stringify(response));
      })
      .catch(error => {
        console.log('Error: ' + error);
      });
  };
};
