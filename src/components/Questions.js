import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
    };
  }

  handleClick = () => {
    this.setState((prev) => ({
      questionIndex: prev.questionIndex + 1,
    }));
  }

  render() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const array = [questions[questionIndex]
      .correct_answer, ...questions[questionIndex].incorrect_answers];
    const shuffleArray = array.sort(() => Math.random() - Number('0.5'));

    return (
      <div className="question-container">
        <div>
          {
            questions.map((question, index) => (
              <div key={ index }>
                <h1
                  data-testid="question-category"
                >
                  {question.category}
                </h1>
                <p
                  data-testid="question-text"
                >
                  {question.question}
                </p>

              </div>

            ))[questionIndex]
          }
          <div data-testid="answer-options">
            {
              shuffleArray.map((alternative, index) => (
                (alternative === questions[questionIndex].correct_answer)
                  ? (
                    <button
                      data-testid="correct-answer"
                      type="button"
                      key={ index }
                    >
                      {alternative}
                    </button>)
                  : (
                    <button
                      data-testid={ `wrong-answer-${index}` }
                      type="button"
                      key={ index }
                    >
                      {alternative}
                    </button>)
              ))
            }
          </div>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Questions;
