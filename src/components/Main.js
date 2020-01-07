
import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from '../views/Home';
import Amrap from '../views/Amrap';
import Emom from '../views/Emom';
import Tabata from '../views/Tabata';
import Stopwatch from '../views/Stopwatch';

export default class Main extends React.Component {
  
  render() {
    return(
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/amrap' component={Amrap}/>
          <Route path='/emom' component={Emom}/>
          <Route path='/tabata' component={Tabata}/>
          <Route path='/stopwatch' component={Stopwatch}/>
        </Switch>
      </main>
    );
  }
  
}
