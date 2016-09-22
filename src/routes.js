import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './App'
import AuthView from './components/auth_view'
import LoginForm from './components/login_form'
import SignupForm from './components/signup_form'
import Dashboard from './components/dashboard'
import ExpensesApp from './containers/ExpensesApp'
import BudgetApp from './containers/BudgetApp'
import MainContent from './components/MainContent'

export default (
  <Route path='/' component={App}>
      <IndexRoute component={AuthView}/>
      <Route path='/' component={AuthView}>
          <IndexRoute component={MainContent}/>
          <Route path='/main' component={MainContent}/>
          <Route path='/signup' component={SignupForm}/>
          <Route path='/login' component={LoginForm}/>
      </Route>
      <Route path='/dashboard' component={Dashboard}>
          <IndexRoute component={ExpensesApp}/>
          <Route path='/transactions' component={ExpensesApp}/>
          <Route path='/budget' component={BudgetApp}/>
      </Route>
  </Route>
)
