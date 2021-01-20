import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types';

export default function (state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: payload,
      };
    case REGISTER_USER:
      return {
        ...state,
        register: payload,
      };
    case AUTH_USER:
      return {
        ...state,
        userData: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
