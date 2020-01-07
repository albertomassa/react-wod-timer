
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Amrap from './Amrap';
import Emom from './Emom';
import Tabata from './Tabata';
import Stopwatch from './Stopwatch';

import '../css/views/Workout.css';

export default class Workout extends React.Component {
  
  render() {
    return(
      <div className="workout-box-container">
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/amrap' component={Amrap}/>
            <Route path='/emom' component={Emom}/>
            <Route path='/tabata' component={Tabata}/>
            <Route path='/stopwatch' component={Stopwatch}/>
          </Switch>
        </main>
      </div>
    );
  }
  
}
