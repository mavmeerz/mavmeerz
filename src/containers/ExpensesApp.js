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
import * as _ from 'lodash';

import ExpenseList from '../components/ExpenseList.js'
import Total from '../components/Total.js'
import Chart from '../components/Chart.js'
import Spin from '../components/Spin'
import DatePicker from '../components/DatePicker'

import '../css/expensesApp.css'

import {
  fetchExpenses,
  updateCategories,
  updateAccounts,
  updateDates,
  receiveExpenses,
  toggleFetched
} from '../actions/expensesActions'

export default class ExpensesApp extends Component {
  constructor(props){
    super(props)
    console.log('this.props in constructor in ExpensesApp', this.props);
    console.log('this.state in constructor in ExpensesApp', this.state);

    this.state = {
      total: 0,
    }
  }

  componentWillMount(){
    // var fetch = memoize(this.props.fetchExpenses)
    // fetch()
    if (!this.props.initialFetchOccurred) {
      this.props.fetchExpenses()
      this.props.toggleFetched()
    }
  }

  showAllExpenses(expenses) {
    return expenses.filter((expense) => {
      console.log('=====> expense.date in filter: ', expense.date);
    if (dates.endDate && dates.startDate) {
        return expense.date >= dates.startDate && expense.date <= dates.endDate
      })
    }
  }

  parseCategoriesForChart() {
    let arrByCategory = _.reject(this.props.expenses, expense => {
                          return expense.category == 'Other'
                        });

    let categorizedTotal = _.sumBy(arrByCategory, expense => expense.amount);

    return  _.chain(arrByCategory)
             .reduce((prev, expense) => {
               if (prev[expense.category]) {
                 prev[expense.category] += expense.amount
               } else {
                 prev[expense.category]  = expense.amount;
               }
               return prev;
             }, {})
             .map((categoryTotal, category) => {
               return {
                 name: category,
                 y: Math.round((categoryTotal / categorizedTotal) * 100)
               };
             })
             .value();
  }

  render(){
    var expenses = this.props.expenses;
<<<<<<< e241c09b8ac278867799ec31657cbcd9aecda61e
    if (this.props.isFetching) {
      return (
        <Spin/>
      )
    } else {
      return (
        <div className="expenseApp-container">
          <div className="expense-list-container">
            <ExpenseList
              dates={
                {
                  startDate:this.props.startDate,
                  endDate: this.props.endDate
                }
              }
              expenses={expenses}
              updateCategories={this.props.updateCategories.bind(this)}
              updateAccounts={this.props.updateAccounts.bind(this)}
              total={this.props.total}
              updateDates = {this.props.updateDates.bind(this)}
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
}

ExpensesApp.PropTypes = {
  // Injected by Redux
  expenses: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  fetchExpenses: PropTypes.func.isRequired,
  allExpenses: PropTypes.array.isRequired,
  receiveExpenses: PropTypes.func.isRequired
}

/*
function that describes how to transform the current Redux store state into the
props you want to pass to a child presentational component you are wrapping
  @param = state object
  @return = object of transformed store state
*/
function mapStateToProps(state){
  const {
    expenses,
    isFetching,
    total,
    startDate,
    endDate,
    initialFetchOccurred
  } = state.expensesReducer
  console.log('Expenses in mapStateToProps in ExpensesApp: ', expenses );

  return {
    expenses: expenses,
    isFetching: isFetching,
    total: total,
    startDate: startDate,
    endDate: endDate,
    initialFetchOccurred: initialFetchOccurred
  }
}

//function that connects React component to Redux store
export default connect(
  mapStateToProps,
  {
    fetchExpenses: fetchExpenses,
    updateCategories: updateCategories,
    updateAccounts: updateAccounts,
    updateDates: updateDates,
    receiveExpenses: receiveExpenses,
    toggleFetched: toggleFetched
  }
)(ExpensesApp)
