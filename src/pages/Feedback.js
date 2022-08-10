import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { clearState } from '../redux/actions';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      redirectRanking: false,
      redirectLogin: false,
    };
  }

  componentDidMount() {
    const { name, score, email } = this.props;
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    let ranking = [];
    const rankingObject = {
      name,
      score,
      picture,
    };
    ranking = localStorage.getItem('ranking');
    if (ranking !== null) {
      ranking = JSON.parse(ranking);
      ranking.push(rankingObject);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      ranking = [];
      ranking.push(rankingObject);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
  }

  handleClick = () => {
    const { clearStateFunc } = this.props;
    clearStateFunc();
    this.setState({
      redirectLogin: true,
    });
  }

  redirectRanking = () => {
    this.setState({
      redirectRanking: true,
    });
  }

  render() {
    const { score, asserts } = this.props;
    const { redirectRanking, redirectLogin } = this.state;
    return (
      <div>
        {
          redirectRanking
            && <Redirect to="/ranking" />
        }
        {
          redirectLogin
            && <Redirect to="/" />
        }
        <Header />
        <h1 data-testid="feedback-total-score">{ score }</h1>
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
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
  asserts: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  clearStateFunc: () => dispatch(clearState()),
});

Feedback.propTypes = {
  score: propTypes.number.isRequired,
  asserts: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  clearStateFunc: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
