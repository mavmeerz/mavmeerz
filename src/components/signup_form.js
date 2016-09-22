import React, {Component, PropTypes} from 'react'
import { reduxForm } from 'redux-form'

import { Link } from 'react-router'
import { signup } from '../actions/authActions'

import * as util from '../util/style_functions'

import '../css/login.css'

class SignupForm extends Component {

  componentDidMount(){
    util.styleLogo("#FFFFFF")
  }

  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(signupData){
    this.props.signup(signupData)
    .then(() => {
      this.context.router.push('/dashboard')
    })
    .catch(err => console.error(err))
  }

  render() {
    const {fields:{name, password}, handleSubmit} = this.props
    return (
      <div className="signup-page" id="particles-js">
        <div id="login-form">
            <p className="heading" id="title">SIGNUP</p>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div>
                <input type="text" {...name} placeholder='name' className="biginput"/>
                <div className="err-msg">{name.touched ? name.error : ''}</div>
              </div>

              <div>
                <input type="password" {...password} placeholder='password' className="biginput"/>
                <div className="err-msg">{password.touched ? password.error : ''}</div>
              </div>
              <div className="btn-group">
                <button type="submit" className="btn hvr-bounce-to-left">Submit</button>
              </div>
            </form><br/>
        </div>

        <div className="auth-redirect">
          <p>Already have an account?</p>
          <Link to="/login" className="btn hvr-bounce-to-left">LOGIN</Link><br/>
        </div>

      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  if(!values.name) errors.name = 'Please enter your name'
  // if(!values.email) errors.email = 'Please enter a valid email'
  if(!values.password) errors.password = 'Please enter a password'
  return errors
}

export default reduxForm({
  form: "SignupForm",
  fields: ['name', 'password'],
  validate
}, null, {signup} )(SignupForm)

// <div className="btn-group">
//   <button type="submit" className="btn hvr-bounce-to-left">Submit</button>
// </div>
// </form>
// <Link to="/login" className="btn hvr-bounce-to-left">LOGIN</Link><br/>*/
