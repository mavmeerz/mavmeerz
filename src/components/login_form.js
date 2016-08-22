import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import '../css/signup.css'
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
        <div className="form">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <h1>Login</h1>
              <div>
                <input type="text" {...email} placeholder='name' className="biginput"/>
                <div className="err-msg">{email.touched ? email.error : ''}</div>
              </div>

              <div>
                <input type="password" {...password} placeholder='password' className="biginput"/>
                <div className="err-msg">{password.touched ? password.error : ''}</div>
              </div>

              <button type="submit" className="button button-block">Submit</button>

          </form><br/>
          <Link to="/signup" className="button button-block">SIGNUP</Link>
        </div>
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
