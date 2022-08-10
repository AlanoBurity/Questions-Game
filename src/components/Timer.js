import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveScoreState } from '../redux/actions';

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
    const { disableBttn, ableNextBtn } = this.props;
    const { intervalID } = this.state;
    clearInterval(intervalID);
    this.setState({ intervalID: null });
    disableBttn();
    ableNextBtn();
  }

  render() {
    const { seconds } = this.state;
    return (
      <h1 className="timer">{ seconds }</h1>
    );
  }
}

Timer.propTypes = {
  ableBtn: PropTypes.func.isRequired,
  disableBttn: PropTypes.func.isRequired,
  ableNextBtn: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveScore: (score) => dispatch(saveScoreState(score)),
});

export default connect(null, mapDispatchToProps)(Timer);
