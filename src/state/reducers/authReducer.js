import Cookies from 'js-cookie';
import * as types from '../types/authTypes';

const initialState = {
  user: null,
  jwt: null,
  isAuthenticated: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.USER_DATA_SUCCESS:
      if (action.data.token) {
        Cookies.set('token', action.data.token);
      }
      return {
        ...state,
        user: action.data.user,
        isAuthenticated: true,
        token: action.data.token
      };

    case types.LOGOUT:
      Cookies.remove('token');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null
      };

    default:
      return state;
  }
}
