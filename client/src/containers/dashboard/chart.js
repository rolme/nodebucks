import React, { Component } from 'react'
import moment from 'moment'
import { Line } from 'react-chartjs-2'

import { Row } from 'reactstrap'

import { numberFormatter } from '../../lib/helpers'

export default class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedNodeSlug: '',
      nodes: []
    }
    this.handleTabClick = this.handleTabClick.bind(this)
  }

  componentWillMount() {
    const { nodes } = this.props
    this.combineNodes(nodes)
  }

  componentWillReceiveProps(nextProps) {
    const { nodes } = nextProps
    this.combineNodes(nodes)
  }

  combineNodes(nodes) {
    let combinedNodes = []
    nodes.forEach((node) => {
      const matchNodeIndex = combinedNodes.findIndex(matchNode => matchNode.crypto.slug === node.crypto.slug)
      if ( matchNodeIndex !== -1 ) {
        combinedNodes[ matchNodeIndex ].values = combinedNodes[ matchNodeIndex ].values.concat(node.values)
      } else {
        combinedNodes.push(node)
      }
    })
    this.setState({ nodes: combinedNodes })
    this.defineSelectedNodeSlug(combinedNodes)
  }

  defineSelectedNodeSlug(nodes) {
    let { selectedNodeSlug } = this.state
    if ( !!nodes && nodes.length > 1 ) {
      selectedNodeSlug = 'All'
    } else if ( !!nodes[ 0 ] ) {
      selectedNodeSlug = nodes[ 0 ].slug
    } else {
      selectedNodeSlug = ''
    }
    this.setState({ selectedNodeSlug })
  }

  chartData() {
    const { nodes } = this.state
    const { selectedNodeSlug } = this.state
    let labels = [], values = [], datasets = []

    if ( !!nodes.length ) {

      if ( selectedNodeSlug === "All" ) {
        values = []
        let nodeValues = []
        nodes.forEach(nodeData => {
          nodeValues = nodeValues.concat(nodeData.values)
        })
        nodeValues = this.proceedNodeValues(nodeValues).sort((a, b) => {
          return moment(new Date(a.timestamp)).valueOf() > moment(new Date(b.timestamp)).valueOf()
        })
        nodeValues.forEach(node => {
          values.push(+node.value)
          const date = node.timestamp
          !labels.find(label => label === date) && labels.push(date)
        })

        datasets = [
          {
            fill: false,
            borderSkipped: 'bottom',
            backgroundColor: '#1982CB',
            borderColor: '#1982CB',
            data: values
          }
        ]
      } else {
        const node = nodes.find(node => node.slug === selectedNodeSlug)
        !!node && !!node.values && this.proceedNodeValues(node.values).sort((a, b) => {
          return moment(new Date(a.timestamp)).valueOf() > moment(new Date(b.timestamp)).valueOf()
        }).forEach(node => {
          values.push(+node.value)
          labels.push(node.timestamp)
        })
        datasets = [
          {
            fill: false,
            borderSkipped: 'bottom',
            backgroundColor: '#1982CB',
            borderColor: '#1982CB',
            data: values
          }
        ]
      }
    }
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

  handleTabClick(slug) {
    this.setState({ selectedNodeSlug: slug })
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

  renderTabs() {
    const { nodes } = this.state
    const { selectedNodeSlug } = this.state
    return nodes.map((node, index) => {
      const className = node.slug === selectedNodeSlug ? 'nodeValuesChartTab active' : 'nodeValuesChartTab'
      let name = node.crypto.name
      return <div key={index} className={className} onClick={() => this.handleTabClick(node.slug)}>{name}</div>
    })
  }

  render() {
    const { nodes } = this.state
    const { selectedNodeSlug } = this.state
    return (
      <div className="contentContainer dashboardChartSectionContentContainer mb-4">
        <Row className="d-flex flex-wrap">
          {nodes.length > 1 && <div className={`nodeValuesChartTab ${(selectedNodeSlug === 'All') ? 'active' : ''}`} onClick={() => this.handleTabClick('All')}>All</div>}
          {this.renderTabs()}
        </Row>
        <Row className="bg-white nodeValuesChartContainer">
          <Line width={840} height={260} redraw data={this.chartData()} options={this.chartOptions()} className="nodeValuesChart"/>
        </Row>
      </div>
    )
  }
}
