import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import '../css/signup.css'
import {Link} from 'react-router'
import {signup} from '../actions/authActions'

import Nav_Auth from './Nav_Auth'

class SignupForm extends Component {
  constructor(props){
    super(props)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(signupData){
    this.props.signup(signupData)
    .then(() => {
      this.context.router.push('/dashboard')
    })
  }

  render() {
    const {fields:{name, email, password}, handleSubmit} = this.props
    return (
      <div>
        <Nav_Auth/>
        <div className="form">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <h1>Signup</h1>
            <div>
              <input type="text" {...name} placeholder='name' className="biginput"/>
              <div className="err-msg"> {name.touched ? name.error : ''}</div>
            </div>

            <div>
              <input type="text" {...email} placeholder='email' className="biginput"/>
              <div className="err-msg">{email.touched ? email.error : ''}</div>
            </div>

            <div>
              <input type="password" {...password} placeholder='password' className="biginput"/>
              <div className="err-msg">{password.touched ? password.error : ''}</div>
            </div>
              <button type="submit" className="button button-block">Submit</button>
          </form><br/>
          <Link to="/login" className="button button-block">LOGIN</Link><br/>
        </div>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  if(!values.name) errors.name = 'Pleae enter a valid name'
  if(!values.email) errors.email = 'Please enter a valid email'
  if(!values.password) errors.password = 'Please enter a password'
  return errors
}

export default reduxForm({
  form: "SignupForm",
  fields: ['name', 'email', 'password'],
  validate
}, null, {signup} )(SignupForm)

// <div className="btn-group">
//   <button type="submit" className="btn hvr-bounce-to-left">Submit</button>
// </div>
// </form>
// <Link to="/login" className="btn hvr-bounce-to-left">LOGIN</Link><br/>*/
