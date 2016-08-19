// const _ = require('lodash');
import * as _ from 'lodash';
import moment from 'moment';

import {
  REQUEST_EXPENSES,
  RECEIVE_EXPENSES,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  PARSING_CSV,
  GET_TOTAL,
  ADD_CATEGORY,
  ADD_ACCOUNT,
  INITIAL_FETCH,
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
        // isFetching: action.isFetching
      })
      break;
    case UPLOAD_SUCCESS:
    console.log('action in UPLOAD_SUCCESS: ', action);
    console.log('upload success in expenses reducer', state.expenses, action.expenses)
      return Object.assign({}, state, {
        // isFetching: action.isFetching,
        uploadSuccess: action.uploadSuccess,
        expenses: state.expenses.concat(action.expenses)
      })
      break;
    case UPLOAD_FAIL:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });
      break;
    case PARSING_CSV:
      return Object.assign({}, state, {
        // isFetching: action.isFetching,
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
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.visibilityFilter,
        startDate: action.startDate,
        endDate: action.endDate
      });
      break;
    // case SHOW_ALL:
    //   // console.log('****> in reducer show_all', action.expenses, action.allExpenses)
    //   return Object.assign({}, state, {
    //     visibilityFilter: action.visibilityFilter,
    //     startDate: null,
    //     endDate: null
    //   });
    //   break;
    // case SET_VISIBILITY_FILTER:
    //   return Object.assign({}, state, {
    //     visibilityFilter: action.visibilityFilter,
    //     startDate: action.startDate,
    //     endDate: action.endDate
    //   });
      // break;
    default:
      return state;
  }
}
