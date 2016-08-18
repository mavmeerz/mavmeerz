import Axios from 'axios'

export const REQUEST_BUDGET = 'REQUEST_BUDGET'
export const RECEIVE_BUDGET = 'RECEIVE_BUDGET'

function requestBudgetItems(){
  return {
    type: REQUEST_BUDGET,
    isFetching: true
  }
}

function receiveBudgetItems(budgetItems){
  return {
    type: RECEIVE_BUDGET,
    isFetching: false,
    budgetItems: budgetItems
  }
}

export function fetchBudgetItems(){
  return dispatch => {
    //notify that budget items have been requested
    dispatch(requestBudgetItems())
    //make GET request for budget items
    return Axios.get('/v1/api/goals/userBudgetData', {
      headers: {'x-access-token': window.localStorage.getItem('zenmoToken')}
    })
    //notify that budget items have been received
    .then(res => {
      console.log(res);
      //deliver payload from server GET request
      dispatch(receiveBudgetItems(res.data))
    })
    .catch(err => console.error(err))
  }
}

export function updateBudgetItems(budgetItems){
  return dispatch => {
    //send POST req to server with updated budgetItems data
    return Axios.post('/v1/api/goals/updateGoals', {
      token: window.localStorage.getItem('zenmoToken'),
      goals: budgetItems
    })
    //dispatch response from server to reducer
    .then(res => {
      console.log('RES', res);
      dispatch(receiveBudgetItems(res.data))
    })
    .catch(err => console.error(err))
  }
}
