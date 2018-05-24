import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'semantic-ui-react';

import * as authActions from './state/actions/authActions';

import Header from './views/components/Header';
import HeaderProfile from './views/containers/HeaderProfile';

import logo from './logo.svg';
import './App.css';
// import GoogleLoginButton from './views/containers/GoogleSignin/index';
// import GoogleLoginButton from './views/components/Button/GoogleLoginButton';

const App = props => {
  // let content = !!props.isAuthenticated ? (
  //   <Fragment>
  //     <p>Authenticated</p>
  //     <Fragment>{props.user.email}</Fragment>
  //     <Fragment>
  //       <img src={props.user.picture} />
  //       <button onClick={props.logout} className="button">
  //         Log out
  //       </button>
  //     </Fragment>
  //   </Fragment>
  // ) : (
  //   <Fragment>
  //     <GoogleLoginButton />
  //   </Fragment>
  // );
  // <img src={logo} className="App-logo" alt="logo" />
  // <h1 className="App-title">Welcome to React</h1>
  return (
    <div className="App">
      <Header>
        <HeaderProfile />
      </Header>
      <Transition.Group animation={'horizontal flip'} duration={500}>
        {/* <Fragment>{content}</Fragment> */}
      </Transition.Group>
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
