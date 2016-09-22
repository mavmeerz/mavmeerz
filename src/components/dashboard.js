import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link, IndexLink } from 'react-router';

import ReactAnimate from 'react-addons-css-transition-group';

import ExpensesApp from '../containers/ExpensesApp.js';
import BudgetApp from '../containers/BudgetApp';
import Sidebar from '../containers/SidebarApp';
import Navbar from './Navbar';
import DashLinks from './DashLinks'

import '../css/dashboard.css';

import { logout } from '../actions/authActions';

class Dashboard extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    if(!this.props.isAuth){
      this.context.router.push('/login');
    } else {
      this.context.router.push('/transactions');
    }
  }

  render() {
    return (
      <div className="dash">
        <Navbar logout={this.props.logout.bind(this)} />

        <DashLinks/>

        <div className="data">
          <div className="sidebar">
            <Sidebar/>
          </div>

          <div className="tables-container">
            {this.props.children}
          </div>
        </div>

      </div>
    )
  }

}

export default connect(
  (state)=>{
    return {
      isAuth: state.isAuth
    };
  },
  {
    logout: logout
  }
)(Dashboard)
