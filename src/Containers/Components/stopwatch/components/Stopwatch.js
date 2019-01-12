import React, { Component } from 'react';
import Timer from './Timer';
import Controls from './Controls';
import { API } from "aws-amplify";
import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";

const updateTime = parseInt(process.env.REACT_APP_UPDATEINTERVAL, 10);
const lockoutTime = parseInt(process.env.REACT_APP_LOCKOUT_TIME, 10);

const geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 15000, //15 secs
  timeout           : 10000  //10 secs
};

let lastSubmitTime = 0
let oldestTime = 0

function getDefaultState() {
  return {
    isRunning: false,
    isDone: false,
    time: 0,
    nextTime: 0,
    hideTime: 'hidden',
    posLog: []
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
      this.watchPosition()
        try {
          await this.checkoutScooter(this.props.scooterId);
          this.setState({
            isRunning: true
          }, () => {
            this.timerRef = setInterval(
              () => { this.updateTimer(updateTime) }, updateTime
            )
          });
        } catch (e) {
          alert(e);
        }
    } catch (e) {
      alert(e);
    }
  }

  stop = async event => {
    try {
      await this.checkScooterIn(this.props.scooterId);
      let convertTime = new Date(Date.now() + lockoutTime).toLocaleTimeString('en-US')
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

  watchPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(this.logPosition, this.showError, geo_options);
    } else { 
        alert("Geolocation is not supported by this browser. - Geolocation is required to check out a creature");
    }
  }

showError = (error) => {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation. - You have to accept sending your location in order to check out a creature.")
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable. - Location data required to check out a creature")
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out. - You have to accept sending your location in order to check out a creature.")
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.")
      break;
  }
}

updateGPSLog(gps, scooterId) {
    return API.put(process.env.REACT_APP_DEV_API_GATEWAY_NAME, `/logGPS/${scooterId}`, { 
        body: gps
    });
}

handleUpdateGPSLog = async gps => {
    try {
        await this.updateGPSLog(gps, this.props.scooterId);
        console.log("log submitted successfully resetting log")
        this.setState({ posLog: [] })
    } catch (e) {
        console.log(e);
    }
}

archiveGPSLog(gps, scooterId) {
    return API.put(process.env.REACT_APP_DEV_API_GATEWAY_NAME, `/archiveGPS/${scooterId}`, { 
        body: gps
    });
}

handleArchiveGPSLog = async gps => { //this only saves the last min, because it resets the log
    try {
        await this.archiveGPSLog(gps, this.props.scooterId);
        console.log("log submitted successfully resetting log")
        this.setState({ posLog: [] })
    } catch (e) {
        console.log(e);
    }
}

 logPosition = (pos) => {
    let posLog = [...this.state.posLog]
    let posObj = {timestamp: pos.timestamp, latitude: pos.coords.latitude, longitude: pos.coords.longitude}

    if (pos.timestamp > oldestTime + 300000 && oldestTime !== 0) {

        console.log("over 5 mins passed - archive log on server")

        // write to archive and clear current
        posLog.push(posObj)
        this.handleArchiveGPSLog(posLog)
        oldestTime = pos.timestamp

    } else if (pos.timestamp > lastSubmitTime + 60000) {
        oldestTime = oldestTime === 0 ? pos.timestamp : oldestTime // set first oldestTime
        
        console.log("adding to log")
        posLog.push(posObj)
        
        console.log("over 1 min passed - submitting log to server")
        // console.log(posLog)
        this.handleUpdateGPSLog(posLog)
        
        console.log("setting lastSubmitTime")
        lastSubmitTime = pos.timestamp

    } else {
        console.log("less than a min passed - adding to log")
        posLog.push(posObj)
    }
    this.setState({posLog})
 }

  checkoutScooter(scooterId) {
    return API.put(process.env.REACT_APP_DEV_API_GATEWAY_NAME, `/checkOut/${scooterId}`);
  }

  checkScooterIn(scooterId) {
    return API.put(process.env.REACT_APP_DEV_API_GATEWAY_NAME, `/scooter/${scooterId}`);
  }

  render() {
    const { isRunning, isDone, time, hideTime, nextTime } = this.state;
    return (
      <div className="text-center">
        <Card className="shadow-lg border border-danger" color="dark">
        <CardHeader tag="h3">Ride Time:</CardHeader>
          <CardBody>
            <Timer time={time} />
            <div className={hideTime}>
              <h4>The earliest you can checkout this {process.env.REACT_APP_SCOOTER_TERM} again is: {nextTime}</h4>
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