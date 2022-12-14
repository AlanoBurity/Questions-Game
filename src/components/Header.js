import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import trivia from '../trivia.png';

class Header extends Component {
  render() {
    const { userName, email, score } = this.props;
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
            <h3 data-testid="header-score">{ score }</h3>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  userName: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
