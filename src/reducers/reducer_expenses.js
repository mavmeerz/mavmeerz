import {
  REQUEST_EXPENSES,
  RECEIVE_EXPENSES,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  PARSING_CSV,
  GET_TOTAL
} from '../actions/expensesActions.js';

const INITIAL_STATE = {expenses: [], total: 0, isFetching: false}

export default function expenses(state=INITIAL_STATE, action){
  switch (action.type) {
    case REQUEST_EXPENSES:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
      break;
    case RECEIVE_EXPENSES:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        expenses: action.expenses
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
    default:
      return state;
  }
}
