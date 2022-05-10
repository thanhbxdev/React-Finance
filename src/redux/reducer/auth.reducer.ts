import { ACCESS_TOKEN_KEY } from '../../constants';
import { AnyAction } from 'redux';
import { Account } from '../../commons/interface/schemas/Account';

export const AUTH_TYPES = {
  LOGIN: '[Auth] login',
  LOGOUT: '[Auth] logout',
};

export interface AuthReducer {
  isLoggedIn: boolean;
  user: Account | null;
}

const initialState: AuthReducer = { isLoggedIn: false, user: null };

export const authLogin = (isLoggedIn: boolean, user: Account) => ({
  type: AUTH_TYPES.LOGIN,
  payload: { isLoggedIn, user },
});

export const authLogout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  return {
    type: AUTH_TYPES.LOGOUT,
    payload: null,
  };
};

export default function authReducer(state = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_TYPES.LOGIN:
      return {
        ...state,
        isLoggedIn: payload.isLoggedIn,
        user: payload.user,
      };
    case AUTH_TYPES.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
