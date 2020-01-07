import React, { useState } from 'react';

import TimerModal from './TimerModal';

import { Button, Input, Container, Row, Col } from 'reactstrap';

import '../css/components/TimerModalEmom.css'

export const TimerModalEmom = (props) => {
    const[state,setState] = useState({
        rounds: props.rounds
    });
    const addItem = () => {
        if(state.rounds.length < 25) {
            const values = [...state.rounds]
            let i = values.length + 1
            values.push({ name: 'EMOM ' + i })
            setState({
                rounds: values
            })
        }
    };
    const removeItem = () => {
        if(state.rounds.length > 1) {
            const values = [...state.rounds]
            values.pop()
            setState({
                rounds: values
            })
        }
    };
    const handleInputChange = (index, event) => {
        const values = [...state.rounds];
        if (event.target.name === "name") {
            values[index].name = event.target.value
        } 
        setState({
            rounds: values
        })
    };
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const save = () => {
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
                    <h3>
                        <Container>
                            <Row>
                                <Col>
                                    <Button color="warning" onClick={addItem}>+</Button>
                                    <Button className="timer-modal-emom-rounds-button" onClick={removeItem} color="secondary">-</Button>
                                </Col>
                                <Col>
                                    <div className="timer-modal-emom-rounds">{state.rounds.length} rounds</div>
                                </Col>
                            </Row>
                            <Row className="timer-modal-emom-rounds-details">
                                <Col>
                                    {state.rounds.map((inputField, index) => (
                                        <Input 
                                            className="timer-modal-emom-wod-name"
                                            type="text" 
                                            id="name" 
                                            name="name" 
                                            maxlength="22"
                                            value={inputField.name} 
                                            onChange={event => handleInputChange(index, event)}/>
                                    ))}
                                </Col>
                            </Row>
                        </Container>                        
                    </h3>
                </div>
            }/>  
    ];
}

export default TimerModalEmom



