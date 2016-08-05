import React from 'react'
import Expense from './Expense.js'
import Upload from '../containers/UploadApp'

let ExpenseList = ({expenses}) => {

  if (expenses.length>0) {
    //map function that returns and array of Expense Component, each with its
    //own expese object
    let expenseList = expenses.map(exp =>
      <Expense
        key={exp.id}
        exp={exp}
      />
    )



    return (
      <div>
        <h3>TRANSACTIONS</h3>
        <table className="transactions" cellpadding="0" cellspacing="0">
          <tbody>
            {expenseList}
          </tbody>
        </table>
        <Upload/><br/>
      </div>
    )

  } else {
    return (
      <div>
        <p>You have no expenses yet! Upload files below to get started.</p><br/>
        <Upload/><br/>
        <p>Or add your expenses manually.</p>
      </div>
    )
  }

}

export default ExpenseList;
