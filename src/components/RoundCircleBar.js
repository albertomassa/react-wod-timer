import React from 'react';

import RoundSeparator from './RoundSeparator';

import '../css/components/RoundCircleBar.css';
import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default class RoundCircleBar extends React.Component {
  
    default_stroke_width = 10
    default_round_separator_width = '2px'
    default_round_background = 'red'
    default_stroke_line_cap = 'butt'

    valueRounds = () => {
      return 0
    }

    render() {
      const rounds = this.props.round + '/' + this.props.totalRounds
      let value = 0
      if(this.props.totalRounds !== 0 && this.props.round !== 0) 
        value = (100 / this.props.totalRounds) * (this.props.round)
      return (
        <CircularProgressbarWithChildren
            value={value}
            text={rounds}
            strokeWidth={this.default_stroke_width}
            styles={buildStyles({
              strokeLinecap: this.default_stroke_line_cap})}>
            <RoundSeparator
              count={this.props.totalRounds}
              style={{
                background: this.default_round_background,
                width: this.default_round_separator_width,
                height: `${10}%`}}/>
        </CircularProgressbarWithChildren>
      );
    }
  
}
