import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BaseLayout from './components/BaseLayout';




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

