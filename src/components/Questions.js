import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      // alternativesOrder: '',
      questionIndex: 0,
    };
  }

  // componentDidMount() {
  //   const array = [0, 1, 2, 3, 4];
  //   const randomArray = array.sort(() => Math.random() - 0.5);
  //   this.setState({
  //     alternativesOrder: randomArray,
  //     currentPosition: 0,
  //   });
  // }

  handleClick = () => {
    this.setState((prev) => ({
      questionIndex: prev.questionIndex + 1,
    }));
  }

  render() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    // const index = alternativesOrder[currentPosition];
    return (
      <div className="question-container">
        {
          (questions)
            ? (
              <div>
                <h1
                  data-testid="question-category"
                >
                  {questions[questionIndex].category}
                </h1>
                <p
                  data-testid="question-text"
                >
                  {questions[questionIndex].question}
                </p>
                {/* {
                  (questions[questionIndex].type === 'boolean')
                    ? <div>
                      <button
                        type="button"
                        data-testid="correct-answer"
                      >
                        {questions[questionIndex].correct_answer}
                      </button>
                      <button
                        type="button"
                        data-testid="incorrect-answer"
                      >
                        {questions[questionIndex].incorrect_answer}
                      </button>
                    </div>
                } */}
                <button
                  type="button"
                  onClick={ this.handleClick }
                >
                  Próxima
                </button>
              </div>
            )
            : <p>Loading...</p>
        }
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Questions;
