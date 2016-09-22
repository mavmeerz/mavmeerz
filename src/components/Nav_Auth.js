import React from 'react'
import { Link, IndexLink } from 'react-router'
import '../css/navbar.css'

const Nav_Auth = () => (
  <header className='nav' role='banner'>

    <IndexLink
      to="/main"
      className="item nav-logo">
      ZENMO
    </IndexLink>

    <Link to="/signup" className="signup item-nav">Signup</Link>
    <Link to="/login" className="login item-nav">Login</Link>


  </header>
)

export default Nav_Auth

const onGuestUserClick = (e) => {
  e.preventDefault()
  const guestUserData = {
    name: 'Guest User',
    password: 'guest'
  }
  //signup using guest data
  this.props.signup(guestUserData)
  .then(() => {
    this.context.router.push('/dashboard')
  })
  //automatically upload guestUserTransactions
  .catch(err => console.error(err))
}

// <a
//   className="guest-user item-nav"
//   onClick={e => onGuestUserClick(e)}>
//     Continue As Guest
// </a>
