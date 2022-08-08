import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: undefined,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    this.fetchQuestions(token);
  }

  fetchQuestions = async (token) => {
    const result = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await result.json();
    const invalidCode = 3;
    if (data.response_code === invalidCode) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      questions: data.results,
    });
  };

  render() {
    const { questions } = this.state;
    return (
      <section className="game-section">
        <Header />
        <Questions questions={ questions } />
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
