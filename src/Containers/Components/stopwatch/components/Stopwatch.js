import React, { Component } from 'react';
import Timer from './Timer';
import Controls from './Controls';
import { API } from "aws-amplify";
import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";

function getDefaultState() {
  return {
    isRunning: false,
    isDone: false,
    time: 0,
    nextTime: 0,
    hideTime: 'hidden'
  }
}

export default class Stopwatch extends Component {

  constructor(props) {
    super(props);
    this.state = getDefaultState();
    this.timerRef = null;
  }

  updateTimer(extraTime) {
    const { time } = this.state;
    this.setState({ time: time + extraTime });
  }

  start = async event => {
    try {
      await this.checkoutScooter(this.props.scooterId);
      this.setState({
        isRunning: true
      }, () => {
        this.timerRef = setInterval(
          () => { this.updateTimer(process.env.REACT_APP_UPDATEINTERVAL) }, process.env.REACT_APP_UPDATEINTERVAL
        )
      });
    } catch (e) {
      alert(e);
    }
  }

  stop = async event => {
    try {
      await this.checkScooterIn(this.props.scooterId);
      let convertTime = new Date(Date.now() + process.env.REACT_APP_LOCKOUT_TIME).toLocaleTimeString('en-US')
      this.setState({
        isRunning: false,
        isDone: true,
        nextTime: convertTime,
        hideTime: ''
      }, () => {
        clearInterval(this.timerRef);
      });

    } catch (e) {
      alert(e);
    }
  }

  checkoutScooter(scooterId) {
    return API.put("scooters", `/checkOut/${scooterId}`);
  }

  checkScooterIn(scooterId) {
    return API.put("scooters", `/scooter/${scooterId}`);
  }

  render() {
    const { isRunning, isDone, time, hideTime, nextTime } = this.state;
    return (
      <div className="center">
        <Card className="shadow-lg border border-danger" color="dark">
        <CardHeader tag="h3">Ride Time:</CardHeader>
          <CardBody>
            <Timer time={time} />
            <div className={hideTime}>
              <h4>The earliest you can checkout this {process.env.REACT_APP_CONTACT_EMAIL} again is: {nextTime}</h4>
            </div>
          </CardBody>
          <CardFooter>
            <Controls
              isRunning={isRunning}
              isDone={isDone}
              start={() => this.start()}
              stop={() => this.stop()}
            />
          </CardFooter>
        </Card>
      </div>
    );
  }
}