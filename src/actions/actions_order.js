import axios from 'axios';
import { ROOT_URL } from '../Credentials';
import { SEARCH_DRIVER_OVERLAY, ASSIGN_DRIVER } from './type';

export const getPriceRate = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}getPriceRate`)
      .then(response => {
        console.log('getPriceRate: ' + JSON.stringify(response.data.PriceRate));
      })
      .catch(error => {
        console.log('Error: ' + error);
      });
  };
};

export const searchDriverOverlay = value => {
  return {
    type: SEARCH_DRIVER_OVERLAY,
    payload: value
  };
};

// Assign Driver action *temporary demo function
export const assignDriver = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: ASSIGN_DRIVER,
        payload: true
      });
    }, 10000);
  };
};

// Set assign driver status
export const setAssignDriverStatus = bool => {
  return {
    type: ASSIGN_DRIVER,
    payload: bool
  };
};
