import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Testing Feedback page', () => {
    it("Should render all page's elements", () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const score = screen.getByTestId('feedback-total-question');
    // const score = screen.getByRole('heading', { name: /100/i, level: 3});

    expect(score).toBeInTheDocument();
    });
  });
