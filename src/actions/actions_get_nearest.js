import axios from 'axios';
import qs from 'qs';
import { ROOT_URL } from '../Credentials';
//import { SEARCH_DRIVER_OVERLAY, ASSIGN_DRIVER } from './type';

export const getNearest = (lat, lon) => {
  return dispatch => {
    let data = {
      lat,
      lon
    };

    let params = qs.stringify(data);

    console.log('getNearest: ' + JSON.stringify(params));

    axios
      .get(`${ROOT_URL}getNearest/${params}`)
      .then(response => {
        console.log('getNearest: ' + JSON.stringify(response.data));

        // this method only get nearest driver rather than confirming assigned driver
        /* if(JSON.stringify(response.data) !== '') {
          this.userGetOrder(dispatch);
        } */
      })
      .catch(error => {
        console.log('Error: ' + error);
      });
  };
};

export const userGetOrder = dispatch => {
  axios
    .get(`${ROOT_URL}userGetOrder`)
    .then(response => {
      console.log('userGetOrder' + JSON.stringify(response.data));
    })
    .catch(error => {
      console.log('Error userGetOrder: ' + error);
    });
};

/* export const getNearestSecond = (lat, lon) => {
  return dispatch => {
    let params = {
      lat,
      lon
    };

    console.log('getNearestSecond: ' + JSON.stringify(params));

    axios
      .get(`${ROOT_URL}getNearestSecond/${params}`)
      .then(response => {
        console.log('getNearestSecond: ' + JSON.stringify(response.data));
      })
      .catch(error => {
        console.log('Error: ' + error);
      });
  };
}; */
