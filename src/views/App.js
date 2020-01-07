
import React from 'react';
import Header from '../components/Header';
import Workout from './Workout';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/views/App.css'

export default class App extends React.Component {
  
  render() {
    return(
      <div>
        <Header/>
        <Workout/>      
      </div>
    );
  }
  
}
