import React, { Component } from 'react'
import { connect } from 'react-redux'
import BudgetTable from '../components/BudgetTable'

export default class BudgetApp extends Component {

  constructor(props){
    super(props)
    console.log('EXPENSES YAS:', this.props.expenses );
  }

  _categoryTotals(expenses){
    return expenses.reduce((amountsBySubCategory, expense) => {
      const category = expense.category,
            amount = expense.amount

      // let subCategoryAdded = amountsBySubCategory[category]

      amountsBySubCategory[category] ?
        amountsBySubCategory[category] += amount :
        amountsBySubCategory[category] = amount;

      return amountsBySubCategory
    }, {})
  }

  render(){
    return (
      <div>
        <BudgetTable
            categoryTotals={this._categoryTotals(this.props.expenses)}
        />
      </div>
    )
  }

}

export default connect(
  (state) => {
    const { expenses } = state.expensesReducer
    return {
      expenses: expenses
    }
  }
)(BudgetApp)
