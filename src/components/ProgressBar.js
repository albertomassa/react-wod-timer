import React from 'react';

import { Progress} from 'reactstrap';

import '../css/components/ProgressBar.css';

export default class ProgressBar extends React.Component {
  
    render() {
        const remainingPercentage = 100 - this.props.percentageCompleted
        return (
          <div className>
            <Progress multi>
              <Progress animated striped bar color={this.props.colorCompleted} value={this.props.percentageCompleted} />
              <Progress animated striped bar color={this.props.colorRemaining} value={remainingPercentage}/>
            </Progress>
            <div className="timer-progress-bar-percentage">{this.props.percentageCompleted}% completed</div>
          </div>
        );
    }
  
}
