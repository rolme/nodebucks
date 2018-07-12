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
    //const { node } = this.props
    const node = {"balance":{"coin":"100.8000032","usd":"164.304005216"},"cost":"2050.54775038624","createdAt":"2018-06-29 03:16:50","crypto":{"annualRoi":"2.054209878904392001388953465760383359","hostingFee":"0.01","masternodes":1697,"monthlyRoiValue":"284.653493676","monthlyRoiPercentage":"0.168839168129128109703201654720031509","name":"Polis","nodePrice":"1685.94465863689374","slug":"polis","stake":1000,"symbol":"polis","url":"https://polispay.org/","status":"active","weeklyRoiValue":"66.4191485244","weeklyRoiPercentage":"0.039395805896796558930747052768007352","yearlyRoiValue":"3463.284173058","yearlyRoiPercentage":"2.054209878904392001388953465760383359"},"events":[{"id":20,"timestamp":"2018-06-30 22:30:37","type":"reward","description":"Reward: 14.4 polis (-0.144 fee)","value":"14.256"},{"id":16,"timestamp":"2018-06-27 22:45:22","type":"reward","description":"Reward: 14.4 polis (-0.144 fee)","value":"14.256"},{"id":15,"timestamp":"2018-06-25 02:02:28","type":"reward","description":"Reward: 14.4000032 polis (-0.144000032 fee)","value":"14.256003168"},{"id":14,"timestamp":"2018-06-22 15:03:05","type":"reward","description":"Reward: 14.4 polis (-0.144 fee)","value":"14.256"},{"id":13,"timestamp":"2018-06-19 19:05:44","type":"reward","description":"Reward: 14.4 polis (-0.144 fee)","value":"14.256"},{"id":12,"timestamp":"2018-06-17 09:30:04","type":"reward","description":"Reward: 14.4 polis (-0.144 fee)","value":"14.256"},{"id":11,"timestamp":"2018-06-14 19:14:30","type":"reward","description":"Reward: 14.4 polis (-0.144 fee)","value":"14.256"},{"id":7,"timestamp":"2018-03-02 03:16:50","type":"ops","description":"Server online","value":"0.0"},{"id":6,"timestamp":"2018-02-28 03:16:50","type":"ops","description":"Server setup","value":"0.0"}],"ip":"127.0.0.1","isReady":true,"lastUpgradedAt":null,"onlineAt":"2018-03-02 03:16:50","owner":{"email":"test@nodebucks.com","first":"Test","fullName":"Test User","last":"User","slug":"WW08dcGSgDVejWnQHKlhkQ"},"rewardSetting":0,"rewardTotal":"162.66096516384","rewards":{"week":"0.0","quarter":"162.66096516384","month":"162.66096516384","year":"162.66096516384"},"sellBitcoinWallet":null,"sellPrice":"1172.6869471234446","sellSetting":0,"slug":"s7ehIXCkAp-P9MO71WNVbQ","soldAt":null,"status":"online","stripe":null,"timeLimit":180,"wallet":"PUqHkjJPD8hFwTz9M1WhYtG9pBx14GcLHn","withdrawWallet":null,"value":"1116.3355187085592","values":[{"timestamp":"2018-07-04 01:45:08","value":"1142.03"},{"timestamp":"2018-07-11 05:21:06","value":"1276.16"},{"timestamp":"2018-07-11 05:21:39","value":"1276.16"},{"timestamp":"2018-07-11 05:23:12","value":"1276.16"},{"timestamp":"2018-07-11 05:23:34","value":"1276.16"}],"version":null,"vpsMonthlyCost":null,"vpsProvider":null,"vpsUrl":null}
    !!node && node.values && this.proceedNodeValues(node.values)
  }

  componentWillReceiveProps(nextProps) {
    //const { node } = nextProps
    const node = {"balance":{"coin":"100.8000032","usd":"164.304005216"},"cost":"2050.54775038624","createdAt":"2018-06-29 03:16:50","crypto":{"annualRoi":"2.054209878904392001388953465760383359","hostingFee":"0.01","masternodes":1697,"monthlyRoiValue":"284.653493676","monthlyRoiPercentage":"0.168839168129128109703201654720031509","name":"Polis","nodePrice":"1685.94465863689374","slug":"polis","stake":1000,"symbol":"polis","url":"https://polispay.org/","status":"active","weeklyRoiValue":"66.4191485244","weeklyRoiPercentage":"0.039395805896796558930747052768007352","yearlyRoiValue":"3463.284173058","yearlyRoiPercentage":"2.054209878904392001388953465760383359"},"events":[{"id":20,"timestamp":"2018-06-30 22:30:37","type":"reward","description":"Reward: 14.4 polis (-0.144 fee)","value":"14.256"},{"id":16,"timestamp":"2018-06-27 22:45:22","type":"reward","description":"Reward: 14.4 polis (-0.144 fee)","value":"14.256"},{"id":15,"timestamp":"2018-06-25 02:02:28","type":"reward","description":"Reward: 14.4000032 polis (-0.144000032 fee)","value":"14.256003168"},{"id":14,"timestamp":"2018-06-22 15:03:05","type":"reward","description":"Reward: 14.4 polis (-0.144 fee)","value":"14.256"},{"id":13,"timestamp":"2018-06-19 19:05:44","type":"reward","description":"Reward: 14.4 polis (-0.144 fee)","value":"14.256"},{"id":12,"timestamp":"2018-06-17 09:30:04","type":"reward","description":"Reward: 14.4 polis (-0.144 fee)","value":"14.256"},{"id":11,"timestamp":"2018-06-14 19:14:30","type":"reward","description":"Reward: 14.4 polis (-0.144 fee)","value":"14.256"},{"id":7,"timestamp":"2018-03-02 03:16:50","type":"ops","description":"Server online","value":"0.0"},{"id":6,"timestamp":"2018-02-28 03:16:50","type":"ops","description":"Server setup","value":"0.0"}],"ip":"127.0.0.1","isReady":true,"lastUpgradedAt":null,"onlineAt":"2018-03-02 03:16:50","owner":{"email":"test@nodebucks.com","first":"Test","fullName":"Test User","last":"User","slug":"WW08dcGSgDVejWnQHKlhkQ"},"rewardSetting":0,"rewardTotal":"162.66096516384","rewards":{"week":"0.0","quarter":"162.66096516384","month":"162.66096516384","year":"162.66096516384"},"sellBitcoinWallet":null,"sellPrice":"1172.6869471234446","sellSetting":0,"slug":"s7ehIXCkAp-P9MO71WNVbQ","soldAt":null,"status":"online","stripe":null,"timeLimit":180,"wallet":"PUqHkjJPD8hFwTz9M1WhYtG9pBx14GcLHn","withdrawWallet":null,"value":"1116.3355187085592","values":[{"timestamp":"2018-07-04 01:45:08","value":"1142.03"},{"timestamp":"2018-07-11 05:21:06","value":"1276.16"},{"timestamp":"2018-07-11 05:21:39","value":"1276.16"},{"timestamp":"2018-07-11 05:23:12","value":"1276.16"},{"timestamp":"2018-07-11 05:23:34","value":"1276.16"}],"version":null,"vpsMonthlyCost":null,"vpsProvider":null,"vpsUrl":null}

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
