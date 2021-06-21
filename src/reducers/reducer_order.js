import { ASSIGN_DRIVER } from '../actions/type';

const INITIAL_STATE = {
  assigned_driver: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ASSIGN_DRIVER:
      return { ...state, assigned_driver: action.payload };
    default:
      return state;
  }
};
