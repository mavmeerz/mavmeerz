import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import Nav_Auth from './Nav_Auth'
import MainContent from './MainContent'

import * as util from '../util/style_functions'
import { signup } from '../actions/authActions'

import {Link} from 'react-router'

import '../css/auth-view.css'
import '../css/navbar.css'

class AuthView extends Component {

  static contextTypes = {
        router: PropTypes.object
  }

  componentWillMount() {
        if(this.props.isAuth && window.localStorage.getItem('zenmoToken')){
          this.context.router.push('/dashboard')
        }
  }

  componentDidMount(){
        this.context.router.push('/main');
  }

  render() {
        return (
          <div>
            <Nav_Auth

            />
            <video id="frontpage-video" autoPlay loop>
              <source src="http://d27shkkua6xyjc.cloudfront.net/videos/maaemo-film-2.mp4?mtime=20141113185431" type="video/mp4"/>
              <source src="http://d27shkkua6xyjc.cloudfront.net/videos/maaemo-film-2.ogv?mtime=20141113185421" type="video/ogg"/>
            </video>
            {this.props.children}
          </div>
        )
      }
}

function mapStateToProps(state){
  return {
    isAuth: state.isAuth
  }
}

export default connect(
  mapStateToProps,
  {signup: signup}
)(AuthView)
