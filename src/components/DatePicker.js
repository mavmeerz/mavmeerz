import React, { Component } from 'react';
import { connect } from 'react-redux'
import { DateRange } from 'react-date-range';
import moment from 'moment';
import ExpensesApp from '../containers/ExpensesApp'
import { updateDates, setVisibilityFilter } from '../actions/expensesActions'

class DatePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: null,
      endDate: null
    }

    console.log('DatePicker this.state constructor is: ', this.state);
    console.log('DatePicker this.props constructor is: ', this.props);
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

      console.log('startDate: ', this.state.startDate);
      console.log('endDate: ', this.state.endDate);
    }

    handleClick() {
      console.log('====> state in handleClick: ', this.state);
      this.props.updateDates(this.state.endDate, this.state.startDate);
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

  // startDate = {this.props.startDate}
  // endDate = {this.props.endDate}
  console.log('DatePicker mapStateToProps state is: ', state);
  const { startDate, endDate } = state.expensesReducer
  console.log('DatePicker mapStateToProps startDate is: ', startDate);
  console.log('DatePicker mapStateToProps endDate is: ', endDate);

  return {
    startDate: startDate,
    endDate: endDate
  }
}

export default connect(
  mapStateToProps,

  {
    updateDates: updateDates,
    setVisibilityFilter: setVisibilityFilter
  }
)(DatePicker)

// <input type="button" onClick={this.props.toggle}/>
// <button id="apply-dates" onClick={this.handleClick} >
//   <i className="fa fa-check-circle"></i>
//   Apply Dates
// </button>
