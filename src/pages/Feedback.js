import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { score, asserts } = this.props;
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-total-score">{ score }</h3>
        <h3 data-testid="feedback-total-question">{ asserts }</h3>
        {
          (asserts < Number('3'))
            ? (
              <p data-testid="feedback-text">
                Could be better...
              </p>)
            : <p data-testid="feedback-text">Well Done!</p>
        }
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  asserts: state.player.assertions,
});

Feedback.propTypes = {
  score: propTypes.number.isRequired,
  asserts: propTypes.number.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
