import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import { RingLoader } from 'react-spinners'
import ReactHighstock from 'react-highcharts/ReactHighstock'
import {fetchPrice} from '../../reducers/nodes'
import { Container, Row, Col } from 'reactstrap'

class PriceGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      daysAmount: 90,
      data: [],
      scaleType: 'linear',
      zoomOptions: [
        { label: '1D', daysAmount: 24, type: 'hour' },
        { label: '7D', daysAmount: 7, type: 'day' },
        { label: '1M', daysAmount: 30, type: 'day' },
        { label: '3M', daysAmount: 90, type: 'day' },
        { label: '6M', daysAmount: 180, type: 'day' },
        { label: '1Y', daysAmount: 360, type: 'day' },
        { label: 'ALL', daysAmount: 2000, type: 'day' },
      ],
      scaleOptions: [
        { label: 'LINEAR', scaleType: 'linear' },
        { label: 'LOG', scaleType: 'logarithmic' },
      ]
    }
    this.onPeriodChange = this.onPeriodChange.bind(this)
  }


  componentWillMount() {
    this.props.fetchPrice(this.props.symbol, this.state.daysAmount)
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps
    this.setState({ data })
  }

  renderZoomButtons() {
    const { zoomOptions, daysAmount } = this.state
    return zoomOptions.map((option, index) => {
      return <p key={index} onClick={() => this.onPeriodChange(option.daysAmount, option.type)} className={daysAmount === option.daysAmount ? "lineGraphToolsSelectedButton" : "lineGraphToolsButton"}>{option.label}</p>
    })
  }

  onPeriodChange(amount, type) {
    const daysAmount = amount
    this.props.fetchPrice(this.props.symbol, daysAmount, type)
    this.setState({ daysAmount })
  }

  renderValueButtons() {
    const { scaleOptions, scaleType } = this.state
    return scaleOptions.map((option, index) => {
      return <p key={index} onClick={() => this.onScaleTypeChange(option.scaleType)} className={scaleType === option.scaleType ? "lineGraphToolsSelectedButton" : "lineGraphToolsButton"}>{option.label}</p>
    })
  }

  onScaleTypeChange(type) {
    const scaleType = type
    this.setState({ scaleType })
  }

  lineGraphConfig() {
    let data = [], volume = []
    const { daysAmount, scaleType } = this.state
    const label = this.props.name + ' (' + this.props.symbol + ')'
    this.state.data.forEach(el => {
      if ( !!el.close || !!el.high || !!el.low || !!el.open || !!el.volumefrom || !!el.volumeto ) {
        data.push([ el.time * 1000, el.open, el.high, el.low, el.close ])
        if ( !!el.close || !!el.high || !!el.low || !!el.open || !!el.volumefrom || !!el.volumeto ) {
          volume.push([ el.time * 1000, el.volumeto ])
        }
      }
    })

    let tickInterval = null
    let dateTimeLabelFormat = "%b '%y"

    if ( daysAmount === 24 ) {
      dateTimeLabelFormat = "%H:%M"
    } else if ( daysAmount === 7 ) {
      tickInterval = 24 * 3600 * 1000
      dateTimeLabelFormat = "%e. %b"
    } else if ( daysAmount === 30 ) {
      tickInterval = 7 * 24 * 3600 * 1000
      dateTimeLabelFormat = "%e. %b"
    } else if ( daysAmount === 90 ) {
      tickInterval = 30 * 24 * 3600 * 1000
    } else if ( daysAmount === 2000 ) {
      const yearsAmount = new Date(data[ data.length - 1 ][ 0 ]).getFullYear() - new Date(data[ 0 ][ 0 ]).getFullYear()
      if ( yearsAmount <= 1 ) {
        tickInterval = 30 * 24 * 3600 * 1000
      } else if ( yearsAmount > 1 && yearsAmount < 4 ) {
        tickInterval = 90 * 24 * 3600 * 1000
      } else {
        tickInterval = 360 * 24 * 3600 * 1000
        dateTimeLabelFormat = '%Y'
      }
    }

    const config = {
      chart: {
        height: 550,
      },
      rangeSelector: {
        enabled: false,
      },
      title: {
        text: null
      },
      plotOptions: {
        area: {
          color: 'rgb(224,224,224)',
          lineWidth: 2.5
        },
        line: {
          color: 'rgb(255,120,0)',
          lineWidth: 2.5
        }
      },
      series: [
        {
          type: "line",
          name: label,
          data: data,
        },
        {
          type: "area",
          name: label,
          yAxis: 1,
          data: volume,
        }
      ],
      navigator: {
        handles: {
          backgroundColor: 'red',
          borderColor: 'yellow'
        },
        xAxis: {
          labels: {
            formatter: function () {
              this.dateTimeLabelFormat = daysAmount === 24 ? "%H:%M" : "%b '%y"
              return this.axis.defaultLabelFormatter.call(this)
            }
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgb(97, 97, 97)',
        borderColor: 'rgb(97, 97, 97)',
        borderRadius: 5,
        split: false,
        formatter: function () {
          return '<span class="graphTooltipTimeText">' + moment.utc(this.x).format("ddd, MMM D YYYY, HH:mm:SS") + ' UTC </span> <br><span class="graphTooltipText">' + label + ' ' + (+this.y).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1, ") + '</span>'
        },
        valueDecimals: 2
      },
      yAxis: [
        {
          type: scaleType,
          showLastLabel: true,
          lineColor: '#DFDFDF',
          opposite: false,
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: ''
          },
          height: '70%',
          lineWidth: 2,
          resize: {
            enabled: true
          }
        },
        {
          min: 0,
          showLastLabel: true,
          lineColor: '#DFDFDF',
          opposite: false,
          labels: {
            align: 'right',
            x: -3,
            formatter: function () {
              return this.isFirst || this.isLast ? this.axis.defaultLabelFormatter.call(this) : ''
            }
          },
          title: {
            text: '',
          },
          top: '75%',
          height: '25%',
          offset: 0,
          lineWidth: 2
        }
      ],
      xAxis: {
        tickInterval,
        labels: {
          formatter: function () {
            this.dateTimeLabelFormat = dateTimeLabelFormat
            return this.axis.defaultLabelFormatter.call(this)
          }
        }
      }
    }

    return config
  }

  render() {
    const { pending, showPriceGraph } = this.props
    if ( pending ) {
      return (
        <Container fluid className="p-0">
          <div className="spinnerContainer">
            <RingLoader
              size={150}
              color={'#FD552D'}
              loading={true}
            />
          </div>
        </Container>
      )
    }
    return (
      <Row>
        <Col xl={12} lg={12} md={12} sm={12}>
          { showPriceGraph &&
          <Container fluid className="bg-white priceGraphsPartContainer">
            <Col>
              <p className="sectionTitle mb-3">Price Chart</p>
            </Col>
            <Container fluid className="p-0 mr-2">
              <Col className="d-flex pr-0">
                <Col xl={{ size: 4, offset: 0 }} lg={{ size: 4, offset: 0 }} md={{ size: 3, offset: 0 }} sm={{ size: 3, offset: 0 }} xs={{ size: 4, offset: 0 }} className="lineGraphZoomButtonsContainer pl-0">
                  <p className="lineGraphZoomButtonsLabel">Value:</p>
                  {this.renderValueButtons()}
                </Col>
                <Col xl={{ size: 6, offset: 1 }} lg={{ size: 7, offset: 1 }} md={{ size: 7, offset: 2 }} sm={{ size: 7, offset: 2 }} xs={{ size: 7, offset: 1 }} className="lineGraphZoomButtonsContainer pr-0">
                  <p className="lineGraphZoomButtonsLabel">Zoom:</p>
                  {this.renderZoomButtons()}
                </Col>
              </Col>
              {pending &&
              <Container fluid className="p-0">
                <div className="spinnerContainer">
                  <RingLoader
                    size={150}
                    color={'#FD552D'}
                    loading={true}
                  />
                </div>
              </Container>
              }
              {!pending &&
              <ReactHighstock config={this.lineGraphConfig()}/>
              }
            </Container>
          </Container>
          }
        </Col>
      </Row>
    )
  }
}



const mapStateToProps = state => ({
  data: state.nodes.priceData,
  error: state.nodes.priceError,
  message: state.nodes.priceMessage,
  pending: state.nodes.pricePending
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPrice,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceGraph)


