import Axios from 'axios'

export const REQUEST_EXPENSES = 'REQUEST_EXPENSES';
export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';
export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAIL = 'UPLOAD_FAIL';
export const PARSING_CSV = 'PARSING_CSV';
export const GET_TOTAL = 'GET_TOTAL';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const INITIAL_FETCH = 'INITIAL_FETCH';
export const SHOW_FILTERED_DATE = 'SHOW_FILTERED_DATE';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const SHOW_ALL = 'SHOW_ALL';

//ACTION CREATORS FOR FETCHING AND RECEIVING EXPENSES FROM SERVER
export function toggleFetched(){
  return {
    type: INITIAL_FETCH
  }
}
export function requestExpenses(){
  return {
    type: REQUEST_EXPENSES,
    isFetching: true
  };
}
export function receiveExpenses(expenses){
  return {
    type: RECEIVE_EXPENSES,
    expenses: expenses,
    isFetching: false
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
    // isFetching: false,
    uploadSuccess: true,
    expenses: response
  };
}
export function uploadFail() {
  console.log('=====> got to uploadFAAILR');
  return {
    type: UPLOAD_FAIL,
    isFetching: false
  };
}
export function parsingCSV() {
  return {
    type: PARSING_CSV,
    // isFetching: true
  };
}
//-----------------------------

//TOTAL ACTION CREATORS
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
//-----------------------

//CATEGORIES ACTION CREATOR
function addCategory(expenses){
  return {
    type: ADD_CATEGORY,
    expenses: expenses
  };
}

//ACCOUNTS ACTION CREATOR
function addAccount(expenses, account) {
  return {
    type: ADD_ACCOUNT,
    expenses: expenses,
    account: account
  };
}

//VISIBILITY FILTER ACTION CREATORS
export const setVisibilityFilter = (visibilityFilter, endDate, startDate) => {
  return {
    type: SET_VISIBILITY_FILTER,
    visibilityFilter: visibilityFilter,
    endDate: endDate,
    startDate: startDate
  }
}

export const showAllExpenses = () => {
  return {
    type: SHOW_ALL
  }
}

export const showFilteredExpenses = () => {
  return {
    type: SHOW_FILTERED_DATE
  }
}
//--------------------------------------

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
    });
  }
}

//
export function updateCategories(expenses, category){
  return dispatch => {
    return Axios({
      method: 'PUT',
      url: '/v1/api/expenses',
      headers: {'x-access-token': window.localStorage.getItem('zenmoToken')},
      data:  {expenses: expenses, category: category}
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
