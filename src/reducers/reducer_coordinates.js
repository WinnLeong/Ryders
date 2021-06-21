import { USER_COORD } from '../actions/type';

const INITIAL_STATE = {
  user_coord: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_COORD:
      return { ...state, user_coord: action.payload };
    default:
      return state;
  }
};
