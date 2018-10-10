import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import moment from 'moment'
import { Line } from 'react-chartjs-2'

import { Col, Row } from 'reactstrap'

import { numberFormatter, valueFormat } from '../../lib/helpers'

import { fetchCryptoPrices } from "../../reducers/cryptos"
import { RingLoader } from "react-spinners"

class PriceHistoryChart extends Component {
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
      },
      timeframe: 'daily',
      days: 30
    }
    this.handlePeriodClick = this.handlePeriodClick.bind(this)
  }

  componentWillMount() {
    const { node } = this.props
    const { timeframe, days } = this.state

    this.props.fetchCryptoPrices(node.crypto.slug, timeframe, days)
  }

  componentWillReceiveProps(nextProps) {
    const { data, node } = nextProps

    !!data && data.length && this.proceedNodeValues(data, node)
  }

  chartData() {
    const { values } = this.state
    let labels = [], data = [], datasets = []

    values.forEach(node => {
      data.push(+node.value)
      labels.push(node.timestamp)
    })
    datasets.push(
      {
        fill: false,
        borderSkipped: 'bottom',
        backgroundColor: '#2283C6',
        borderColor: '#2283C6',
        data: data
      }
    )
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
            return '$ ' + valueFormat(+tooltipItem.yLabel, 1)
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
                return values[ 0 ] - values[ 1 ] > 1000 ? numberFormatter(value) : valueFormat(+value)
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

  handlePeriodClick(timeframe, daysAmount) {
    const { node } = this.props
    const { days } = this.state
    if ( daysAmount !== days ) {
      this.setState({ timeframe, days: daysAmount })
      this.props.fetchCryptoPrices(node.crypto.slug, timeframe, daysAmount)
    }
  }

  proceedNodeValues(values, node) {
    let combinedDates = {}, newValues = [], { createdAt, crypto: { stake } } = node

    createdAt = moment(createdAt).format("MMM D YYYY")

    values.forEach(data => {
      const timestamp = new Date(Object.keys(data)[ 0 ].split(/[\[\]]/)[ 1 ])
      const value = stake * Object.values(data)[ 0 ].price_usd
      const date = moment(timestamp).format("MMM D YYYY")
      if ( date === createdAt ) {
        return
      }
      if ( !!combinedDates[ date ] ) {
        combinedDates[ date ].sum += value
        combinedDates[ date ].count += 1
      } else {
        combinedDates[ date ] = {
          sum: +value,
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
    this.setState({ values: newValues })
    this.chartOptions()

  }

  render() {
    const { days } = this.state
    const { pending } = this.props
    if ( pending ) {
      return (
        <div className="contentContainer dashboardChartSectionContentContainer mb-4 d-flex align-items-center justify-content-center">
          <div className="spinnerContainer h-100 d-flex align-items-center justify-content-center">
            <RingLoader
              size={150}
              color={'#3F89E8'}
              loading={true}
            />
          </div>
        </div>
      )
    }

    return (
      <div className="contentContainer dashboardChartSectionContentContainer mb-4">
        <Row className="d-flex flex-wrap justify-content-end priceHistoryChartPeriodContainer">
          <p className={`${days === 30 ? 'selectedPeriod' : ''}`} onClick={() => this.handlePeriodClick('daily', 30)}>1m</p>
          <p className={`${days === 90 ? 'selectedPeriod' : ''}`} onClick={() => this.handlePeriodClick('daily', 90)}>3m</p>
          <p className={`${days === 180 ? 'selectedPeriod' : ''}`} onClick={() => this.handlePeriodClick('monthly', 180)}>6m</p>
          <p className={`${days === 360 ? 'selectedPeriod' : ''}`} onClick={() => this.handlePeriodClick('monthly', 360)}>1y</p>
        </Row>
        <Row className="bg-white nodeValuesChartContainer">
          <Line width={840} height={260} redraw={false} data={this.chartData()} options={this.chartOptions()} className="nodeValuesChart"/>
        </Row>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  data: state.cryptos.priceData,
  error: state.cryptos.error,
  message: state.cryptos.message,
  pending: state.cryptos.pending,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCryptoPrices,
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceHistoryChart))
