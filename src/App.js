import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Questions from './pages/Questions';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/questions" exact component={ Questions } />
      <Route path="/settings" exact component={ Settings } />
    </Switch>
  );
}
