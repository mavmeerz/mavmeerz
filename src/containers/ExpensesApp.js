import React, { Component} from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Upload from '../containers/UploadApp'
import Dropdown from '../components/Dropdown'
import DatePicker from '../components/DatePicker'
import ExpenseList from '../components/ExpenseList.js'
// import Spin from '../components/Spin'

import { getVisibleExpenses } from '../util/ExpenseTableApp'

import {
  fetchExpenses,
  toggleFetched,
  updateCategories
} from '../actions/expensesActions'


class ExpensesApp extends Component {

      componentWillMount(){
        //FETCH EXPENSES
        if (!this.props.initialFetchOccurred) {
          this.props.fetchExpenses()
          this.props.toggleFetched()
        }
      }

      render(){
          if (this.props.isFetching) {
            // return (
            //   // <Spin/>
            // )
          } else {
            return (
                <div className="expense-list-container">
                  <ExpenseList
                    dates={
                      {
                        startDate:this.props.startDate,
                        endDate: this.props.endDate
                      }
                    }
                    expenses={this.props.expenses}
                    updateCategories={this.props.updateCategories.bind(this)}
                  />
                </div>
            )
          }
      }
}

function mapStateToProps(state){
  const {
    visibilityFilter,
    expenses,
    isFetching,
    startDate,
    endDate,
    initialFetchOccurred
  } = state.expensesReducer

  return {
    expenses: getVisibleExpenses(expenses, visibilityFilter, startDate, endDate),
    isFetching: isFetching,
    startDate: startDate,
    endDate: endDate,
    initialFetchOccurred: initialFetchOccurred
  }
}

export default connect(
  mapStateToProps,
  {
    fetchExpenses: fetchExpenses,
    toggleFetched: toggleFetched,
    updateCategories: updateCategories
  }
)(ExpensesApp)
