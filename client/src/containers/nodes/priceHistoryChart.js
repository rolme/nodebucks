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
      values: '',
      periodValues: {}
    }
    this.handlePeriodClick = this.handlePeriodClick.bind(this)
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
    let labels = [], data = [], datasets = []

    this.filterValuesByPeriod().forEach(node => {
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
    //this.setState({ values: newValues })
    this.setState({
      values: [
        { defaultTimeStamp: '2018-07-11 06:27:54', timestamp: moment('2018-07-11 06:27:54').format("MMM D YYYY"), value: 287886.431265134713 },
        { defaultTimeStamp: '2018-07-10 06:27:54', timestamp: moment('2018-07-10 06:27:54').format("MMM D YYYY"), value: 277886.431265134713 },
        { defaultTimeStamp: '2018-07-8 06:27:54', timestamp: moment('2018-07-08 06:27:54').format("MMM D YYYY"), value: 267886.431265134713 },
        { defaultTimeStamp: '2018-07-3 06:27:54', timestamp: moment('2018-07-03 06:27:54').format("MMM D YYYY"), value: 254886.431265134713 },
        { defaultTimeStamp: '2018-07-2 06:27:54', timestamp: moment('2018-07-02 06:27:54').format("MMM D YYYY"), value: 252886.431265134713 },
        { defaultTimeStamp: '2018-07-1 06:27:54', timestamp: moment('2018-07-01 06:27:54').format("MMM D YYYY"), value: 223886.431265134713 },

        { defaultTimeStamp: '2018-06-11 06:27:54', timestamp: moment('2018-06-30 06:27:54').format("MMM D YYYY"), value: 287886.431265134713 },
        { defaultTimeStamp: '2018-06-10 06:27:54', timestamp: moment('2018-06-29 06:27:54').format("MMM D YYYY"), value: 277886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-06-28 06:27:54').format("MMM D YYYY"), value: 267886.431265134713 },
        { defaultTimeStamp: '2018-06-3 06:27:54', timestamp: moment('2018-06-27 06:27:54').format("MMM D YYYY"), value: 254886.431265134713 },
        { defaultTimeStamp: '2018-06-2 06:27:54', timestamp: moment('2018-06-26 06:27:54').format("MMM D YYYY"), value: 252886.431265134713 },
        { defaultTimeStamp: '2018-06-1 06:27:54', timestamp: moment('2018-06-25 06:27:54').format("MMM D YYYY"), value: 223886.431265134713 },
        { defaultTimeStamp: '2018-06-12 06:27:54', timestamp: moment('2018-06-24 06:27:54').format("MMM D YYYY"), value: 177886.431265134713 },
        { defaultTimeStamp: '2018-06-11 06:27:54', timestamp: moment('2018-06-23 06:27:54').format("MMM D YYYY"), value: 287886.431265134713 },
        { defaultTimeStamp: '2018-06-12 06:27:54', timestamp: moment('2018-06-22 06:27:54').format("MMM D YYYY"), value: 177886.431265134713 },
        { defaultTimeStamp: '2018-06-11 06:27:54', timestamp: moment('2018-06-21 06:27:54').format("MMM D YYYY"), value: 287886.431265134713 },
        { defaultTimeStamp: '2018-06-10 06:27:54', timestamp: moment('2018-06-20 06:27:54').format("MMM D YYYY"), value: 277886.431265134713 },
        { defaultTimeStamp: '2018-06-10 06:27:54', timestamp: moment('2018-06-19 06:27:54').format("MMM D YYYY"), value: 377886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-06-18 06:27:54').format("MMM D YYYY"), value: 267886.431265134713 },
        { defaultTimeStamp: '2018-06-3 06:27:54', timestamp: moment('2018-06-17 06:27:54').format("MMM D YYYY"), value: 254886.431265134713 },
        { defaultTimeStamp: '2018-06-2 06:27:54', timestamp: moment('2018-06-16 06:27:54').format("MMM D YYYY"), value: 252886.431265134713 },
        { defaultTimeStamp: '2018-06-1 06:27:54', timestamp: moment('2018-06-15 06:27:54').format("MMM D YYYY"), value: 223886.431265134713 },
        { defaultTimeStamp: '2018-06-12 06:27:54', timestamp: moment('2018-06-14 06:27:54').format("MMM D YYYY"), value: 177886.431265134713 },
        { defaultTimeStamp: '2018-06-11 06:27:54', timestamp: moment('2018-06-13 06:27:54').format("MMM D YYYY"), value: 287886.431265134713 },
        { defaultTimeStamp: '2018-06-11 06:27:54', timestamp: moment('2018-06-12 06:27:54').format("MMM D YYYY"), value: 187886.431265134713 },
        { defaultTimeStamp: '2018-06-11 06:27:54', timestamp: moment('2018-06-11 06:27:54').format("MMM D YYYY"), value: 127886.431265134713 },
        { defaultTimeStamp: '2018-06-10 06:27:54', timestamp: moment('2018-06-10 06:27:54').format("MMM D YYYY"), value: 277886.431265134713 },
        { defaultTimeStamp: '2018-06-10 06:27:54', timestamp: moment('2018-06-09 06:27:54').format("MMM D YYYY"), value: 237886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-06-08 06:27:54').format("MMM D YYYY"), value: 267886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-06-07 06:27:54').format("MMM D YYYY"), value: 207886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-06-06 06:27:54').format("MMM D YYYY"), value: 167886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-06-05 06:27:54').format("MMM D YYYY"), value: 137886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-06-04 06:27:54').format("MMM D YYYY"), value: 107886.431265134713 },
        { defaultTimeStamp: '2018-06-3 06:27:54', timestamp: moment('2018-06-03 06:27:54').format("MMM D YYYY"), value: 254886.431265134713 },
        { defaultTimeStamp: '2018-06-2 06:27:54', timestamp: moment('2018-06-02 06:27:54').format("MMM D YYYY"), value: 252886.431265134713 },
        { defaultTimeStamp: '2018-06-1 06:27:54', timestamp: moment('2018-06-01 06:27:54').format("MMM D YYYY"), value: 223886.431265134713 },

        { defaultTimeStamp: '2018-06-12 06:27:54', timestamp: moment('2018-05-31 06:27:54').format("MMM D YYYY"), value: 177886.431265134713 },
        { defaultTimeStamp: '2018-06-11 06:27:54', timestamp: moment('2018-05-30 06:27:54').format("MMM D YYYY"), value: 287886.431265134713 },
        { defaultTimeStamp: '2018-06-10 06:27:54', timestamp: moment('2018-05-29 06:27:54').format("MMM D YYYY"), value: 277886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-05-28 06:27:54').format("MMM D YYYY"), value: 267886.431265134713 },
        { defaultTimeStamp: '2018-06-3 06:27:54', timestamp: moment('2018-05-27 06:27:54').format("MMM D YYYY"), value: 254886.431265134713 },
        { defaultTimeStamp: '2018-06-2 06:27:54', timestamp: moment('2018-05-26 06:27:54').format("MMM D YYYY"), value: 252886.431265134713 },
        { defaultTimeStamp: '2018-06-1 06:27:54', timestamp: moment('2018-05-25 06:27:54').format("MMM D YYYY"), value: 223886.431265134713 },
        { defaultTimeStamp: '2018-06-12 06:27:54', timestamp: moment('2018-05-24 06:27:54').format("MMM D YYYY"), value: 177886.431265134713 },
        { defaultTimeStamp: '2018-06-11 06:27:54', timestamp: moment('2018-05-23 06:27:54').format("MMM D YYYY"), value: 287886.431265134713 },
        { defaultTimeStamp: '2018-06-11 06:27:54', timestamp: moment('2018-05-22 06:27:54').format("MMM D YYYY"), value: 247886.431265134713 },
        { defaultTimeStamp: '2018-06-11 06:27:54', timestamp: moment('2018-05-21 06:27:54').format("MMM D YYYY"), value: 187886.431265134713 },
        { defaultTimeStamp: '2018-06-10 06:27:54', timestamp: moment('2018-05-20 06:27:54').format("MMM D YYYY"), value: 277886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-05-19 06:27:54').format("MMM D YYYY"), value: 237886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-05-18 06:27:54').format("MMM D YYYY"), value: 267886.431265134713 },
        { defaultTimeStamp: '2018-06-3 06:27:54', timestamp: moment('2018-05-17 06:27:54').format("MMM D YYYY"), value: 254886.431265134713 },
        { defaultTimeStamp: '2018-06-2 06:27:54', timestamp: moment('2018-05-16 06:27:54').format("MMM D YYYY"), value: 252886.431265134713 },
        { defaultTimeStamp: '2018-06-1 06:27:54', timestamp: moment('2018-05-15 06:27:54').format("MMM D YYYY"), value: 223886.431265134713 },
        { defaultTimeStamp: '2018-06-12 06:27:54', timestamp: moment('2018-05-14 06:27:54').format("MMM D YYYY"), value: 177886.431265134713 },
        { defaultTimeStamp: '2018-06-11 06:27:54', timestamp: moment('2018-05-13 06:27:54').format("MMM D YYYY"), value: 287886.431265134713 },
        { defaultTimeStamp: '2018-06-12 06:27:54', timestamp: moment('2018-05-12 06:27:54').format("MMM D YYYY"), value: 177886.431265134713 },
        { defaultTimeStamp: '2018-06-11 06:27:54', timestamp: moment('2018-05-11 06:27:54').format("MMM D YYYY"), value: 287886.431265134713 },
        { defaultTimeStamp: '2018-06-10 06:27:54', timestamp: moment('2018-05-10 06:27:54').format("MMM D YYYY"), value: 277886.431265134713 },
        { defaultTimeStamp: '2018-06-10 06:27:54', timestamp: moment('2018-05-09 06:27:54').format("MMM D YYYY"), value: 97886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-05-08 06:27:54').format("MMM D YYYY"), value: 267886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-05-07 06:27:54').format("MMM D YYYY"), value: 207886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-05-06 06:27:54').format("MMM D YYYY"), value: 167886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-05-05 06:27:54').format("MMM D YYYY"), value: 137886.431265134713 },
        { defaultTimeStamp: '2018-06-8 06:27:54', timestamp: moment('2018-05-04 06:27:54').format("MMM D YYYY"), value: 107886.431265134713 },
        { defaultTimeStamp: '2018-06-3 06:27:54', timestamp: moment('2018-05-03 06:27:54').format("MMM D YYYY"), value: 184886.431265134713 },
        { defaultTimeStamp: '2018-06-2 06:27:54', timestamp: moment('2018-05-02 06:27:54').format("MMM D YYYY"), value: 252886.431265134713 },
        { defaultTimeStamp: '2018-06-1 06:27:54', timestamp: moment('2018-05-01 06:27:54').format("MMM D YYYY"), value: 223886.431265134713 },

        { defaultTimeStamp: '2018-04-10 06:27:54', timestamp: moment('2018-04-10 06:27:54').format("MMM D YYYY"), value: 77886.431265134713 },
        { defaultTimeStamp: '2018-03-10 06:27:54', timestamp: moment('2018-03-10 06:27:54').format("MMM D YYYY"), value: 417886.431265134713 },
        { defaultTimeStamp: '2018-02-10 06:27:54', timestamp: moment('2018-02-10 06:27:54').format("MMM D YYYY"), value: 237886.431265134713 },
        { defaultTimeStamp: '2018-02-10 06:27:54', timestamp: moment('2018-01-10 06:27:54').format("MMM D YYYY"), value: 237886.431265134713 },
        { defaultTimeStamp: '2018-02-10 06:27:54', timestamp: moment('2017-12-10 06:27:54').format("MMM D YYYY"), value: 237886.431265134713 },
      ]
    })
  }

  filterValuesByPeriod() {
    let { values, selectedPeriod, periodValues } = this.state

    if ( !!periodValues[ selectedPeriod.toString() ] ) {
      return periodValues[ selectedPeriod.toString() ]
    }

    if ( selectedPeriod === 1 ) {
      values = values.filter(value => {
        return moment().diff(moment(value.timestamp), 'days') < 30
      })
    } else if ( selectedPeriod === 3 ) {
      values = values.filter((value, index) => {
        return index % 5 === 0 && moment().diff(moment(value.timestamp), 'days') < 90
      })
    } else if ( selectedPeriod === 6 || selectedPeriod === 12 ) {
      let combinedDates = [], newValues = []
      values.forEach(value => {
        if ( moment().diff(moment(value.timestamp), 'months') < selectedPeriod ) {
          const date = moment(value.timestamp).format('MMMM')
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

    return values
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
