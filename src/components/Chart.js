import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Highcharts from 'highcharts'
import ExpensesApp from '../containers/ExpensesApp'

export class Chart extends React.Component {
	constructor(props) {
    super(props);
    this.chart = undefined;
  }

  componentDidMount() {
	  this.chart = $(ReactDOM.findDOMNode(this.refs.chart)).highcharts({
            chart: {
							size: 20,
              type: 'pie'
            },
            title: 'Expenses per Category',
            yAxis: {
                title: {
                    text: 'Total percent expenses per category'
                }
            },
            plotOptions: {
                pie: {
                    shadow: false
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                }
            },
            series: [{
                category: 'Category',
                data: this.props.data,
                size: '100%',
                innerSize: '85%',
                showInLegend:true,
                dataLabels: {
                    enabled: true
                }
            }]
        });
  }

  componentWillReceiveProps(props) {
		this.chart.highcharts().series[0].setData(props.data);
  }

  render() {
    return (
      <div ref='chart'>
      </div>
    );
  }
}

export default Chart;
