import React, { Component } from "react";
import Video from "../../video/video.mp4";
import Girl from "../../img/login-girl.png";


import Register from '../auth/Register';


class Landing extends Component {
  
  
  render() {
    return (
     
          <div className="v-login-page container">
            <div className="fullscreen-video-wrap">
              <video src={Video} autoPlay={true} loop={true} muted />
            </div>
            
            <div className="login-page__girl">
              <img src={Girl} alt={Girl} />
            </div>
            <Register />
          </div>
  
    );
  }
}

export default Landing;
