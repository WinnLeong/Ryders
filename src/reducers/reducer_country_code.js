import { COUNTRY_CODE } from '../actions/type';

const INITIAL_STATE = {
  country_code: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COUNTRY_CODE:
      return { ...state, country_code: action.payload };
    default:
      return state;
  }
};
