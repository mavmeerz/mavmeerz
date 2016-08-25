import { combineReducers } from 'redux'

import expensesReducer from './reducer_expenses'
import authReducer from './reducer_auth'
import budgetReducer from './reducer_budget'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'


const appReducer = combineReducers({
  expensesReducer,
  budget: budgetReducer,
  isAuth: authReducer,
  routing: routerReducer,
  form: formReducer
});

const rootReducer = (state, action) => {
  if (action.type == 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducer;
