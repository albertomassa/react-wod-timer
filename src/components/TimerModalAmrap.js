import React, { useState } from 'react';

import TimerModal from './TimerModal';

import Slider from 'react-input-slider';

import { Input } from 'reactstrap';

import '../css/components/TimerModalAmrap.css'

const sliderStyle = {
    track: {
        backgroundColor: '#f6c344'
    },
    active: {
        backgroundColor: '#5cb85c'
    },
    thumb: {
        width: 25,
        height: 25
    },
    disabled: {
        opacity: 1
    }
};

export const TimerModalAmrap = (props) => {
    var getMinutes = require('../utils/TimerUtils').getMinutes;
    var getMilliseconds = require('../utils/TimerUtils').getMilliSeconds;
    const [modal, setModal] = useState(false);
    const [state, setState] = useState({ 
        x: getMinutes(props.startTime), 
        wod: props.wodName
    });
    const toggle = () => setModal(!modal);
    const handleInputChange = (event) => {
        setState({
            x: state.x,
            wod: event.target.value
        })
    };
    const save = () => {
        props.startTimeInit(getMilliseconds(state.x))
        if(state.wod !== null) props.wodNameInit(state.wod)
        else props.wodNameInit('shut up and train')
        toggle()
    };
    return [
        <TimerModal 
            modal={modal}
            toggle={toggle}
            save={save}
            title={props.title}
            body={
                <div>
                    <div className="timer-modal-amrap-minutes">{state.x} minutes</div>
                    <Slider
                        styles={sliderStyle}
                        x={state.x}
                        xmax={59}
                        xmin={1}
                        onChange={({ x }) => setState(state => ({ ...state, x }))}/>
                    <Input 
                        className="timer-modal-amrap-wod-name" 
                        id="wodName"
                        name="wodName"
                        type="text" 
                        maxlength="22"
                        placeholder="shut up and train"
                        onChange={event => handleInputChange(event)}/>
                </div>
            }/> 
    ];
}

export default TimerModalAmrap



