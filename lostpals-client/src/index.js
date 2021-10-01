import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BaseLayout from './components/BaseLayout';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import MyPetsPage from './pages/MyPetsPage';
import AddPetPage from './pages/AddPetPage';
import { Provider } from 'react-redux';
import UserIdReducer from './stores/reducers/userIdReducer';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import FetchMyPetsReducer from './stores/reducers/fetchMyPetsReducer';
import ReportLostPetPage from './pages/ReportLostPetPage';
import LostPetsGalleryPage from './pages/LostPetsGalleryPage';
import FetchLostPetsReducer from './stores/reducers/fetchLostPetsReducer';
import LostPetDetailsPage from './pages/LostPetDetailsPage';
import PetDataReducer from './stores/reducers/petDataReducer';

const reducer = combineReducers({
  userRed: UserIdReducer,
  fetchMyPetsRed: FetchMyPetsReducer,
  fetchLostPetsRed: FetchLostPetsReducer,
  petDataRed: PetDataReducer
})

const composeEnhaners = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhaners(applyMiddleware(thunk)))


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/register' component={RegistrationPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/my-pets' component={MyPetsPage} />
          <Route path='/add-pet' component={AddPetPage} />
          <Route path='/report-lost-pet' component={ReportLostPetPage} />
          <Route path='/lost-pet-gallery' component={LostPetsGalleryPage} />
          <Route path='/lost-pet-details' component={LostPetDetailsPage} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

