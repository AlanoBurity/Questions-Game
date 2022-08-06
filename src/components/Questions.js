import React, { Component } from 'react';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      question: [],
    };
  }

  componentDidMount() {
    setInterval(this.mapQuestions, 10000);
  }

  mapQuestions = () => {
    const { questions } = this.props;
    questions.map((question) => this.setState({ question }));
  }

  render() {
    const { question } = this.props;
    console.log(question);
    // console.log(questions);
    // console.log(questions[0]);
    return (
      <div>
        <h1>{question}</h1>
        <p>pergunta</p>
      </div>
    );
  }
}

export default Questions;
