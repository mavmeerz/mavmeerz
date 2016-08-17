import {
  REQUEST_BUDGET,
  RECEIVE_BUDGET,
  UPDATE_BUDGET
} from '../actions/budgetActions'

const INITIAL_STATE = {
  budgetItems: [],
  goalTotal: 0
}

export default function budget(state=INITIAL_STATE, action){
  switch (action.type) {
    case RECEIVE_BUDGET:
      return Object.assign({}, state, {
        budgetItems: action.budgetItems
      })
      break
    default:
      return state
  }
}
