import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

export default class Controls extends Component {

  static proptTypes = {
    isRunning: PropTypes.bool,
    isDone: PropTypes.bool,
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isRunning: false,
    isDone: false
  };

  render() {
    const { isRunning, isDone, start, stop } = this.props;

    return (
      <div className="Controls">
        {!isRunning && !isDone ?
          <Button
            block
            onClick={start}
            color="success"
            ref="startBtn" > Start Ride </Button>
          : null}

        {isRunning ?
          <Button
            block
            onClick={stop}
            color="danger"
            ref="stopBtn" > End Ride </Button>
          : null}

          {isDone ?
            <Button 
            block
            href="/scan" 
            color="primary" > Checkout Another {process.env.REACT_APP_SCOOTER_TERM}? </Button>
            : null}
      </div>
    );
  }
}