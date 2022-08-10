import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearState } from '../redux/actions';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const rankingFinal = JSON.parse(localStorage.getItem('ranking'));
    console.log(rankingFinal);
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
        <div>
          {
            ranking.map((player, index) => (
              <div key={ index }>
                <p data-testid={ `player-name-${index}` }>{player.name}</p>
                <p data-testid={ `player-score-${index}` }>{player.score}</p>
              </div>
            ))
          }
          <h1 data-testid="ranking-title">Ranking</h1>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleClick }
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
