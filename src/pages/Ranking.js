import React, { Component } from 'react';
import propTypes from 'prop-types';

class Ranking extends Component {
  // componentDidMount() {
  //   const ranking
  // }

    handleClick = () => {
      const { history } = this.props;
      history.push('/');
    }

    render() {
      return (
        <div>
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
};

export default Ranking;
