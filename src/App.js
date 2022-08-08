import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/questions" exact component={ Game } />
      <Route path="/settings" exact component={ Settings } />
    </Switch>
  );
}
