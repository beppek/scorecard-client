import Cookies from 'js-cookie';

import * as API from '../../libs/API';
import * as types from '../types/authTypes';

export const logout = dispatch => dispatch => {
  dispatch({
    type: types.LOGOUT
  });
};

export const googleResponse = (res, dispatch) => dispatch => {
  const config = {
    method: 'POST',
    data: { id_token: res.tokenId },
    config: { headers: { 'Content-Type': 'application/json' } }
  };
  API.customCall('auth/google', config)
    .then(res => {
      dispatch({
        type: types.USER_DATA_SUCCESS,
        data: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: types.GOOGLE_AUTH_ERROR,
        error
      });
    });
};

export const loginFailed = (error, dispatch) =>
  dispatch({
    type: types.USER_DATA_ERROR,
    error
  });

export const checkCookie = dispatch => {
  const token = Cookies.get('token');
  if (token) {
    const config = {
      method: 'POST',
      data: { token },
      config: {
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token }
      }
    };
    API.customCall('auth/token', config)
      .then(res => {
        dispatch({
          type: types.USER_DATA_SUCCESS,
          data: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: types.USER_DATA_ERROR,
          error
        });
      });
  }
};

export const postTokenToAPI = (token, dispatch) => dispatch => {
  API.post('auth/facebook', { access_token: token })
    .then(res => {
      dispatch({
        type: types.USER_DATA_SUCCESS,
        data: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: types.USER_DATA_ERROR,
        error: err
      });
    });
};

export const facebookLogin = (FB, dispatch) => dispatch => {
  FB.login(
    res => {
      if (res.status === 'connected') {
        API.post('auth/facebook', {
          access_token: res.authResponse.accessToken
        })
          .then(res => {
            dispatch({
              type: types.USER_DATA_SUCCESS,
              data: res.data
            });
          })
          .catch(err => {
            dispatch({
              type: types.USER_DATA_ERROR,
              error: err
            });
          });
      }
    },
    { scope: 'email' }
  );
};

export const facebookLogout = (FB, dispatch) => dispatch => {
  FB.logout(res => {
    dispatch({
      type: types.LOGOUT_SUCCESS
    });
  });
};

export const checkFacebookLogin = (FB, dispatch) => dispatch => {
  FB.getLoginStatus(res => {
    if (res.status === 'connected') {
      API.post('auth/facebook', {
        access_token: res.authResponse.accessToken
      })
        .then(res => {
          dispatch({
            type: types.USER_DATA_SUCCESS,
            data: res.data
          });
        })
        .catch(err => {
          dispatch({
            type: types.USER_DATA_ERROR,
            error: err
          });
        });
    } else {
      console.log('Not at all logged in');
    }
  });
};
