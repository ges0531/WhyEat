import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { StylesProvider } from '@material-ui/core/styles';


ReactDOM.render(
  <StylesProvider injectFirst>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StylesProvider>, document.getElementById('root')
);
serviceWorker.unregister();
