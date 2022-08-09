import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      intervalID: null,
    };
  }

  componentDidMount() {
    const { ableBtn } = this.props;
    ableBtn();
    const intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, Number('1000'));
    this.setState({ intervalID });
  }

  componentDidUpdate() {
    const { seconds, intervalID } = this.state;
    if (seconds === 0 && intervalID) {
      this.clearID();
    }
  }

  clearID = () => {
    const { disableBttn } = this.props;
    const { intervalID } = this.state;
    clearInterval(intervalID);
    this.setState({ intervalID: null });
    disableBttn();
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p>{ seconds }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  ableBtn: PropTypes.func.isRequired,
  disableBttn: PropTypes.func.isRequired,
};

export default Timer;
