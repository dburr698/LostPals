import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BaseLayout from './components/BaseLayout';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/register' component={RegistrationPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/account' component={AccountPage} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

