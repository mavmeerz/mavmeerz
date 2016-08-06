import Axios from 'axios'
/*
Axios + redux-promise http request to server for expenses
  -> When redux-promise is used (it is imported in configureStore.js),
  .then / .catch are automatically taken care of. Becasue the return object
  includes 'payload' property with a value of the Axios request, redux-promise
  knows to wait to return object until the status of the Axios request changes
  from 'pending' to 'success'
*/

export const REQUEST_EXPENSES = 'REQUEST_EXPENSES';
export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';
export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';
export const PARSING_CSV = 'PARSING_CSV';
export const GET_TOTAL = 'GET_TOTAL';


//ACTION CREATORS FOR FETCHING AND RECEIVING EXPENSES FROM SERVER

/*
Action creator
Notifies state that expenses have been requested -> signal 'load feature'
*/
function requestExpenses(){
  return {
    type: REQUEST_EXPENSES,
    isFetching: true
  };
}
//Action creator
function uploadRequest(){
  return {
    type: UPLOAD_REQUEST,
    isFetching: true
  };
}
//Action creator
function receiveExpenses(expenses){
  return {
    type: RECEIVE_EXPENSES,
    isFetching: false,
    expenses: expenses
  };
}
//Action creator
function uploadSuccess(response){
  return {
    type: UPLOAD_SUCCESS,
    isFetching: false,
    expenses: response
  };
}

//Action creator
export function parsingCSV() {
  return {
    type: PARSING_CSV,
    isFetching: true
    // expenses: response
  };
}

//Action creator
function getTotal(total) {
  return {
    type: GET_TOTAL,
    total: total
  }
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

/*
Async Action creator
Create async flow that notifies state of different stages of fetching expenses
as the expenses are requested and received
*/
export function fetchExpenses(){
  return dispatch => {
    dispatch(requestExpenses())
    return Axios.get("/v1/api/expenses/")
      .then(res => dispatch(receiveExpenses(res.data)))
      .catch(err => console.error(err))
  }
}

//Async Action for sending a post request to upload CSV
export function uploadCSV(csv){
  return dispatch => {
      dispatch(uploadRequest())
      return Axios({
        method: 'POST',
        url: '/v1/api/expenses',
        data: {expenses: csv}
      })
    .then(res =>  {
      dispatch(uploadSuccess(res.data))
      dispatch(getTotal(computeTotal(res.data)))
    })
    .catch(err => console.error(err))
  }
}
