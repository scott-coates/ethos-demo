import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'

import * as reducers from './scripts/reducers';

require('smoothscroll-polyfill').polyfill();

import App from './scripts/app';

import './styles/index.css';

const rootReducer = combineReducers({
  app: reducers.appReducer,
  form: formReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

