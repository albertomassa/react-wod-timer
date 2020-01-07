
import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class AppContainer extends React.Component {
  
  render() {
    return(
      <HashRouter>
       <App />
      </HashRouter>
    );
  }
  
}
