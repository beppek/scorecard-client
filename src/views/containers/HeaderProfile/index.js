import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Header,
  Image,
  Modal,
  Icon,
  Dropdown
} from 'semantic-ui-react';

import GoogleLoginButton from '../../components/Button/GoogleLoginButton';
import FacebookLoginButton from '../../components/Button/FacebookLoginButton';
import * as authActions from '../../../state/actions/authActions';

const HeaderProfile = ({ user, isAuthenticated, logout }) => {
  const content = !user ? (
    <Modal
      dimmer={'blurring'}
      trigger={
        <Button color="green">
          <Icon name="sign in" />Login
        </Button>
      }
    >
      <Modal.Header>Login with...</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="small" src="/user.png" />
        <Modal.Description>
          <GoogleLoginButton />
          <FacebookLoginButton />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  ) : (
    <Fragment>
      <Dropdown
        direction="left"
        icon={<Image inline circular size="tiny" src={user.picture} />}
      >
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name="user circle" />
            <span>{`${user.firstName} ${user.lastName}`}</span>
          </Dropdown.Item>
          <Dropdown.Item>
            <Button color="blue" onClick={logout}>
              <Icon name="sign out" />logout
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );

  return <Fragment>{content}</Fragment>;
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(authActions.logout(dispatch));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderProfile);
