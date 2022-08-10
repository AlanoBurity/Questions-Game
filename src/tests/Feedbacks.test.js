import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Testing Feedback page', () => {
    it("Should render all page's elements", () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const score = screen.getByTestId('feedback-total-question');
    const assertions = screen.getByTestId('feedback-total-question');
    const logo = screen.getByRole('img', {
        name: /logo trivia/i
      });
    const gravatar = screen.getByRole('img', {
        name: /avatar/i
      });
    const signIn = screen.getByRole('heading', {
        name: /sign in/i
      });
    const scoreTitle = screen.getByRole('heading', {
        name: /score:/i
      });
    const scoreHeader = screen.getByTestId('header-score');
    const feedback = screen.getByTestId('feedback-text');
    const buttonPlay = screen.getByTestId('btn-play-again');
    const buttonRanking = screen.getByTestId('btn-ranking');

    expect(score).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(gravatar).toBeInTheDocument();
    expect(signIn).toBeInTheDocument();
    expect(scoreTitle).toBeInTheDocument();
    expect(scoreHeader).toBeInTheDocument();
    expect(feedback).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonRanking).toBeInTheDocument();

    userEvent.click(buttonRanking);

    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');

    });

    it("Should render all page's elements", () => {
        const { history } = renderWithRouterAndRedux(<Feedback />);
        const buttonPlay = screen.getByTestId('btn-play-again');
   
        userEvent.click(buttonPlay);
    
        const { pathname } = history.location;
        expect(pathname).toBe('/');
    
        });
  });
