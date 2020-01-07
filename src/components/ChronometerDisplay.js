import React from "react";

import '../css/components/ChronometerDisplay.css';

export default class ChronometerDisplay extends React.Component {
  
  render() {
    const { timerTime } = this.props.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2)
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2)
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2)
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2)
    return ([
      <div className="chronometer-time">
        {hours} : {minutes} : {seconds} 
      </div>,
      <div className="chronometer-time-centi">{centiseconds}</div>
    ]);
  }

}