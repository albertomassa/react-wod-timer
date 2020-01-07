
import React from 'react';

import { Button } from 'reactstrap';

import TimerModalAmrap from '../components/TimerModalAmrap.js';
import TimerDisplay from '../components/TimerDisplay.js';
import ProgressBar from '../components/ProgressBar.js'

import '../css/views/Amrap.css';

export default class Amrap extends React.Component {

  state = {
    timerOn: false,
    wodName: null, 
    currentTime: 0,
    startTime: 0, 
    percentageCompleted: 0,
  }

  /*
  TIMER: INIT
  */

  startTimeInit = (value) => {
    this.setState({
      startTime: value,
      currentTime: value,
    })
  }

  wodNameInit = (value) => {
    this.setState({
      wodName: value,
    })
  }

  /*
  TIMER: MANAGEMENT
  */

  start = () => {
    
    console.log('public url: ', process.env.PUBLIC_URL)
    this.setState({
      timerOn: true,
    })
    this.timer = setInterval(() => {
      if(!this.checkTime()) {
        this.stop()
        this.reset()
      }
    }, 1000)
  };

  checkTime = () => {
    const time = this.state.currentTime - 1000
    var getPercentageCompleted = require('../utils/TimerUtils').getPercentageCompleted
    if(time > 0) {
      if(time <= 5000) {
        this.audio.play()
      }
      this.setState({
        currentTime: time, 
        percentageCompleted: getPercentageCompleted(time, this.state.startTime)
      })
      return true
    }
    this.finalAudio.play()
    return false
  };

  stop = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false })
  };

  reset = () => {
    this.setState({
      currentTime: this.state.startTime,
      percentageCompleted: 0
    })
  };

  render() {
    return([
        <audio
        ref={audio => this.audio = audio}
        src={require(`../resources/sound/beep.mp3`)}
        loop={false}
        autoPlay={false}/>,
        <audio
        ref={finalAudio => this.finalAudio = finalAudio}
        src={require(`../resources/sound/final_beep.mp3`)}
        loop={false}
        autoPlay={false}/>,
        <div className="amrap-box-container">
          <div className="timer-amrap">
              <div className="timer-amrap-label">A.M.R.A.P.</div>
                <TimerModalAmrap 
                      title="amrap settings"
                      startTime={this.state.startTime}
                      startTimeInit={this.startTimeInit}
                      wodName={this.state.wodName}
                      wodNameInit={this.wodNameInit} />
                {this.state.timerOn === false && (this.state.currentTime === this.state.startTime) && (this.state.currentTime > 0) && (
                  <Button color="success" onClick={this.start}>START</Button>
                )}
                {this.state.timerOn === true && this.state.currentTime >= 1000 && (
                  <Button color="danger" onClick={this.stop}>STOP</Button>
                )}
                {this.state.timerOn === false && (this.state.currentTime !== this.state.startTime && this.state.currentTime > 0) && (
                  <Button color="info" onClick={this.start}>RESUME</Button>
                )}
                {(this.state.timerOn === false) && (this.state.currentTime !== this.state.startTime) && (
                  <Button color="secondary" onClick={this.reset}>RESET</Button>
                )}
                <TimerDisplay
                  className="timer-time-amrap"
                  type="amrap" 
                  currentTime={this.state.currentTime}/>
                <ProgressBar 
                  type="amrap"
                  className="progress-bar-amrap"
                  colorCompleted="success"
                  colorRemaining="warning"
                  percentageCompleted={this.state.percentageCompleted}/>
                <div className="timer-amrap-wod-name">{this.state.wodName}</div>
          </div>
        </div>
    ]);
  }
  
}
