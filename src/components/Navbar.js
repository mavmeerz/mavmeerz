import React, { Component, PropTypes } from 'react';
import Axios from 'axios';
import { Link } from 'react-router';
import '../css/navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  onClick() {
    window.localStorage.removeItem('zenmoToken');
    this.props.logout();
  }

  render() {
    return (
      <nav class='fixed-nav-bar'>
        <ul className="nav">
          <li className="nav-logo"><Link to='/' classname='nav-logo'>ZENMO</Link></li>
          <li className="nav-item"><Link to='/login' classname='nav-logo'>About</Link></li>
          <li className="nav-item"><Link to='/login' classname='nav-logo'>Dev Team</Link></li>
          <li className="nav-item"><a href='#' onClick={this.onClick} classname='nav-logo'>Logout</a></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar
