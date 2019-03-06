import React, { Component } from 'react'
import CameraIcon from "../../img/camera-icon.png";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import classnames from 'classnames'

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

        const userData = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginUser(userData)
    }

    componentWillReceiveProps(nextProps) {

      if(nextProps.auth.isAuthenticated) {
        this.props.history.push('/dashboard')
      }

      if(nextProps.errors) {
        this.setState({errors: nextProps.errors})
      }
    }

    componentDidMount() {
      if(this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard')
      }
    }

  render() {
    const {errors} = this.state;
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
            <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.onLoginHandler}
            className={classnames({'is-invalid': errors.email})}/>
            {errors.email && <p className="flyin-animation">{errors.email}</p>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onLoginHandler}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Login);
