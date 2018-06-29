import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Container, Col, Row } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faChartLine, faGlobe } from '@fortawesome/fontawesome-free-solid'
import './index.css'

import Countdown from '../../components/countdown'

import { fetchCrypto } from '../../reducers/cryptos'


class NewNode extends Component {
  componentWillMount() {
    let { match: { params } } = this.props
    console.log(this.props)
    this.props.fetchCrypto(params.crypto)
  }

  render() {
    const { crypto, pending } = this.props

    if (pending || crypto.name === undefined) {
      return <h4>Loading..</h4>
    }

    return (
      <Container fluid className="bg-white nodePageContainer">
        <div className="contentContainer">
          <h1 className="pt-3">
            <img alt="logo" src={`/assets/images/logos/${crypto.name}.png`} height="55px" width="55px" className="p-1"/>
            Purchase {crypto.name} Masternode
          </h1>
          <a href={crypto.url} target="_new">Homepage</a> | <a href={`https://coinmarketcap.com/currencies/${crypto.slug}/`} target="_new">Market Info</a>
          <Col xl={12} className="d-flex px-0">
            {this.displayCryptoData(crypto)}
            {this.displayPricingInfo()}
          </Col>
        </div>
      </Container>
    )
  }

  displayCryptoData(item) {
    const { user } = this.props

    const nodePrice      = (!!item.nodePrice || item.nodePrice === '0') ? '$' + (+item.nodePrice).toFixed().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' USD' : '-'
    const yearlyRoiValue = (!!item.yearlyRoiValue || item.yearlyRoiValue === '0') ? '$' + (+item.yearlyRoiValue).toFixed().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' USD' : '-'
    const annualRoi      = (!!item.annualRoi || item.annualRoi === '0') ? ((+item.annualRoi) * 100.0).toFixed(1) + ' %' : '-'
    const priceHeader    = (!!user) ? 'Price' : 'Est. Price'
    return(
      <Col xl={8} className="px-0 pt-2">
        <Row>
          <Col xl={4}>Est. Annual ROI</Col>
          <Col xl={4}>{priceHeader}</Col>
          <Col xl={4}>Total Masternodes</Col>
        </Row>
        <Row>
          <Col xl={4}>{annualRoi}</Col>
          <Col xl={4}>{nodePrice}</Col>
          <Col xl={4}>{item.masternodes}</Col>
        </Row>
      </Col>
    )
  }

  displayPricingInfo() {
    const { user } = this.props

    let info = 'Node prices fluctuate frequently so you must purchase within the next 3 minutes to guarantee this price.'
    if (!user) {
      info = 'Node prices fluctuate frequently please login or register to gaurantee a price.'
    }
    return(
      <Col xl={4} className="px-0">
        { !!user && <Countdown timer="3"/> }
        <p>{info}</p>
      </Col>
    )
  }
}

const mapStateToProps = state => ({
  crypto: state.cryptos.data,
  error: state.cryptos.error,
  message: state.cryptos.message,
  pending: state.cryptos.pending,
  user: state.user.data
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCrypto
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNode)
