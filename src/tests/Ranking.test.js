import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testing Ranking page', () => {
    it("Should render all page's elements", () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const mockRanking = [
        {
        name: 'primeira pessoa',
        score: 100,
        picture: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e',
       },
       {
        name: 'segunda pessoa',
        score: 90,
        picture: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e',
       },
       {
        name: 'terceira pessoa',
        score: 70,
        picture: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e',
       },
    ];

    localStorage.setItem('ranking', JSON.stringify(mockRanking));

    history.push('/ranking');

    const title = screen.getByTestId('ranking-title');
    const buttonLogin = screen.getByTestId('btn-go-home');

    expect(title).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();

    userEvent.click(buttonLogin);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    });

    // it("Should render all page's elements", () => {
    //     const { history } = renderWithRouterAndRedux(<Feedback />);

    //     const title = screen.getByTestId('ranking-title');
    //     const buttonLogin = screen.getByTestId('btn-go-home');
    
    //     expect(title).toBeInTheDocument();
    //     expect(buttonLogin).toBeInTheDocument();
    
    //     // userEvent.click(buttonLogin);
    
    //     // const { pathname } = history.location;
    //     // expect(pathname).toBe('/login');
    
    //     });
  });