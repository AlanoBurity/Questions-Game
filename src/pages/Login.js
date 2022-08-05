import React, { Component } from 'react';

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
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
