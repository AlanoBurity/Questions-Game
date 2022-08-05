import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken } from '../redux/actions';

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
      if (userInput.length !== 0 && emailInput.length !== 0) {
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

  handleClick = () => {
    const { history, getToken } = this.props;
    getToken();
    history.push('/questions');
  }

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { userInput, emailInput, isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="userInput">
            User:
            <input
              type="text"
              name="userInput"
              id="user-input"
              data-testid="input-player-name"
              value={ userInput }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="emailInput">
            Email:
            <input
              type="email"
              name="emailInput"
              id="email-input"
              data-testid="input-gravatar-email"
              value={ emailInput }
              onChange={ this.handleChange }
            />
          </label>
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
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  getToken: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: (token) => dispatch(fetchToken(token)),
});

export default connect(null, mapDispatchToProps)(Login);
