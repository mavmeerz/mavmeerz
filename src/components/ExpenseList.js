import React, { Component} from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import Expense from './Expense.js'
import '../css/expensesApp.css'
// import '../css/karmometer.css'
// import '../css/chart.css'
import Upload from '../containers/UploadApp'
import Dropdown from '../components/Dropdown'
import ExpensesApp from '../containers/ExpensesApp.js'
import { setVisibilityFilter } from '../actions/expensesActions'
import Total from './Total'
import KarmoMeter from '../containers/KarmoMeterApp'
import Chart from './Chart'

class ExpenseList extends Component {
  constructor(props) {
    console.log('props in expenselist wooooooh: ', props);
    super(props);

  }

  _categorize(category) {
    const selected = this.refs.table.state.selectedRowKeys;
    if (selected.length > 0) {
      this.props.updateCategories(selected, category)
        .then(() => this.refs.table.cleanSelected())
    }
  }

  _selectAccount(account) {
    const selected = this.refs.table.state.selectedRowKeys;
    if (selected.length > 0) {
      this.props.updateAccounts(selected, account)
        .then(() => this.refs.table.cleanSelected());
    }
  }

  render() {
    console.log('ExpenseList this.props is: ', this.props);

    function dateFormatter(cell, row){
      const numberToMonths = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
      }

      const month = cell.slice(5,7)
          , day = cell.slice(8,10)
          , year = cell.slice(0,4)

      return `${numberToMonths[month]} ${day}`
    }

    if (this.props.expenses.length > 0) {
      return (
        <div>
          <div className="transactions">

            <Dropdown
                uploadSuccess={this.props.uploadSuccess}
                categorize={this._categorize.bind(this)}
                selectAccount={this._selectAccount.bind(this)}
                setVisibilityFilter={this.props.setVisibilityFilter}
            />

            <BootstrapTable
                    data={ this.props.expenses }
                    striped={ true }
                    hover={ true }
                    selectRow={{mode: 'checkbox', clickToSelect: true, bgColor: 'yellow'}}
                    ref='table'
            >
              <TableHeaderColumn dataField='id' isKey={ true } hidden={ true }>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='date' width='60' dataFormat={ dateFormatter }>Date</TableHeaderColumn>
              <TableHeaderColumn dataField='description' editable={ { type: 'textarea' } }>Description</TableHeaderColumn>
              <TableHeaderColumn dataField='category' editable={ { type: 'dropdown'} }>Category</TableHeaderColumn>
              <TableHeaderColumn dataField='amount' width='80' editable={ { type: 'integer', options: { values: 'Y:N' } } }>Amount</TableHeaderColumn>
              <TableHeaderColumn dataField='account' width='100' editable={ {type: 'dropdown'} }>Account</TableHeaderColumn>

            </BootstrapTable>
          </div>
          <div className="total-container">
            <Total total={this.props.total} />
          </div>
          <div className="rightSection-container">
            <div className="karmometer-container">
              <KarmoMeter />
            </div>
            <div className="chart-container">
              <Chart data={this.props.parseCategoriesForChart()} />
            </div>
            <br />
          </div>
        </div>
      )

    } else {
      return (
        <div className='no-expenses'>
          <p>Upload files below to get started.</p>
          <Upload/>
          <p>Or add your expenses manually.</p>
        </div>
      )
    }
  }

}

export default ExpenseList;
