import React, { Component } from 'react'
import CameraIcon from "../../img/camera-icon.png";

import axios from 'axios';
import classnames from 'classnames'



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

        axios.post('/api/users/register', newUser)
          .then(res => console.log(res.data))
          .catch(err => this.setState({errors: err.response.data}))

    }

  render() {
    const {errors} = this.state;
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
              className={classnames({'is-invalid': errors.name})}
              value={this.state.name}
              onChange={this.onRegisterHandler}
            />
            {errors.name && <p className="flyin-animation">{errors.name}</p>}
            <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.onRegisterHandler} className={classnames({'is-invalid': errors.email})}/>
            {errors.email && <p className="flyin-animation">{errors.email}</p>}
            <input type="text" name="camera" placeholder="Camera" value={this.state.camera} onChange={this.onRegisterHandler} className={classnames({'is-invalid': errors.camera})}/>
            {errors.camera && <p className="flyin-animation">{errors.camera}</p>}
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onRegisterHandler}
              className={classnames({'is-invalid': errors.password})}
              
            />
            {errors.password && <p className="flyin-animation">{errors.password}</p>}
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
