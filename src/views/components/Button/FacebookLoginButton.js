import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';

import * as authActions from '../../../state/actions/authActions';
import { appId } from '../../../secrets/facebook.secrets';

const FacebookLoginButton = props => {
  return (
    <FacebookLogin
      appId={appId}
      autoLoad={false}
      fields="name,email,picture"
      callback={props.facebookResponse}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    facebookResponse: res => {
      dispatch(authActions.facebookResponse(res, dispatch));
    },
    loginFailed: error => {
      dispatch(authActions.loginFailed(error, dispatch));
    }
  };
};

export default connect(null, mapDispatchToProps)(FacebookLoginButton);
