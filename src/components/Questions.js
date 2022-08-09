import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      nextBtnDisabled: true,
      isDisable: false,
      questionLevel: '',
      arrayQuestions: [],
      assertions: 0,
      seconds: 30,
      assertionTimer: 0,
    };
  }

  componentDidMount() {
    this.shuffleArrayFunc();
    this.intervalID();
  }

  intervalID = () => {
    setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds > 0 ? prevState.seconds - 1 : this.timerEnd(),
      }));
    }, Number('1000'));
  }

  timerEnd = () => {
    clearInterval();
    this.setState({
      seconds: 0,
      isDisable: true,
      nextBtnDisabled: false,
    });
  }

  shuffleArrayFunc = () => {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    const array = [questions[questionIndex]
      .correct_answer, ...questions[questionIndex].incorrect_answers];
    const shuffleArray = array.sort(() => Math.random() - Number('0.5'));
    this.setState({
      arrayQuestions: shuffleArray,
    });
  }

  handleClick = async () => {
    const buttons = document.querySelectorAll('.option');
    buttons.forEach((button) => button.classList.remove('border-green'));
    buttons.forEach((button) => button.classList.remove('border-red'));
    this.setState((prev) => ({
      questionIndex: prev.questionIndex + 1,
      nextBtnDisabled: true,
      isDisable: false,
      seconds: 30,
    }), this.shuffleArrayFunc);
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
        const { questions } = this.props;
        const { questionIndex, seconds } = this.state;
        target.classList.add(stylegreen);
        this.setState((prev) => ({
          assertions: prev.assertions + 1,
          questionLevel: questions[questionIndex].difficulty,
          assertionTimer: seconds,
        }));
        buttonIncorrect.forEach((button) => button.classList.add(styleRed));
      } else {
        buttonIncorrect.forEach((button) => button.classList.add(styleRed));
        buttonCorrect.classList.add(stylegreen);
      }
    });
  }

  render() {
    const { questions } = this.props;
    const { questionIndex,
      nextBtnDisabled,
      isDisable,
      // questionLevel,
      // assertions,
      arrayQuestions,
      seconds } = this.state;
    return (
      <div className="question-container">
        {
          questions.map((question, index) => (
            <div key={ index }>
              <h1 className="timer">{ seconds }</h1>
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
            arrayQuestions.map((alternative, index) => (
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
