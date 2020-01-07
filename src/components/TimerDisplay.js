import React from 'react';

import '../css/components/TimerDisplay.css'

export const TimerDisplay = (props) => {
  let seconds = ("0" + (Math.floor((props.currentTime / 1000) % 60) % 60)).slice(-2)
  let minutes = ("0" + Math.floor((props.currentTime / 60000) % 60)).slice(-2)
  if(props.type === 'amrap' || props.type === 'emom') 
    return <div className={props.className}>{minutes} : {seconds}</div>
  if(props.type === 'tabata') 
    return <div className={props.className}>{seconds}</div>
}

export default TimerDisplay