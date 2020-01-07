import React, { useState } from 'react';

import TimerModal from './TimerModal';

import Slider from 'react-input-slider';

import { Button, Container, Row, Col } from 'reactstrap';

import '../css/components/TimerModalTabata.css'

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

export const TimerModalTabata = (props) => {
    var getSeconds = require('../utils/TimerUtils').getSeconds;
    var getMilliseconds = require('../utils/TimerUtils').getMilliSecondsFromSeconds;
    const [modal, setModal] = useState(false);
    const [state, setState] = useState({ 
        work: getSeconds(props.work), 
        rest: getSeconds(props.rest), 
        rounds: props.rounds
    });
    const addWork = () => {
        if(state.work >= 59) return;
        setState({
            work: state.work + 1, 
            rest: state.rest,
            rounds: state.rounds
        })
    };
    const addRest = () => {
        if(state.rest >= 59) return;
        setState({
            work: state.work, 
            rest: state.rest + 1,
            rounds: state.rounds
        })
    };
    const removeWork = () => {
        if(state.work <= 1) return;
        setState({
            work: state.work - 1, 
            rest: state.rest,
            rounds: state.rounds
        })
    };
    const removeRest = () => {
        if(state.rest <= 1) return;
        setState({
            work: state.work, 
            rest: state.rest - 1,
            rounds: state.rounds
        })
    };
    const handleRoundsChange = (value) =>{ 
        setState({
            rounds: value,
            rest: state.rest,
            work: state.work
        })
    }
    const toggle = () => setModal(!modal);
    const save = () => {
        props.workInit(getMilliseconds(state.work))
        props.restInit(getMilliseconds(state.rest))
        props.roundsInit(state.rounds)
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
                    <Container>
                        <Row>
                            <Col>
                                <Button color="warning" onClick={addWork}>+</Button>
                                <Button className="timer-modal-tabata-seconds-button" onClick={removeWork} color="secondary">-</Button>
                            </Col>
                            <Col>
                                <div className="timer-modal-tabata-time">{state.work} seconds, WORK</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button color="warning" onClick={addRest}>+</Button>
                                <Button className="timer-modal-tabata-seconds-button" onClick={removeRest} color="secondary">-</Button>
                            </Col>
                            <Col>
                                <div className="timer-modal-tabata-time">{state.rest} seconds, REST</div>
                            </Col>
                        </Row>
                        <Row className="timer-modal-tabata-rounds">
                            <Col>
                                <Slider
                                    styles={sliderStyle}
                                    x={state.rounds}
                                    xmax={30}
                                    xmin={1}
                                    onChange={({ x }) => handleRoundsChange(x)}/>
                            </Col>
                            <Col>
                                <div className="timer-modal-tabata-rounds">{state.rounds} rounds</div>
                            </Col>
                        </Row>
                    </Container>    
                </div>
            }/> 
    ];
}

export default TimerModalTabata



