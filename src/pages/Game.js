import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
    const { history } = this.props;
    const isThre = 3;
    const result = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await result.json();
    if (data.response_code === isThre) {
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
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
