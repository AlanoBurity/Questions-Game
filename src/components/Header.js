import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { userName, email } = this.props;
    const hash = md5(email).toString();
    return (
      <div>
        <h1 data-testid="header-player-name">{ userName }</h1>
        <h1 data-testid="header-score">0</h1>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="avatar"
          data-testid="header-profile-picture"
        />
      </div>
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
