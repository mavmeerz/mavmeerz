import React, {Component} from 'react';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';

const DatePicker = () => {
  console.log('pick a date range!');

    return (
        <DateRangePicker startDate={moment('1/1/2014')} endDate={moment('3/1/2014')}>
            <div>Click Me To Open Picker!</div>
        </DateRangePicker>
    );
};

export default DatePicker
