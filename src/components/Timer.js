import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 5,
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
      <div>
        <p>{ seconds }</p>
      </div>
    );
  }
}

export default Timer;
