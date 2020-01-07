
import React from 'react';

import { Button } from 'reactstrap';
import ChronometerDisplay from '../components/ChronometerDisplay';

import '../css/views/Stopwatch.css';

export default class Stopwatch extends React.Component {

  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

  start = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    })
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      })
    }, 10);
  };

  stop = () => {
    this.setState({ timerOn: false })
    clearInterval(this.timer)
  };

  reset = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0
    })
  };
  
  render() {
    return(
      <div className="stopwatch-box-container">
        <div className="timer-stopwatch">
          <div className="timer-stopwatch-label">STOPWATCH</div>
          {this.state.timerOn === false && this.state.timerTime === 0 && (
            <Button color="success" onClick={this.start}>START</Button>
          )}
          {this.state.timerOn === true && (
            <Button color="danger" onClick={this.stop}>STOP</Button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <Button color="info" onClick={this.start}>RESUME</Button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <Button color="secondary" onClick={this.reset}>RESET</Button>
          )}
          <ChronometerDisplay 
              state={this.state}/>
        </div>
      </div>
    );
  }
  
}