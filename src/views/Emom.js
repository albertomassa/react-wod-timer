
import React from 'react';

import TimerModalEmom from '../components/TimerModalEmom.js'
import TimerDisplay from '../components/TimerDisplay.js'
import RoundCircleBar from '../components/RoundCircleBar.js'

import { Button, Container, Row, Col } from 'reactstrap'

import '../css/views/Emom.css';

export default class Emom extends React.Component {

  state = {
    timerOn: false,
    currentTime: 0,
    rounds: [], 
    round: null, 
    i: 0
  }

  /*
  TIMER: INIT
  */

  roundsInit = (value) => {
    if(value !== null && value.length > 0)
      this.setState({
        rounds: value
      })
  }

  /*
  TIMER: MANAGEMENT
  */

  start = () => {
    if(this.state.i < this.state.rounds.length) {
      var r = this.state.rounds[this.state.i]
      this.setState({
        timerOn: true,
        round: r, 
        currentTime: 60000
      })
      this.activateTimer()
    } else {
      this.reset()
    }  
  };

  resume = () => {
    this.setState({
      timerOn: true,
      currentTime: this.state.currentTime
    })
    this.activateTimer()
  }

  activateTimer = () => {
    this.timer = setInterval(() => {
      if(!this.checkTime()) {
        this.setState({
          i: this.state.i + 1,
          currentTime: 60000
        })
        clearInterval(this.timer)
        this.startDelay(800)
      }
    }, 1000) 
  }

  startDelay(value) {
    this.timer = setInterval(() => {
      if(value>=0) {
        value = value - 200
      } else {
        clearInterval(this.timer)
        this.start()
      }
    }, 200)   
  }

  checkTime = () => {
    const time = this.state.currentTime - 1000
    if(time > 0) {
      if(time <= 2000) {
        this.audio.play()
      }
      this.setState({
        currentTime: time
      })
      return true
    }
    this.finalAudio.play()
    return false
  };

  stop = () => {
    clearInterval(this.timer)
    this.setState({ timerOn: false })
  };

  reset = () => {
    this.stop()
    this.setState({
      timerOn: false,
      currentTime: 0,
      i: 0,
      round: null
    })
  };
 
  render() {
     let wodName
     let round = 0
     if(this.state.round !== null) {
        wodName = this.state.round.name
        round = this.state.i
     }
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
        <div className="emom-box-container">
          <div className="timer-emom">
            <div className="timer-emom-label">E.M.O.M.</div>
            <TimerModalEmom 
              title="emom settings"
              rounds={this.state.rounds}
              roundsInit={this.roundsInit}/>
            {this.state.timerOn === false && (this.state.currentTime === 0) && (this.state.rounds.length > 0) && (
              <Button color="success" onClick={this.start}>START</Button>
            )}
            {this.state.timerOn === true && this.state.currentTime >= 1000 && (
              <Button color="danger" onClick={this.stop}>STOP</Button>
            )}
            {this.state.timerOn === false && (this.state.currentTime < 60000 && this.state.currentTime > 0) && (
              <Button color="info" onClick={this.resume}>RESUME</Button>
            )}
            {(this.state.timerOn === false) && (this.state.currentTime !== 0) && (this.state.rounds.length > 0) && (
              <Button color="secondary" onClick={this.reset}>RESET</Button>
            )}
            <div className="timer-emom-display-container">
              <Container>
                <Row>
                  <Col>
                    <TimerDisplay
                      className="timer-time-emom"
                      type="emom" 
                      currentTime={this.state.currentTime}/>
                  </Col>
                  <Col>
                    <div className="timer-emom-round-bar">
                      <RoundCircleBar 
                        round={round}
                        totalRounds={this.state.rounds.length}/>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="timer-emom-wod-name">{wodName}</div>
          </div>
        </div>
     ]);
  }
  
}

