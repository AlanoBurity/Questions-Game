import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearState } from '../redux/actions';
import trivia from '../trivia.png';
import trophy from '../trophy.png';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const rankingFinal = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      ranking: rankingFinal.sort((a, b) => b.score - a.score),
    });
  }

    handleClick = () => {
      const { history, clearStateFunc } = this.props;
      clearStateFunc();
      history.push('/');
    }

    render() {
      const { ranking } = this.state;
      return (
        <div className="ranking-section">

          <img className="trivia-header" src={ trivia } alt="Logo Trivia" />

          <main className="ranking-container">
            <h1 data-testid="ranking-title">Ranking</h1>
            <img src={ trophy } alt="trophy" width="100px" />
            <div className="ranking-titles">
              <p>Player</p>
              <p>Score</p>
            </div>
            {
              ranking.map((player, index) => (
                <div key={ index } className="ranking-player">
                  <img
                    src={ player.picture }
                    alt={ player.name }
                    className="player-pic"
                  />
                  <p data-testid={ `player-name-${index}` }>{player.name}</p>
                  <p data-testid={ `player-score-${index}` }>{player.score}</p>
                </div>
              ))
            }

          </main>

          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleClick }
            className="ranking-login-btn"
          >
            Login
          </button>
        </div>
      );
    }
}

Ranking.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  clearStateFunc: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clearStateFunc: () => dispatch(clearState()),
});

export default connect(null, mapDispatchToProps)(Ranking);
