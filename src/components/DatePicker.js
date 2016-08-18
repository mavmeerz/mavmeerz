import React, { Component } from 'react';
import { connect } from 'react-redux'
import { DateRange } from 'react-date-range';
import moment from 'moment';
import ExpensesApp from '../containers/ExpensesApp'
import { setVisibilityFilter } from '../actions/expensesActions'

class DatePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: null,
      endDate: null
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(range){
    this.setState({
      startDate: moment(range.startDate._d).format(),
      endDate: moment(range.endDate._d).format()
    });

      // An object with two keys,
      // 'startDate' and 'endDate' which are Momentjs objects.
  }

  handleClick() {
    this.props.setVisibilityFilter('SHOW_FILTERED_DATE', this.state.endDate, this.state.startDate)
  }

  render(){
    return (
      <div>
        <DateRange
           onInit={this.handleSelect}
           onChange={this.handleSelect}
         />
        <button id="apply-dates" onClick={this.handleClick} >
          <i className="fa fa-check-circle"></i>
          OK
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {

  console.log('DatePicker mapStateToProps state is: ', state);
  const { startDate, endDate } = state.expensesReducer

  return {
    startDate: startDate,
    endDate: endDate
  }
}

export default connect(
  mapStateToProps,

  {
    setVisibilityFilter: setVisibilityFilter
  }
)(DatePicker)
