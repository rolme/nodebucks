import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import moment from 'moment'
import { Line } from 'react-chartjs-2'

import { Row } from 'reactstrap'

import { fetchNodeSellPrices } from "../../reducers/nodes"

import { numberFormatter, valueFormat } from '../../lib/helpers'

class PriceHistoryChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeframe: 'daily',
      days: 30
    }
    this.handlePeriodClick = this.handlePeriodClick.bind(this)
  }

  componentWillMount() {
    const { timeframe, days } = this.state
    this.props.fetchNodeSellPrices(this.props.node.slug, timeframe, days)
  }

  chartData() {
    let labels = [], data = [], datasets = []

    this.props.sellPrices.forEach(nodeSellPrice => {
      data.push(nodeSellPrice[Object.keys(nodeSellPrice)[0]].value)
      labels.push(moment(new Date(Object.keys(nodeSellPrice)[0])).format("MMM D YYYY"))
    })

    data.push(this.props.node.value)
    labels.push(moment(new Date()).format("MMM D YYYY"))

    datasets.push(
      {
        fill: false,
        borderSkipped: 'bottom',
        backgroundColor: '#2283C6',
        borderColor: '#2283C6',
        data: data.reverse()
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
    const { days } = this.state
    if ( daysAmount !== days ) {
      this.props.fetchNodeSellPrices(this.props.node.slug, timeframe, daysAmount, () => {
        this.setState({ timeframe, days: daysAmount })
      })
    }
  }

  render() {
    const { days } = this.state

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
  sellPrices: state.nodes.sellPrices,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchNodeSellPrices
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceHistoryChart))
