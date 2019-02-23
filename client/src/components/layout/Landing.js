import React, { Component } from "react";
import Video from "../../video/video.mp4";
import Girl from "../../img/login-girl.png";
import CameraIcon from "../../img/camera-icon.png";


class Landing extends Component {
  state = {
    formSignup: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    formLogin: {
      email: "",
      password: ""
    },
    player: {
      muted: false
    }
  };

  render() {
    return (
     
          <div className="v-login-page container">
            <div className="fullscreen-video-wrap">
              <video src={Video} autoPlay={true} loop={true} muted />
            </div>
            
            <div className="login-page__girl">
              <img src={Girl} alt={Girl} />
            </div>
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
                  <span className="sign-in" onClick={this.signIn}>
                    Sign in
                  </span>
                </p>
              </div>
            </div>
          </div>
  
    );
  }
}

export default Landing;
