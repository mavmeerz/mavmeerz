import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash';

import Total from '../components/Total.js'
import GoalTotal from '../components/GoalTotal'
import Chart from '../components/Chart.js'
import KarmoMeter from './KarmoMeterApp'

import '../css/expensesApp.css'

import { updateCategories } from '../actions/expensesActions'
import { getVisibleBudgetItems } from './BudgetApp'

export default class Sidebar extends Component {

  parseCategoriesForChart() {
    let arrByCategory = _.reject(this.props.expenses, expense => {
                          return expense.category == 'Uncategorized';
                        });

    let categorizedTotal = _.sumBy(arrByCategory, expense => expense.amount);

    return  _.chain(arrByCategory)
             .reduce((prev, expense) => {
               if (prev[expense.category]) {
                 prev[expense.category] += expense.amount;
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
    return (
        <div className="rightSection-container">

            <div className="totals">
                <Total
                  total={this.props.total}
                />
                <GoalTotal
                  total={this.props.goalTotal}
                />
            </div>

            <div className="chart-container">
                <Chart
                  data={this.parseCategoriesForChart()}
                />
            </div><br/>

            <div className="karmometer-container">
                <KarmoMeter/>
            </div>

        </div>
    )
  }

}

function computeGoalTotal(budgetItems){
  let total = 0
  budgetItems.forEach(item => total += item.goalAmount)
  return total
}

function mapStateToProps(state){
  const { total, expenses } = state.expensesReducer
  const { budgetItems, isFetching } = state.budget
  return {
    expenses: expenses,
    total: total,
    goalTotal: computeGoalTotal(getVisibleBudgetItems(budgetItems))
  }
}

export default connect(
  mapStateToProps,
  {
    updateCategories: updateCategories
  }
)(Sidebar)
