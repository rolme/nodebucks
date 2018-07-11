import React, { Component } from 'react'
import moment from 'moment'
import { Line } from 'react-chartjs-2'

import { Row } from 'reactstrap'

import { numberFormatter } from '../../lib/helpers'

export default class PriceHistoryChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPeriod: 1
    }
    this.handlePeriodClick = this.handlePeriodClick.bind(this)
  }

  chartData() {
    const { node } = this.props
    const { selectedPeriod } = this.state
    let labels = [], values = [], datasets = []

    this.proceedNodeValues(node.values).forEach(node => {
      values.push(+node.value)
      labels.push(node.timestamp)
    })
    datasets = [
      {
        fill: false,
        borderSkipped: 'bottom',
        backgroundColor: '#2283C6',
        borderColor: '#2283C6',
        data: values
      }
    ]
    labels.sort((a, b) => {
      return moment(new Date(a)).valueOf() > moment(new Date(b)).valueOf()
    })
    return {
      labels,
      datasets
    }
  }

  chartOptions() {
    return {
      legend: { display: false },
      scales: {
        xAxes: [
          {
            gridLines: {
              borderDash: [ 6, 4 ],
            }
          }
        ],
        yAxes: [
          {
            barPercentage: 1.2,
            ticks: {
              fontSize: 11,
              callback: function (value, index, values) {
                return values[ 0 ] - values[ 1 ] > 1000 ? numberFormatter(value) : value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
              }
            },
            gridLines: {
              borderDash: [ 6, 4 ],
            }
          }
        ]
      },
    }
  }

  handlePeriodClick(value) {
    const { selectedPeriod } = this.state
    value !== selectedPeriod && this.setState({ selectedPeriod: value })
  }

  proceedNodeValues(values) {
    let combinedDates = {}, newValues = []
    values.forEach(value => {
      const date = moment(value.timestamp).format("MMM D YYYY")
      if ( !!combinedDates[ date ] ) {
        combinedDates[ date ].sum += +value.value
        combinedDates[ date ].count += 1
      } else {
        combinedDates[ date ] = {
          sum: +value.value,
          count: 1
        }
      }
    })

    for ( let date in combinedDates ) {
      newValues.push({
        timestamp: date,
        value: combinedDates[ date ].sum / combinedDates[ date ].count
      })
    }
    return newValues
  }

  render() {
    const { node } = this.props
    const { selectedPeriod } = this.state
    return (
      <div className="contentContainer dashboardChartSectionContentContainer mb-4">
        <Row className="d-flex flex-wrap justify-content-end priceHistoryChartPeriodContainer">
          <p className={`${selectedPeriod === 1 ? 'selectedPeriod' : ''}`} onClick={() => this.handlePeriodClick(1)}>1m</p>
          <p className={`${selectedPeriod === 3 ? 'selectedPeriod' : ''}`} onClick={() => this.handlePeriodClick(3)}>3m</p>
          <p className={`${selectedPeriod === 6 ? 'selectedPeriod' : ''}`} onClick={() => this.handlePeriodClick(6)}>6m</p>
          <p className={`${selectedPeriod === 12 ? 'selectedPeriod' : ''}`} onClick={() => this.handlePeriodClick(12)}>1y</p>
        </Row>
        <Row className="bg-white nodeValuesChartContainer">
          <Line width={840} height={260} redraw data={this.chartData()} options={this.chartOptions()} className="nodeValuesChart"/>
        </Row>
      </div>
    )
  }
}
