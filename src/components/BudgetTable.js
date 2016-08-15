import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class BudgetTable extends Component {
  constructor(props){
    super(props)
    console.log('Category Totals: ', this.props);
  }

  _onCellEdit(row, cellName, cellValue){
    console.log('Row: ', row, 'cellName: ', cellName, 'cellValue: ', cellValue);
  }

  render(){
    return (
      <div>
        <BootstrapTable
              data={ [{id: 1, essential: "N", category: 'Groceries', currentAmount: 90, goalAmount: 70},
              {id: 2, essential: 'N', category: 'Coffee Shops', currentAmount: 30, goalAmount: 15}] }
              striped={ true }
              hover={ true }
              ref='table'
              cellEdit={{mode: 'click', blueToSave: true, afterSaveCell: this._onCellEdit.bind(this)}}
        >
          <TableHeaderColumn dataField='id' isKey={ true } hidden={ true }>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='essential' editable={ {type: 'checkbox', options: {values: 'Y:N'}}}>Essential</TableHeaderColumn>
          <TableHeaderColumn dataField='category' editable={ { false } }>Category</TableHeaderColumn>
          <TableHeaderColumn dataField='currentAmount' editable={ false }>Current Amount</TableHeaderColumn>
          <TableHeaderColumn dataField='goalAmount' editable={ { type: 'textarea' } }>Goal Amount</TableHeaderColumn>

        </BootstrapTable>
      </div>
    )
  }
}

export default BudgetTable
