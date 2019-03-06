import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CameraIcon from "../../img/camera-icon.png";
import {connect} from 'react-redux';
import {registeruser} from '../../actions/authActions';
import {withRouter} from 'react-router-dom';

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

      

        this.props.registeruser(newUser, this.props.history);

    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({errors: nextProps.errors});
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

Register.propTypes = {
  registeruser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {registeruser})(withRouter(Register))
