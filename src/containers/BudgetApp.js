import React, { Component } from 'react'
import { connect } from 'react-redux'
import BudgetTable from '../components/BudgetTable'
import Total from '../components/Total'
import GoalTotal from '../components/GoalTotal'
import { fetchBudgetItems, updateBudgetItems } from '../actions/budgetActions'

export default class BudgetApp extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.fetchBudgetItems()
  }

  updateBudget(items){
    this.props.updateBudgetItems(items)
  }

  render(){
    return (
      <div>
        <div className='budget-table'>
          <BudgetTable
            budgetItems={this.props.budgetItems}
            updateBudget={this.updateBudget.bind(this)}
          />
        </div>
        <Total
            total={this.props.total}
        />
        <GoalTotal
            total={this.props.goalTotal}
        />
      </div>
    )
  }

}

function getVisibleBudgetItems(budgetItems){
  return budgetItems.filter(item => {
    item.essential === 0 ? item.essential = 'LUXURY' : item.essential = 'ESSENTIAL';
    return item.currAmount !== 0
  })
}
function computeGoalTotal(budgetItems){
  let total = 0
  budgetItems.forEach(item => total += item.goalAmount)
  return total
}

function mapStateToProps(state){
  const { total } = state.expensesReducer
  const { budgetItems, fetchingBudget } = state.budget
  return {
    total: total,
    budgetItems: getVisibleBudgetItems(budgetItems),
    fetchingBudget: fetchingBudget,
    goalTotal: computeGoalTotal(budgetItems)
  }
}

export default connect(
  mapStateToProps,
  {
    fetchBudgetItems: fetchBudgetItems,
    updateBudgetItems: updateBudgetItems
  }
)(BudgetApp)
