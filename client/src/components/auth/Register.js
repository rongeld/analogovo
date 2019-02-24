import React, { Component } from 'react'
import CameraIcon from "../../img/camera-icon.png";



import {Link} from 'react-router-dom';

class Register extends Component {

    state = {
        name: '',
        email: '',
        camera: '',
        password: '',
        errors: {}
    }

    onRegisterHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            camera: this.state.camera,
            password: this.state.password,
        }

        console.log(newUser)
    }

  render() {
    return (
        <div className="login-page__content login-page__animated">
        <div className="login-page__content--top">
          <h1>analogovo</h1>
          <div className="lines">
            <span>XXX</span>
          </div>
          <p>analog photography community</p>
          <form id="form" onSubmit={this.onSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.onRegisterHandler}
            />
            <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.onRegisterHandler}/>
            <input type="text" name="camera" placeholder="Camera" value={this.state.camera} onChange={this.onRegisterHandler}/>
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onRegisterHandler}
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
