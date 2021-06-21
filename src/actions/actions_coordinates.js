import { USER_COORD } from './type';

export const saveUserCoord = (userLat, userLng) => {
  let userCoord = { userLat, userLng };

  return {
    type: USER_COORD,
    payload: userCoord
  };
};
