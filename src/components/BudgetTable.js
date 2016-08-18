import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

export default class BudgetTable extends Component {
  constructor(props){
    super(props)
  }

  _onCellEdit(row, cellName, cellValue){
    let essential;
    row.essential === 'LUXURY' ? essential = 0 : essential = 1;
    const goalUpdates = [
      {
        subCat: row.category,
        amount: +cellValue,
        essential: essential
      }
    ]
    this.props.updateBudget(goalUpdates)
  }

  render(){
    return (
      <div>
        <BootstrapTable
              data={ this.props.budgetItems }
              striped={ true }
              hover={ true }
              ref='table'
              cellEdit={{mode: 'click', afterSaveCell: this._onCellEdit.bind(this)}}
        >
          <TableHeaderColumn dataField='id' isKey={ true } hidden={ true }>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='essential' editable={ {type: 'checkbox', options: {values: 'ESSENTIAL:LUXURY'}}}>Essential or Luxury</TableHeaderColumn>
          <TableHeaderColumn dataField='category' editable={ false }>Category</TableHeaderColumn>
          <TableHeaderColumn dataField='currAmount' editable={ false }>Current Amount</TableHeaderColumn>
          <TableHeaderColumn dataField='goalAmount' editable={ { type: 'textarea' } }>Goal Amount</TableHeaderColumn>

        </BootstrapTable>
      </div>
    )
  }
}
