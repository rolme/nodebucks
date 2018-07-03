import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { Button, Container, Col, Row } from 'reactstrap'
import './index.css'

import Countdown from '../../components/countdown'
import LogIn from '../authenticate/login'
import SignUp from '../authenticate/signUp'

import { fetchCrypto } from '../../reducers/cryptos'
import {
  purchaseNode,
  reserveNode
} from '../../reducers/nodes'


class NewNode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      validPrice: true
    }
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  componentWillMount() {
    let { match: { params }, user } = this.props

    if ( !!user ) {
      this.props.reserveNode(params.crypto)
    } else {
      this.props.fetchCrypto(params.crypto)
    }
  }

  convertToMasternode(item) {
    let masternode = {}
    if ( item.crypto === undefined ) {
      masternode.annualRoi = item.annualRoi
      masternode.cryptoSlug = item.slug
      masternode.masternodes = item.masternodes
      masternode.name = item.name
      masternode.nodePrice = item.nodePrice
      masternode.url = item.url
    } else {
      masternode.annualRoi = item.crypto.annualRoi
      masternode.cryptoSlug = item.crypto.slug
      masternode.masternodes = item.crypto.masternodes
      masternode.name = item.crypto.name
      masternode.nodePrice = item.cost
      masternode.nodeSlug = item.slug
      masternode.timeLimit = item.timeLimit
      masternode.url = item.crypto.url
    }

    return masternode
  }

  handleExpire() {
    this.setState({ validPrice: false })
  }

  handlePurchase(slug) {
    this.props.purchaseNode(slug)
  }

  handleReload() {
    window.location.reload()
  }


  handleRefresh() {
    let { match: { params } } = this.props
    this.props.reserveNode(params.crypto, true)
  }

  render() {
    const { crypto, history, node, nodeMessage, user } = this.props

    if ( nodeMessage === 'Purchase node successful.' ) {
      history.push('/dashboard')
    }

    const masternode = this.convertToMasternode((!!user) ? node : crypto)
    return (
      <Container fluid className="bg-white nodePageContainer">
        <div className="contentContainer">
          <h1 className="pt-3">
            {!!masternode.cryptoSlug && <img alt="logo" src={`/assets/images/logos/${masternode.cryptoSlug}.png`} height="55px" width="55px" className="p-1"/>}
            Purchase {masternode.name} Masternode
          </h1>
          <a href={masternode.url} target="_new">Homepage</a> | <a href={`https://coinmarketcap.com/currencies/${masternode.cryptoSlug}/`} target="_new">Market Info</a>
          <Col xl={12} className="d-flex px-0">
            {this.displayCryptoData(masternode)}
            {this.displayPricingInfo(masternode)}
          </Col>
        </div>
      </Container>
    )
  }

  displayCryptoData(item) {
    const { user, refreshing } = this.props
    const { validPrice } = this.state

    let nodePrice = (!!item.nodePrice || item.nodePrice === '0') ? '$' + (+item.nodePrice).toFixed().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' USD' : ''
    const annualRoi = (!!item.annualRoi || item.annualRoi === '0') ? ((+item.annualRoi) * 100.0).toFixed(1) + ' %' : ''
    const priceHeader = (!!user) ? 'Price' : 'Est. Price'

    if ( !!user ) {
      nodePrice = (validPrice) ? nodePrice : (<s>{nodePrice}</s>)
    }

    return (
      <Col xl={8} className="px-0 pt-2">
        <Row>
          <Col xl={4}>Est. Annual ROI</Col>
          <Col xl={4}>{priceHeader}</Col>
          <Col xl={4}>Total Masternodes</Col>
        </Row>
        <Row>
          <Col xl={4}>{!!annualRoi ? annualRoi : <ClipLoader
            size={35}
            color={'#3F89E8'}
            loading={true}
          />}</Col>
          <Col xl={4} className="d-flex align-items-center">
            {!!nodePrice && ((!!nodePrice.props && !!nodePrice.props.children) || !nodePrice.props) && !refreshing ? nodePrice : <ClipLoader
              size={35}
              color={'#3F89E8'}
              loading={true}
            />}
            {!!user && !!nodePrice && ((!!nodePrice.props && !!nodePrice.props.children) || !nodePrice.props) && <Button disabled={refreshing} className="purchasePageRefreshButton" onClick={this.handleRefresh}>Refresh</Button>}
          </Col>
          <Col xl={4}>{!!item.masternodes ? item.masternodes : <ClipLoader
            size={35}
            color={'#3F89E8'}
            loading={true}
          />}</Col>
        </Row>
        {!!user && (
          <Row>
            <Col xl={12} className="py-4 text-center">
              Credit Card Form Here
            </Col>
            <Col xl={12} className="py-2 text-center">
              {validPrice && <Button disabled={refreshing} color="primary" onClick={this.handlePurchase.bind(this, item.nodeSlug)}>Purchase Node</Button>}
              {!validPrice && <Button disabled={refreshing} color="secondary" className="btn-outline-secondary" onClick={this.handleReload}>Reload Page</Button>}
            </Col>
          </Row>
        )}
        {!user && (
          <Row>
            <Col xl={12}>
              <LogIn isOnlyForm={true} onSuccess={this.handleReload}/>
            </Col>
            <Col xl={12}>
              <SignUp onSuccess={this.handleReload}/>
            </Col>
          </Row>
        )}

      </Col>
    )
  }

  displayPricingInfo(masternode) {
    const { user, refreshing } = this.props
    const { validPrice } = this.state

    let info = 'Node prices fluctuate frequently so you must purchase within the next 3 minutes to guarantee this price.'
    if ( !user ) {
      info = 'Node prices fluctuate frequently please login or register to gaurantee a price.'
    } else if ( !validPrice ) {
      info = 'Price displayed is no longer valid. Please reload to get latest pricing.'
    }

    return (
      <Col xl={4} className="px-0">
        {!!user && <h2 className="text-center"><Countdown refreshing={refreshing} timer={masternode.timeLimit} onExpire={this.handleExpire.bind(this)}/></h2>}
        <p>{info}</p>
      </Col>
    )
  }
}

const mapStateToProps = state => ({
  crypto: state.cryptos.data,
  cryptoError: state.cryptos.error,
  cryptoMessage: state.cryptos.message,
  cryptoPending: state.cryptos.pending,
  node: state.nodes.data,
  nodeError: state.nodes.error,
  nodeMessage: state.nodes.message,
  nodePending: state.nodes.pending,
  refreshing: state.nodes.refreshing,
  user: state.user.data
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCrypto,
  purchaseNode,
  reserveNode
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNode))
