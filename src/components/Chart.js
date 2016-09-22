import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Highcharts from 'highcharts'
import ExpensesApp from '../containers/ExpensesApp'
import '../css/chart.css'

export class Chart extends React.Component {
	constructor(props) {
    super(props);
    this.chart = undefined;
  }

  componentDidMount() {
	  this.chart = $(ReactDOM.findDOMNode(this.refs.chart)).highcharts({
            chart: {
							// size: 40,
              type: 'pie',
							backgroundColor: 'transparent'
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
                size: '94%',
                innerSize: '80%',
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
      <div ref='chart' className='chart'>
      </div>
    );
  }
}

export default Chart;
