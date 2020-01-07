
import React from 'react';

import TimerModalTabata from '../components/TimerModalTabata.js'
import TimerDisplay from '../components/TimerDisplay.js'
import ProgressBar from '../components/ProgressBar.js'

import { Button, Container, Row, Col } from 'reactstrap'

import '../css/views/Tabata.css';

export default class Tabata extends React.Component {

  state = {
    timerOn: false,
    work: 20000,
    workInit: 20000,
    workPercentage: 0,
    rest: 10000,
    restInit: 10000,
    restPercentage: 0,
    rounds: 8,
    i: 1
  }
  
  /*
  TIMER: INIT
  */

  workInit = (value) => {
    console.log(value)
    this.setState({
      work: value,
      workInit: value
    })
  }

  restInit = (value) => {
    console.log(value)
    this.setState({
      rest: value,
      restInit: value
    })
  }

  roundsInit = (value) => {
    this.setState({
      rounds: value
    })
  }

  /*
  TIMER: MANAGEMENT
  */

  start = () => {
    if(this.state.i <= this.state.rounds) {
      this.setState({
        timerOn: true,
      })
      this.eatRound('work')
    }
  }

  eatRound = (type) => {
    this.timer = setInterval(() => {
      if(!this.checkTime(type)) {
        clearInterval(this.timer);
        if(type === 'rest') {
          if(this.state.i === this.state.rounds) {
            this.reset()
            return
          }
          this.setState({
            rest: this.state.restInit, 
            restPercentage: 0,
            i: this.state.i + 1
          })
          this.delay(1000,'work')
         } else {
          this.setState({
            work: this.state.workInit, 
            workPercentage: 0
          })
          this.delay(800,'rest')  
        }
      }
    }, 1000)    
  }

  delay(value, fx) {
    this.timer = setInterval(() => {
      if(value>=0) {
        value = value - 200
      } else {
        clearInterval(this.timer)
        if(fx === 'work') {
          this.start('work')
        } 
        if(fx === 'rest') {
          this.eatRound('rest')
        }
      }
    }, 200)   
  }

  checkTime = (type) => {
    let time
    var getPercentageCompleted = require('../utils/TimerUtils').getPercentageCompleted;
    if(type === 'work') {
      time = this.state.work - 1000
      if(time > 0) {
        if(time <= 2000) {
          this.audio.play()
        }
        this.setState({
          work: time, 
          workPercentage: getPercentageCompleted(time, this.state.workInit)
        })
        return true
      }
    }
    if(type === 'rest') {
      time = this.state.rest - 1000 
      if(time > 0) {
        if(time <= 2000) {
          this.audio.play()
        }
        this.setState({
          rest: time, 
          restPercentage: getPercentageCompleted(time, this.state.restInit)
        })
        return true
      }
    }
    this.finalAudio.play()
    return false
  };

  stop = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false })
  }

  reset = () => {
    this.stop()
    this.setState({
      work: this.state.workInit,
      rest: this.state.restInit, 
      workPercentage: 0,
      restPercentage: 0,
      i : 1
    })
  }
  
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
      <div className="tabata-box-container">
        <div className="timer-tabata">
          <div className="timer-tabata-label">TABATA</div>
          <TimerModalTabata 
            title="tabata settings"
            work={this.state.workInit}
            workInit={this.workInit}
            rest={this.state.restInit}
            restInit={this.restInit}
            rounds={this.state.rounds}
            roundsInit={this.roundsInit}/>
          {this.state.timerOn === false && (
            <Button color="success" onClick={this.start}>START</Button>
          )}
          {(this.state.timerOn === true) && (
            <Button color="secondary" onClick={this.reset}>RESET</Button>
          )}
          <div className="timer-tabata-display-container">
            <Container>
              <Row>
                <Col>
                  <TimerDisplay
                    className="timer-time-tabata timer-time-tabata-workColor"
                    type="tabata" 
                    currentTime={this.state.work}/>
                  <ProgressBar 
                    type="tabata" 
                    colorCompleted="danger"
                    colorRemaining="secondary"
                    percentageCompleted={this.state.workPercentage}/>
                </Col>
                <Col>
                  <TimerDisplay
                    className="timer-time-tabata timer-time-tabata-restColor"
                    type="tabata" 
                    currentTime={this.state.rest}/>
                  <ProgressBar 
                    type="tabata" 
                    colorCompleted="success"
                    colorRemaining="secondary"
                    percentageCompleted={this.state.restPercentage}/>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="timer-tabata-wod-name">ROUND: {this.state.i}/{this.state.rounds}</div>
        </div>        
      </div>
    ]
      
    );
  }
  
}