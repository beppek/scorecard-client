import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import * as authActions from './state/actions/authActions';

import Header from './views/components/Header';

import logo from './logo.svg';
import './App.css';
import GoogleSignin from './views/containers/GoogleSignin/index';

const App = props => {
  let content = !!props.isAuthenticated ? (
    <Fragment>
      <p>Authenticated</p>
      <Fragment>{props.user.email}</Fragment>
      <Fragment>
        <img src={props.user.picture} />
        <button onClick={props.logout} className="button">
          Log out
        </button>
      </Fragment>
    </Fragment>
  ) : (
    <Fragment>
      <GoogleSignin />
    </Fragment>
  );
  return (
    <div className="App">
      <Header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </Header>
      <Fragment>{content}</Fragment>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(authActions.logout(dispatch));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
