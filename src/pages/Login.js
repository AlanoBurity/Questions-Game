import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken, saveUser } from '../redux/actions';
import trivia from '../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
      emailInput: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { userInput, emailInput } = this.state;
      const reg = /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;
      if (userInput.length !== 0 && reg.test(emailInput)) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  }

  handleClick = async () => {
    const { history, saveUserInputs } = this.props;
    const { userInput, emailInput } = this.state;
    const { getToken } = this.props;
    saveUserInputs(userInput, emailInput);
    await getToken();
    history.push('/questions');
  }

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { userInput, emailInput, isDisabled } = this.state;
    return (
      <main className="login-section">
        <img className="trivia-logo" src={ trivia } alt="Logo Trivia" />
        <form className="login-form">
          <label htmlFor="userInput">
            User:
            <input
              type="text"
              name="userInput"
              id="userInput"
              data-testid="input-player-name"
              value={ userInput }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="emailInput">
            E-mail:
            <input
              type="email"
              name="emailInput"
              id="emailInput"
              data-testid="input-gravatar-email"
              value={ emailInput }
              onChange={ this.handleChange }
            />
          </label>
          <div className="btn-section">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleSettings }
            >
              Settings
            </button>
          </div>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getToken: PropTypes.func.isRequired,
  saveUserInputs: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: (token) => dispatch(fetchToken(token)),
  saveUserInputs: (user, email) => dispatch(saveUser(user, email)),
});

export default connect(null, mapDispatchToProps)(Login);
