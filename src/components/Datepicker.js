import React, {Component} from 'react';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';

const DatePicker = () => {
  console.log('pick a date range!');
  var day = new Date();

    return (
        <DateRangePicker startDate={moment('1/1/2016', "MM-DD-YYYY")} endDate={moment('3/1/2014', "MM-DD-YYYY")}>
          <div>.</div>
        </DateRangePicker>
    );
};

export default DatePicker
