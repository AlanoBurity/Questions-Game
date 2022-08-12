import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveScoreState } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      nextBtnDisabled: true,
      isDisable: false,
      questionLevel: '',
      arrayQuestions: [],
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

  handleClick = () => {
    const buttons = document.querySelectorAll('.option');
    buttons.forEach((button) => button.classList.remove('border-green'));
    buttons.forEach((button) => button.classList.remove('border-red'));
    const { questionIndex } = this.state;
    if (questionIndex === Number('4')) {
      const { history } = this.props;
      history.push('/feedback');
    } else {
      this.setState((prev) => ({
        questionIndex: prev.questionIndex + 1,
        nextBtnDisabled: true,
        isDisable: false,
        seconds: 30,
      }), this.shuffleArrayFunc);
    }
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
        }), () => {
          const { assertionTimer, questionLevel } = this.state;
          const { saveScore } = this.props;
          if (questionLevel === 'hard') {
            saveScore(Number('10') + (assertionTimer * Number('3')));
          } else if (questionLevel === 'medium') {
            saveScore(Number('10') + (assertionTimer * Number('2')));
          } else {
            saveScore(Number('10') + assertionTimer);
          }
        });
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
      arrayQuestions,
      seconds } = this.state;
    return (
      <div className="question-container">
        {
          questions.map((question, index) => (
            <div key={ index }>
              <h1
                className={ seconds > Number('10') ? 'timer great' : 'timer over' }
              >
                { seconds }
              </h1>
              <h1
                className="question-informations"
                data-testid="question-category"
              >
                {question.category}
              </h1>
              <p
                className="question-informations"
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
  saveScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveScore: (score) => dispatch(saveScoreState(score)),
});

export default connect(null, mapDispatchToProps)(Questions);
