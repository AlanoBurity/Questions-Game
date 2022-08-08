import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    this.fetchQuestion(token);
  }

  fetchQuestion = async (token) => {
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
      <div>
        <Header />
        <Questions questions={ questions } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
