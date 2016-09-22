import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import KarmoMeter from '../containers/KarmoMeterApp'

import {Link} from 'react-router'

import '../css/auth-view.css'

class AuthView extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    if(this.props.isAuth){
      this.context.router.push('/dashboard')
    }
  }

  render() {
    return (
      <div className="auth-view">

        <KarmoMeter />

        <div className="auth-view-logo">
          <h1 className="logo">ZENMO</h1>
          <p className="slogan">Financial Nirvana</p>
        </div>

        <div className='signup'>
          <p className="text">Begin Your Journey <br/> to Mindful Budgeting</p>
          <Link to="/signup" className="btn hvr-bounce-to-left text">SIGNUP</Link>
        </div>

        <div className='login'>
          <p className="text">Or Continue To Collect <br/> Budget Karma</p>
          <Link to="/login" className="btn hvr-bounce-to-left text">LOGIN</Link>
        </div>
        <video id="frontpage-video" autoPlay loop>
          <source src="http://d27shkkua6xyjc.cloudfront.net/videos/maaemo-film-2.mp4?mtime=20141113185431" type="video/mp4"/>
          <source src="http://d27shkkua6xyjc.cloudfront.net/videos/maaemo-film-2.ogv?mtime=20141113185421" type="video/ogg"/>
        </video>

      </div>
    )
  }
}

const propTypes = {
  isAuth: PropTypes.bool.isRequired
}

export default connect(
  (state)=>{
    return {
      isAuth: state.isAuth
    }
  })(AuthView)
