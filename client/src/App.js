import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';

import Landing from './components/layout/Landing';
import Login from './components/auth/Login';

import {Provider} from 'react-redux';

import './App.css';

//check for token
if(localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and take user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // SetUser and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Route exact path='/' component={Landing}/>
            <div className="containerApp">
              <Route exact path="/login" component={Login} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
