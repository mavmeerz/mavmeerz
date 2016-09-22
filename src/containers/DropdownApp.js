import React from 'react'
import { connect } from 'react-redux'

import Dropdown from '../components/Dropdown'

import { setVisibilityFilter, expenseSelected } from '../actions/expensesActions'

const mapStateToProps = (state) => {
  const { visibilityFilter, selected, uploadSuccess } = state.expensesReducer
  return {
    uploadSuccess: uploadSuccess,
    selected: selected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRowSelect: (id) => {
      dispatch(expenseSelected(id))
    },
    setVisibilityFilter: (visibilityFilter, endDate, startDate) => {
      dispatch(setVisibilityFilter(visibilityFilter, endDate, startDate))
    }
  }
}

const DropDownApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropdown)

export default DropDownApp
