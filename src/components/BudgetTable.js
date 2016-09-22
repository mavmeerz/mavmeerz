import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class BudgetTable extends Component {
  constructor(props){
    super(props);
    console.log('=======> props.budgetItems in BudgetTable constructor: ', props.budgetItems);
  }

  _onCellEdit(row, cellName, cellValue){
    let essential;
    let goalUpdates = [ { subCat: row.category } ];

    if (cellName === 'essential') {
      let essentialString = cellValue.toLowerCase();
      if (essentialString === 'luxury' || essentialString === 'essential') {
        essentialString === 'luxury' ? essential = 0 : essential = 1;
      }
      goalUpdates[0].essential = essential;
    } else if (cellName === 'goalAmount') {
      if (!isNaN(+cellValue)) goalUpdates[0].amount = +cellValue;
    }
    this.props.updateBudget(goalUpdates);
  }

  render(){
    return (
      <div expenses-container>
        <BootstrapTable
              data={ this.props.budgetItems }
              striped={ true }
              hover={ true }
              ref='table'
              cellEdit={{mode: 'click', afterSaveCell: this._onCellEdit.bind(this)}}
        >
          <TableHeaderColumn dataField='id' isKey={ true } hidden={ true }>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='essential' editable={ {type: 'string', options: {values: 'ESSENTIAL:LUXURY'}}}>Essential or Luxury</TableHeaderColumn>
          <TableHeaderColumn dataField='category' editable={ false }>Category</TableHeaderColumn>
          <TableHeaderColumn dataField='currAmount' editable={ false }>Current Amount</TableHeaderColumn>
          <TableHeaderColumn dataField='goalAmount' editable={ { type: 'number' } }>Goal Amount</TableHeaderColumn>

        </BootstrapTable>
      </div>
    )
  }
}
