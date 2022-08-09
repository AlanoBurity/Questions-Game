import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
    };
  }

  handleClick = () => {
    const buttons = document.querySelectorAll('.styleButton');
    buttons.forEach((button) => button.classList.remove('border-green'));
    buttons.forEach((button) => button.classList.remove('border-red'));
    this.setState((prev) => ({
      questionIndex: prev.questionIndex + 1,
    }));
  }

  clickAlternative = ({ target }) => {
    const buttonCorrect = document.querySelector('.correct');
    const buttonIncorrect = document.querySelectorAll('.wrong');
    const styleRed = 'border-red';
    const stylegreen = 'border-green';
    if (target.classList.contains('correct')) {
      target.classList.add(stylegreen);
      buttonIncorrect.forEach((button) => button.classList.add(styleRed));
    } else {
      buttonIncorrect.forEach((button) => button.classList.add(styleRed));
      buttonCorrect.classList.add(stylegreen);
    }
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
                <Timer />
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
                      // className="border-green"
                      data-testid="correct-answer"
                      className="correct styleButton"
                      type="button"
                      key={ index }
                      onClick={ this.clickAlternative }
                    >
                      {alternative}
                    </button>)
                  : (
                    <button
                      // className="border-red"
                      data-testid={ `wrong-answer-${index}` }
                      className="wrong styleButton"
                      type="button"
                      key={ index }
                      onClick={ this.clickAlternative }
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
