import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';

import * as authActions from '../../../state/actions/authActions';
import { clientId } from '../../../secrets/google.secrets';
import styled from 'styled-components';

const Button = props => {
  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={props.googleResponse}
      onFailure={props.loginFailed}
    />
  );
};

const GoogleLoginButton = styled(Button)`
  cursor: pointer;
`;

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

export default connect(null, mapDispatchToProps)(GoogleLoginButton);

// export default GoogleLoginButton;
