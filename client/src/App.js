import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Landing from './components/layout/Landing';
import Login from './components/auth/Login';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path='/' component={Landing}/>
          <div className="containerApp">
            <Route exact path="/login" component={Login} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
