import React, { Component } from 'react'
import CameraIcon from "../../img/camera-icon.png";

import LoginBG from '../../img/login_bg.jpg'


import {Link} from 'react-router-dom';

class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: {}
    }

    onLoginHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        console.log(user)
    }

  render() {
    return (
      <div className="login-page__wrapper" style={{backgroundImage: `url(${LoginBG})`, backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
        <div className="login-page__content no-margin">
        <div className="login-page__content--top login-page__content--top-bg">
          <h1>analogovo</h1>
          <div className="lines">
            <span className="white-color">XXX</span>
          </div>
          <p className="white-color">analog photography community</p>
          <form id="form" onSubmit={this.onSubmit}>
            <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.onLoginHandler}/>
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onLoginHandler}
            />
          </form>
        </div>
        <div className="login-page__content--bottom">
          <div
            className="camera-icon"
            style={{ backgroundImage: `url(${CameraIcon})` }}
          />
          <button href="#" form="form">
            Sign In
          </button>
          <p>
            Don`t have an account?{" "}
            <Link className="sign-in" to="/">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      </div>
    )
  }
}

export default Login
