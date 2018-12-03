import React from 'react';
import ReactDOM from 'react-dom';
import './base.css';
import App from './containers/App';
import ErrorBoundry from './components/ErrorBoundry';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <App /> 
    </ErrorBoundry>
  </Provider>,
  document.getElementById('reactMount')
);

serviceWorker.unregister();
