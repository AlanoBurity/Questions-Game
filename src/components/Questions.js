import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      nextBtnDisabled: true,
      isDisable: false,
    };
  }

  handleClick = () => {
    const buttons = document.querySelectorAll('.option');
    buttons.forEach((button) => button.classList.remove('border-green'));
    buttons.forEach((button) => button.classList.remove('border-red'));
    this.setState((prev) => ({
      questionIndex: prev.questionIndex + 1,
      nextBtnDisabled: true,
    }));
  }

  clickAlternative = ({ target }) => {
    this.setState({
      nextBtnDisabled: false,
    }, () => {
      const buttonCorrect = document.querySelector('.correct');
      const buttonIncorrect = document.querySelectorAll('.incorrect');
      const styleRed = 'border-red';
      const stylegreen = 'border-green';
      if (target.classList.contains('correct')) {
        target.classList.add(stylegreen);
        buttonIncorrect.forEach((button) => button.classList.add(styleRed));
      } else {
        buttonIncorrect.forEach((button) => button.classList.add(styleRed));
        buttonCorrect.classList.add(stylegreen);
      }
    });
  }

  disableBttn = () => (this.setState({ isDisable: true }))

  ableBtn = () => (this.setState({ isDisable: false }));

  ableNextBtn = () => (this.setState({ nextBtnDisabled: false }));

  render() {
    const { questions } = this.props;
    const { questionIndex, nextBtnDisabled, isDisable } = this.state;
    const array = [questions[questionIndex]
      .correct_answer, ...questions[questionIndex].incorrect_answers];
    const shuffleArray = array.sort(() => Math.random() - Number('0.5'));
    return (
      <div className="question-container">
        {
          questions.map((question, index) => (
            <div key={ index }>
              <Timer
                disableBttn={ this.disableBttn }
                ableBtn={ this.ableBtn }
                ableNextBtn={ this.ableNextBtn }
              />
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
        <div data-testid="answer-options" className="questions-alternatives">
          {
            shuffleArray.map((alternative, index) => (
              (alternative === questions[questionIndex].correct_answer)
                ? (
                  <button
                    data-testid="correct-answer"
                    className="correct option"
                    type="button"
                    key={ index }
                    disabled={ isDisable }
                    onClick={ this.clickAlternative }
                  >
                    {alternative}
                  </button>)
                : (
                  <button
                    data-testid={ `wrong-answer-${index}` }
                    className="incorrect option"
                    type="button"
                    key={ index }
                    disabled={ isDisable }
                    onClick={ this.clickAlternative }
                  >
                    {alternative}
                  </button>)
            ))
          }
        </div>
        {
          !nextBtnDisabled
            && (
              <button
                data-testid="btn-next"
                className="next-questionBtn"
                type="button"
                onClick={ this.handleClick }
              >
                Next
              </button>)
        }
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Questions;
