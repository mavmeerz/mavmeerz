import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'

import {Link} from 'react-router'
import { login } from '../actions/authActions'

import Nav_Auth from './Nav_Auth'

class LoginForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount(){
    window.localStorage.removeItem('zenmoToken');
  }

  onSubmit(loginData){
    this.props.login(loginData)
    .then((response) => {
      if(response.payload.status < 300){
        this.context.router.push('/dashboard');
      }
    })
  }

  render() {
    const {fields:{email, password}, handleSubmit} = this.props;
    return (
      <div>
        <Nav_Auth/>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <p className="heading">Login</p>
            <div>
              <input type="text" {...email} placeholder='name' className="biginput"/>
              <div className="err-msg">{email.touched ? email.error : ''}</div>
            </div>

            <div>
              <input type="password" {...password} placeholder='password' className="biginput"/>
              <div className="err-msg">{password.touched ? password.error : ''}</div>
            </div>
          <div className="btn-group">
            <button type="submit" className="btn hvr-bounce-to-left">Submit</button>
          </div>
        </form>
        <Link to="/signup" className="btn hvr-bounce-to-left">SIGNUP</Link>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};
  if(!values.email) errors.email = 'Please enter a valid email';
  if(!values.password) errors.password = 'Please enter a password';
  return errors;
}

export default reduxForm({
  form: "LoginForm",
  fields: ['email', 'password'],
  validate
}, null, {login} )(LoginForm)
