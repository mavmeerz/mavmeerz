import React, { Component} from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import Expense from './Expense.js'
import Upload from '../containers/UploadApp'
import Dropdown from '../components/Dropdown'
import ExpensesApp from '../containers/ExpensesApp.js'

class ExpenseList extends Component {
  constructor(props) {
    super(props);

  console.log('ExpenseList props are: ', props);
  }

  _categorize(category) {
    const selected = this.refs.table.state.selectedRowKeys;
    console.log('Category from _categorize function: ', category);
    if (selected.length > 0) {
      this.props.updateCategories(selected, category);
    }
  }

  _selectAccount(account) {
    const selected = this.refs.table.state.selectedRowKeys;
    if (selected.length > 0) {
      this.props.updateAccounts(selected, account);
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
                categorize={this._categorize.bind(this)}
                selectAccount={this._selectAccount.bind(this)}
                receiveExpenses={this.props.receiveExpenses}
                allExpenses={this.props.allExpenses}
            />

            <BootstrapTable
                    data={ this.props.expenses }
                    striped={ true }
                    hover={ true }
                    selectRow={{mode: 'checkbox', clickToSelect: true, bgColor: 'yellow'}}
                    ref='table'
            >
              <TableHeaderColumn dataField='id' isKey={ true } hidden={ true }>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='date' dataFormat={ dateFormatter }>Date</TableHeaderColumn>
              <TableHeaderColumn dataField='description' editable={ { type: 'textarea' } }>Description</TableHeaderColumn>
              <TableHeaderColumn dataField='category' editable={ { type: 'dropdown'} }>Category</TableHeaderColumn>
              <TableHeaderColumn dataField='amount' editable={ { type: 'integer', options: { values: 'Y:N' } } }>Amount</TableHeaderColumn>
              <TableHeaderColumn dataField='account' editable={ {type: 'dropdown'} }>Account</TableHeaderColumn>

            </BootstrapTable>
          </div>
        </div>
      )

    } else {
      return (
        <div className='no-expenses'>
          <p>You have no expenses yet! Upload files below to get started.</p><br/>
          <Upload/><br/>
          <p>Or add your expenses manually.</p>
        </div>
      )
    }
  }

}

export default ExpenseList;
