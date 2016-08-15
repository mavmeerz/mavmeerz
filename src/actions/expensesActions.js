import Axios from 'axios'

export const REQUEST_EXPENSES = 'REQUEST_EXPENSES';
export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';
export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
export const PARSING_CSV = 'PARSING_CSV';
export const GET_TOTAL = 'GET_TOTAL';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
// export const TOGGLE_MODAL = 'TOGGLE_MODAL';

//ACTION CREATORS FOR FETCHING AND RECEIVING EXPENSES FROM SERVER
export function requestExpenses(){
  return {
    type: REQUEST_EXPENSES,
    isFetching: true
  };
}
export function receiveExpenses(expenses){
  return {
    type: RECEIVE_EXPENSES,
    isFetching: false,
    expenses: expenses
  };
}

//UPLOAD ACTIONS CREATORS
export function uploadRequest(){
  return {
    type: UPLOAD_REQUEST,
    isFetching: true
  };
}
export function uploadSuccess(response){
  return {
    type: UPLOAD_SUCCESS,
    isFetching: false,
    expenses: response
  };
}
export function parsingCSV() {
  return {
    type: PARSING_CSV,
    isFetching: true
    // expenses: response
  };
}



//TOTAL ACTION CREATOR
export function getTotal(total) {
  return {
    type: GET_TOTAL,
    total: total
  };
}
function computeTotal(expensesArr){
  let total = 0
  if (expensesArr) {
    for (var i = 0; i < expensesArr.length; i++) {
      let expense = expensesArr[i]
      total += expense.amount
    }
  }
  return total;
}

//CATEGORIES ACTION CREATORS
function addCategory(expenses){
  return {
    type: ADD_CATEGORY,
    expenses: expenses
  };
}

//ACCOUNTS ACTION CREATORS
function addAccount(expenses, account) {
  return {
    type: ADD_ACCOUNT,
    expenses: expenses,
    account: account
  };
}

//DATE PICKER ACTION CREATOR
// function toggleDatePickerModal() {
//   return {
//     type: TOGGLE_MODAL
//   }
// }
/*
~~~~~~~ ASYNC ACTION CREATORS ~~~~~~~~
*/
export function fetchExpenses(){
  return dispatch => {
    dispatch(requestExpenses())
    return Axios.get("/v1/api/expenses/", {
      headers: {'x-access-token': window.localStorage.getItem('zenmoToken')}
    })
      .then(res => {
        dispatch(receiveExpenses(res.data))
        dispatch(getTotal(computeTotal(res.data)))
      })
      .catch(err => console.error(err))
  }
}

//Async Action for sending a post request to upload CSV
export function uploadCSV(account, csv){
  return dispatch => {
      dispatch(uploadRequest())
      return Axios({
        method: 'POST',
        url: '/v1/api/expenses',
        headers: {'x-access-token': window.localStorage.getItem('zenmoToken')},
        data: {account: account, expenses: csv}
      })
    .then(res =>  {
      dispatch(uploadSuccess(res.data))
      dispatch(getTotal(computeTotal(res.data)))
    })
    .catch(err => console.error(err))
  }
}

//
export function updateCategories(expenses, category){
  return dispatch => {
    return Axios.put('/v1/api/expenses/', {
      token: window.localStorage.getItem('zenmoToken'),
      expenses: expenses,
      category: category
    })
    .then(expenses => {
      dispatch(addCategory(expenses))
    })
    .catch(err => console.error(err))
  }
}

export function updateAccounts(expenses, account) {
  return dispatch => {
    dispatch(addAccount(expenses, account));
  };
}
