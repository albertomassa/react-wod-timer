import React from 'react';

import TimerModalAmrap from './TimerModalAmrap';
import TimerModalEmom from './TimerModalEmom';
import ProgressBar from './ProgressBar';
import RoundCircleBar from './RoundCircleBar';

import { Button } from 'reactstrap';



let typeOfTimer = "amrap";

const TimerDisplay = (props) => {
  if(typeOfTimer === 'amrap') 
    return <div className="timer-time">{props.minutes} : {props.seconds}</div>;
  else 
    return <div className="timer-time">{props.seconds}</div>;
}

const TimerModal = (props) => {
  if(typeOfTimer === 'amrap') 
    return <TimerModalAmrap 
              title="amrap settings"
              init={props.init}
              wodName={props.wodName}
              timeInit={props.timeInit}
              nameInit={props.nameInit}/>;
  else 
    return <TimerModalEmom 
              title="emom settings"
              emomRounds={props.emomRounds}
              roundsInit={props.roundsInit}/>;
}

const TimerFooter = (props) => {
  if(typeOfTimer === 'amrap') 
    return <ProgressBar 
              wodName={props.wodName}
              percentageCompleted={props.percentageCompleted}/>;
  else 
    return <RoundCircleBar 
                round={props.round}
                totalRounds={props.totalRounds}
                wodName={props.wodName}/>;
}

export default class Timer extends React.Component {

    default_time_emom = require('../utils/TimerUtils').defaultTimeAmrap;
    default_time_tabata =  require('../utils/TimerUtils').defaultTimeAmrap;

    state = {
      timerOn: false,
      wodName: "the spartans wod", 
      percentageCompleted: 0, 
      time: 0, 
      init: 0, 
      round: 1,
      emomRounds: [{name : 'EMOM 1'}]
    }

    constructor(props) {
      super(props)
      if(this.props.type != null) {
        typeOfTimer = this.props.type;
      }
    }

    startTimer = () => {
      this.setState({
        timerOn: true,
      })
      if(typeOfTimer === 'amrap')
        this.updateTimerAmrap()
      if(typeOfTimer === 'emom')
        this.updateTimerEmom()
      if(typeOfTimer === 'tabata') {
        this.updateTimerTabata()
      }
    };

    stopTimer = () => {
      clearInterval(this.timer);
      this.setState({ timerOn: false })
    };

    resetTimer = () => {
      this.setState({
        time: this.state.init,
        percentageCompleted: 0
      })
    };

    updateTimerAmrap = () => {
      var getPercentageCompleted = require('../utils/TimerUtils').getPercentageCompleted;
      this.timer = setInterval(() => {
        if(this.timerUpdate()) {
          this.setState({
            percentageCompleted: getPercentageCompleted(this.state.time, this.state.init)
          })
        } else {
          this.timerStop()
        }
      }, 1000)
    };

    updateTimerEmom = () => {
      //TODO
    };

    updateTimerTabata = () => {
      //TODO
    };

    timerUpdate = () => {
      const time = this.state.time - 1000
      if(time >= 0) {
        this.setState({
          time: time
        })
        return true
      }
      return false
    }

    timerStop = () => {
      clearInterval(this.timer)
      this.setState({ timerOn: false })
      alert("end-of-time")
    }

    timeInit = (value) => {
      this.setState(
        {
          init: value,
          time: value
        }
      )
    }

    nameInit = (value) => {
      this.setState({
          wodName: value
      })
    }

    roundsInit = (value) => {
      this.setState({
        emomRounds: value
      })
    }
       
    render() {
      let seconds = ("0" + (Math.floor((this.state.time / 1000) % 60) % 60)).slice(-2)
      let minutes = ("0" + Math.floor((this.state.time / 60000) % 60)).slice(-2)
      return (
        <div className="timer">
          <div className="timer-header">
            {this.state.timerOn === false && (this.state.time === this.state.init) && (
              <TimerModal 
                init={this.state.init}
                timeInit = {this.timeInit}
                wodName={this.state.wodName}
                emomRounds = {this.state.emomRounds}
                nameInit={this.nameInit}
                roundsInit={this.roundsInit} />
            )}
            {this.state.timerOn === false && (this.state.time === this.state.init) && (
              <Button color="success" onClick={this.startTimer}>START</Button>
            )}
            {this.state.timerOn === true && this.state.time >= 1000 && (
              <Button color="danger" onClick={this.stopTimer}>STOP</Button>
            )}
            {this.state.timerOn === false && (this.state.init !== this.state.time && this.state.time !== 0) && (
              <Button color="info" onClick={this.startTimer}>RESUME</Button>
            )}
            {(this.state.timerOn === false) && (this.state.time !== this.state.init) && (
              <Button color="secondary" onClick={this.resetTimer}>RESET</Button>
            )}
          </div>
          <div className="timer-display">
            <TimerDisplay 
                time={this.state.time}
                minutes={minutes} 
                seconds={seconds}/>
            <TimerFooter 
                wodName={this.state.wodName}
                percentageCompleted={this.state.percentageCompleted}
                round={this.state.round}
                totalRounds={this.state.emomRounds.length}/>
          </div>          
        </div>
      );
    }
  
}




