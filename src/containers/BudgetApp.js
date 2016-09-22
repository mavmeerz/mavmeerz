import React, { Component } from 'react'
import { connect } from 'react-redux'
import BudgetTable from '../components/BudgetTable'

import { fetchBudgetItems, updateBudgetItems } from '../actions/budgetActions'

export default class BudgetApp extends Component {

  componentWillMount(){
    this.props.fetchBudgetItems()
  }

  updateBudget(items){
    this.props.updateBudgetItems(items)
  }

  render(){
    return (
      <div>
        <div className='budget-list-container'>
          <BudgetTable
            budgetItems={this.props.budgetItems}
            updateBudget={this.updateBudget.bind(this)}
          />
        </div>
      </div>
    )
  }

}

export function getVisibleBudgetItems(budgetItems){
  return budgetItems.filter(item => {
    item.essential === 0 ? item.essential = 'LUXURY' : item.essential = 'ESSENTIAL';
    return item.currAmount !== 0
  })
}

function mapStateToProps(state){
  var { budgetItems, isFetching } = state.budget
  return {
    budgetItems: getVisibleBudgetItems(budgetItems),
    isFetching: isFetching
  }
}

export default connect(
  mapStateToProps,
  {
    fetchBudgetItems: fetchBudgetItems,
    updateBudgetItems: updateBudgetItems
  }
)(BudgetApp)
