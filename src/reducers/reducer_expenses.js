// const _ = require('lodash');
import * as _ from 'lodash';
import moment from 'moment';

import {
  REQUEST_EXPENSES,
  RECEIVE_EXPENSES,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  PARSING_CSV,
  GET_TOTAL,
  ADD_CATEGORY,
  ADD_ACCOUNT,
<<<<<<< f84ca9e77b6e79b5f6da2ac126482b64b1f41c0f
  INITIAL_FETCH,
=======
  INITIAL_FETCH
>>>>>>> [fix] filter date works
  SHOW_ALL,
  SET_VISIBILITY_FILTER
} from '../actions/expensesActions.js';

const INITIAL_STATE = {
  expenses: [],
  total: 0,
  isFetching: false,
  startDate: null,
  endDate: null,
  filteredExpenses: [],
  allExpenses: [],
  initialFetchOccurred: false,
  visibilityFilter: 'SHOW_ALL'
}

export default function expenses(state=INITIAL_STATE, action){
  switch (action.type) {
    case INITIAL_FETCH:
      return Object.assign({}, state, {
        initialFetchOccurred: true
      })
      break;
    case REQUEST_EXPENSES:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
      break;
    case RECEIVE_EXPENSES:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        expenses: action.expenses,
        // allExpenses: action.expenses
      })
    case UPLOAD_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
      break;
    case UPLOAD_SUCCESS:
    console.log('upload success in expenses reducer', state.expenses, action.expenses)
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        expenses: state.expenses.concat(action.expenses)
      })
      break;
    case PARSING_CSV:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      })
      break;
    case GET_TOTAL:
      return Object.assign({}, state, {
        total: action.total
      })
      break;
    case ADD_CATEGORY:
      if (action.expenses.data.length) {
        return Object.assign({}, state, {
          expenses: action.expenses.data
        })
      }
      return state;
      break;
    case ADD_ACCOUNT:
      if (action.expenses.length) {
        /////// TEMP ///////
        //add to object for now until backend complete//
        let clonedState = _.cloneDeep(state);
        for (let i = 0; i < action.expenses.length; i++) {
          let expenseID = action.expenses[i];
          for (let j = 0; j < clonedState.expenses.length; j++) {
            let currentExpense = clonedState.expenses[j];
            if (currentExpense.id == expenseID) {
              currentExpense.account = action.account;
              break;
            }
          }
        }
        return Object.assign({}, state, {
          expenses: clonedState.expenses
        });
      }
      return state;
      break;
<<<<<<< f84ca9e77b6e79b5f6da2ac126482b64b1f41c0f
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.visibilityFilter,
        startDate: action.startDate,
        endDate: action.endDate
      });
      break;
    case SHOW_ALL:
      // console.log('****> in reducer show_all', action.expenses, action.allExpenses)
      return Object.assign({}, state, {
        visibilityFilter: action.visibilityFilter,
        startDate: null,
        endDate: null
      });
      break;
=======
    // case FILTER_DATE:
    //   let startDate = action.startDate.slice(0, 10);
    //   let endDate = action.endDate.slice(0, 10);
    //     // console.log('=======> state.expenses: ', state.expenses);
    //     console.log('=====> startDate: ', startDate);
    //     console.log('=====> endDate: ', endDate);
    //
    //   return Object.assign({}, state, {
    //     startDate: startDate,
    //     endDate: endDate
    //   });
    //   break;
    // case SHOW_ALL:
    //   console.log('****> in reducer show_all', action.expenses, action.allExpenses)
    //   return Object.assign({}, state, {
    //     visibilityFilter: action.visibilityFilter,
    //     startDate: null,
    //     endDate: null
    //   });
    //   break;
>>>>>>> [fix] filter date works
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.visibilityFilter,
        startDate: action.startDate,
        endDate: action.endDate
      });
      break;
    default:
      return state;
  }
}
