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
    const result = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await result.json();
    console.log(data.results);
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

export default Game;
