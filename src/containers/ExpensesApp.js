/*
This is the container component for the entire application. It is rendered
in App.js. All children presentational components of the hierarchy will be
rendered from ExpensesApp.

This component is what connects React to Redux; therefore, the only passage that
the presentational components have to the state tree and to Redux is through
AsyncApp. All state changes are both dispatched and received by AsyncApp and
then passed down to all children presentational components.
*/

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ExpenseList from '../components/ExpenseList.js'
import Total from '../components/Total.js'
import Chart from '../components/Chart.js'

import '../css/expensesApp.css'

import { fetchExpenses, updateCategories, updateAccounts } from '../actions/expensesActions.js'

export default class ExpensesApp extends Component {
  constructor(props){
    super(props)
    console.log('this.props in constructor in ExpensesApp', this.props);
    this.state = {total: 0}
  }

  componentWillMount(){
    console.log('this.props.expenses in componentWillMount in ExpensesApp', this.props.expenses);
    this.props.fetchExpenses()
  }

  parseCategoriesForChart() {
    function filterByCategory(obj) {
      if ('category' in obj && typeof(obj.category) === 'string' && obj.category !== null) {
        return true;
      } else {
        return false;
      }
    }

    let dataSum = 0;
    let arrByCategory = this.props.expenses.filter(filterByCategory);
    let reduced = arrByCategory.reduce((p,c) => {
      p[c.category] ? p[c.category] += c.amount : p[c.category] = c.amount;
      dataSum += c.amount;
      return p;
    }, {});

    let result = [];
    for (let key in reduced) {
      result.push({name: key, y: Math.round((reduced[key] / dataSum) * 100)});
    };
    return result;
  }

  render(){
    var expenses = this.props.expenses;
    return (
      <div className="expenseApp-container">

        <div className="expense-list-container">

          <ExpenseList
            expenses={expenses}
            updateCategories={this.props.updateCategories.bind(this)}
            updateAccounts={this.props.updateAccounts.bind(this)}
            total={this.props.total}
          />
        </div>

        <div className="chart-container">
          <Total
              total={this.props.total}
          />
          <Chart
            data={this.parseCategoriesForChart()}
          />
        </div>

      </div>
    )
  }
}

ExpensesApp.PropTypes = {
  // Injected by Redux
  expenses: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  fetchExpenses: PropTypes.func.isRequired
}

/*
function that describes how to transform the current Redux store state into the
props you want to pass to a child presentational component you are wrapping
  @param = state object
  @return = object of transformed store state
*/
function mapStateToProps(state){
  const { expenses, isFetching, total } = state.expensesReducer
  console.log('EXPENSES: ', expenses);
  return {
    expenses: expenses,
    isFetching: isFetching,
    total: total
  }
}

//function that connects React component to Redux store
export default connect(
  mapStateToProps,
  {
    fetchExpenses: fetchExpenses,
    updateCategories: updateCategories,
    updateAccounts: updateAccounts
  }
)(ExpensesApp)
