import React from 'react'
import { TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment'

const Expense = ({exp, handleCategorySubmit}) => {
  //component that returns a single expense item
  //each expense item contains a date, description text, amount, and a category
  let amount;
  function parseDate() {}
    let date = moment(exp.Date).format('MM DD YYYY');
  }
  console.log(date);
  if (exp.amount) {
    amount
  }

  return (
    <tr>
      <td className="date">{parseDate(exp.Date)}</td>
      <td className="description">{exp.Description}</td>
      <td className="category">
        <input
          className="category-entry"
          type="text"
          placeholder="Enter Category"spot
        >
        </input>
      </td>
      <td className="amount">{exp.amount}</td>
    </tr>
  )
}

export default Expense
