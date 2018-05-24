import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from './state/store/';
import * as authActions from './state/actions/authActions';

store.dispatch(dispatch => {
  authActions.checkCookie(dispatch);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
