import React, { Component } from 'react'
import moment from 'moment'
import { Line } from 'react-chartjs-2'

import { Row } from 'reactstrap'

import { numberFormatter } from '../../lib/helpers'

export default class PriceHistoryChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPeriod: 1,
      values: [],
      periodValues: {
        '1': [],
        '3': [],
        '6': [],
        '12': [],
      }
    }
    this.handlePeriodClick = this.handlePeriodClick.bind(this)
    this.filterValuesByPeriod = this.filterValuesByPeriod.bind(this)
  }

  componentWillMount() {
    const { node } = this.props
    !!node && node.values && this.proceedNodeValues(node.values)
  }

  componentWillReceiveProps(nextProps) {
    const { node } = nextProps

    !!node && node.values && this.proceedNodeValues(node.values)
  }

  chartData() {
    const { periodValues, selectedPeriod } = this.state
    let labels = [], data = [], datasets = []

    periodValues[ selectedPeriod.toString() ].forEach(node => {
      data.push(+node.value)
      labels.push(node.timestamp)
    })
    datasets = [
      {
        fill: false,
        borderSkipped: 'bottom',
        backgroundColor: '#2283C6',
        borderColor: '#2283C6',
        data: data
      }
    ]
    labels.sort((a, b) => {
      return moment(new Date(a)).valueOf() - moment(new Date(b)).valueOf()
    })
    return {
      labels,
      datasets
    }
  }

  chartOptions() {
    return {
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return '$ ' + tooltipItem.yLabel.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
          }
        }
      },
      legend: { display: false },
      scales: {
        xAxes: [
          {
            gridLines: {
              borderDash: [ 6, 4 ],
            },
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
    value !== selectedPeriod && this.setState({ selectedPeriod: value }, this.filterValuesByPeriod)
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
    this.setState({ values: newValues }, this.filterValuesByPeriod)
  }

  filterValuesByPeriod() {
    let { values, selectedPeriod, periodValues } = this.state

    if ( !!periodValues[ selectedPeriod.toString() ].length ) {
      return periodValues[ selectedPeriod.toString() ]
    }

    if ( selectedPeriod === 1 ) {
      values = values.filter(value => {
        return moment().diff(moment(new Date(value.timestamp)), 'days') < 30
      })
    } else if ( selectedPeriod === 3 ) {
      const amount = values.length
      values = values.filter((value, index) => {
        return (amount < 20 || index % 5 === 0) && moment().diff(moment(new Date(value.timestamp)), 'days') < 90
      })
    } else if ( selectedPeriod === 6 || selectedPeriod === 12 ) {
      let combinedDates = [], newValues = []
      values.forEach(value => {
        if ( moment().diff(moment(new Date(value.timestamp)), 'months') < selectedPeriod ) {
          const date = moment(new Date(value.timestamp)).format('MMMM')
          if ( !!combinedDates[ date ] ) {
            combinedDates[ date ].sum += +value.value
            combinedDates[ date ].count += 1
          } else {
            combinedDates[ date ] = {
              sum: +value.value,
              count: 1
            }
          }
        }
      })

      for ( let date in combinedDates ) {
        newValues.push({
          timestamp: date,
          value: combinedDates[ date ].sum / combinedDates[ date ].count
        })
      }
      values = newValues
    }

    periodValues[ selectedPeriod.toString() ] = values

    this.setState({ periodValues })
    this.chartOptions()
  }

  render() {
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
