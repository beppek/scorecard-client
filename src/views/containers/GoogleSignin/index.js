import React, { Fragment } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';

import * as authActions from '../../../state/actions/authActions';
import { clientId } from '../../../secrets/google.secrets';

const GoogleSignin = props => {
  return (
    <Fragment>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={props.googleResponse}
        onFailure={props.loginFailed}
      />
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    googleResponse: res => {
      dispatch(authActions.googleResponse(res, dispatch));
    },
    loginFailed: error => {
      dispatch(authActions.loginFailed(error, dispatch));
    }
  };
};

export default connect(null, mapDispatchToProps)(GoogleSignin);
