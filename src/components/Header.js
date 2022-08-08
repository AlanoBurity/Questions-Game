import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import trivia from '../trivia.png';

class Header extends Component {
  render() {
    const { userName, email } = this.props;
    const hash = md5(email).toString();
    return (
      <header>
        <div className="header-container">
          <div className="avatar">
            <h1 data-testid="header-player-name">{ userName }</h1>
            <img
              src={ `https://www.gravatar.com/avatar/${hash}` }
              alt="avatar"
              data-testid="header-profile-picture"
              className="avatar-image"
            />
          </div>
          <img className="trivia-header" src={ trivia } alt="Logo Trivia" />
          <div className="score-section">
            <h2>Score:</h2>
            <h3 data-testid="header-score">0</h3>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userReducer.user,
  email: state.userReducer.email,
});

Header.propTypes = {
  userName: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
