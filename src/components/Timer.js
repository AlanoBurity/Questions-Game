import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, Number('1000'));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.seconds < 2) {
      clearInterval(this.intervalID);
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <h1 className="timer">{ seconds }</h1>

    );
  }
}

export default Timer;
