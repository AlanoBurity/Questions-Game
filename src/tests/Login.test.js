import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testing Login page', () => {
    it("Should render all page's elements", () => {
      const { history } = renderWithRouterAndRedux(<App />);

      const userInput = screen.getByTestId("input-player-name");
      const emailInput = screen.getByTestId("input-gravatar-email");
      const settingsBtn = screen.getByRole('button', {
        name: /settings/i });
      const playBtn = screen.getByTestId("btn-play");
      
      expect(userInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(settingsBtn).toBeInTheDocument();
      expect(playBtn).toBeInTheDocument();
      expect(playBtn).toBeDisabled();

      userEvent.type(userInput, 'teste');

      expect(playBtn).toBeDisabled();

      userEvent.type(emailInput,'alguem@gmail');

      expect(playBtn).toBeDisabled();

      userEvent.type(emailInput,'alguem@gmail.com');

      expect(playBtn).not.toBeDisabled();

      userEvent.click(playBtn);
      const { pathname } = history.location;
      expect(pathname).toBe('/questions');

    });

    it("Should render all page's elements", () => {
        const { history } = renderWithRouterAndRedux(<App />);
  
        const settingsBtn = screen.getByRole('button', {
          name: /settings/i });
        
        expect(settingsBtn).toBeInTheDocument();
  
        userEvent.click(settingsBtn);
  
        const { pathname } = history.location;
        expect(pathname).toBe('/settings');
      });
  });
