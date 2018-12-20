import React, { Component } from 'react';
import PropTypes from 'prop-types'
import timeFormat from '../utils/timeFormat';

export default class Timer extends Component {

  static proptTypes = {
    time : PropTypes.number
  };

  static defaultProps = {
    time : 0
  };

  render() {
    const { time } = this.props;

    return (
      <div className="Timer">
        { timeFormat( time ) }
      </div>
    );
  }
}
