import React, { Component } from 'react'
import CameraIcon from "../../img/camera-icon.png";



import {Link} from 'react-router-dom';

class Register extends Component {
  render() {
    return (
        <div className="login-page__content login-page__animated">
        <div className="login-page__content--top">
          <h1>analogovo</h1>
          <div className="lines">
            <span>XXX</span>
          </div>
          <p>analog photography community</p>
          <form id="form">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
            />

            <input type="text" name="lastName" placeholder="Last Name" />
            <input type="email" name="email" placeholder="Email" />

            <input
              type="password"
              name="password"
              placeholder="Password"
            />
          </form>
        </div>
        <div className="login-page__content--bottom">
          <div
            className="camera-icon"
            style={{ backgroundImage: `url(${CameraIcon})` }}
          />
          <button href="#" form="form">
            join now
          </button>
          <p>
            Already have an account?{" "}
            <Link className="sign-in" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    )
  }
}

export default Register
