import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { Alert, Button, Container, Col, Row } from 'reactstrap'
import './index.css'

import Countdown from '../../components/countdown'
import PaymentMethod from './paymentForm'
import AuthForms from './authForms'
import { Elements } from 'react-stripe-elements';
import { fetchCrypto } from '../../reducers/cryptos'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faChartLine, faGlobe } from '@fortawesome/fontawesome-free-solid'
import {
  purchaseNode,
  reserveNode
} from '../../reducers/nodes'


class NewNode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showReloadAlert: false,
      validPrice: true
    }
    this.handleRefresh = this.handleRefresh.bind(this)
    this.handlePurchase = this.handlePurchase.bind(this)
  }

  componentWillMount() {
    let { match: { params }, user } = this.props
    window.scrollTo(0, 0)
    if ( !!user ) {
      this.props.reserveNode(params.crypto)
    } else {
      this.props.fetchCrypto(params.crypto)
    }
    this.checkPriceDataAvailability()
  }

  checkPriceDataAvailability() {
    const that = this
    const { crypto, node, user } = this.props
    const masternode = this.convertToMasternode((!!user) ? node : crypto)
    setTimeout(() => {
      if ( !masternode.nodePrice ) {
        that.setState({ showReloadAlert: true })
      }
    }, 30000)
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

  handleRefresh() {
    let { match: { params } } = this.props
    this.props.reserveNode(params.crypto, true)
    this.setState({ validPrice: true })
    this.checkPriceDataAvailability()
  }

  handleGoBack() {
    window.history.back()
  }

  render() {
    const { crypto, history, node, nodeMessage, user } = this.props
    const { validPrice, showReloadAlert } = this.state

    if ( nodeMessage === 'Purchase node successful.' ) {
      history.push('/dashboard')
    }

    const masternode = this.convertToMasternode((!!user) ? node : crypto)
    return (
      <Container fluid className="purchasePageContainer">
        <div className="contentContainer purchasePageContentContainer">
          {showReloadAlert && !masternode.nodePrice &&
          <Alert color='danger'>
            This is taking longer than usual. Please try again.
          </Alert>
          }
        </div>
        <div className="contentContainer purchasePageContentContainer">
          <p onClick={this.handleGoBack} className="purchasePageBackButton"><img src="/assets/images/backArrow.png" alt="Back"/>Back</p>
          <div className="purchasePageMainContentContainer">
            <h1 className="pt-3 text-center purchasePageHeader">
              {!!masternode.cryptoSlug && <img alt="logo" src={`/assets/images/logos/${masternode.cryptoSlug}.png`} height="55px" width="55px" className="p-1"/>}
              Purchase {masternode.name} Masternode
            </h1>
            {!!masternode && !!masternode.url && !!masternode.name &&
            <Col xl={12} className="d-flex justify-content-center purchasePageLinksContainer">
              <a href={masternode.url} target="_new"><FontAwesomeIcon icon={faGlobe} color="#2283C7"/> {masternode.name} Homepage</a>
              <a href={`https://coinmarketcap.com/currencies/${masternode.cryptoSlug}/`} target="_new"><FontAwesomeIcon icon={faChartLine} color="#2283C7"/> {masternode.name} Market Info</a>
            </Col>
            }
            <Col xl={12} className="d-flex px-0 flex-wrap">
              {this.displayCryptoData(masternode)}
              {this.displayPricingInfo(masternode)}
              {!!user && validPrice && !!masternode.nodePrice && this.displayPaymentForm(masternode)}
              {!user && <AuthForms/>}
            </Col>
          </div>
        </div>
      </Container>
    )
  }

  displayPaymentForm(item) {
    const { refreshing } = this.props
    return (
      <Col xl={12} className="px-0 pt-2">
        <div className='purchasePagePaymentFormContainer'>
          <Elements>
            <PaymentMethod slug={item.nodeSlug} onSuccess={this.handlePurchase} refreshing={refreshing}/>
          </Elements>
        </div>
      </Col>
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
      <Col xl={12} lg={12} md={12} className="px-0 pt-2">
        <Row className="purchasePageCrpytoDataContainer">
          <Col xl={{ size: 4, offset: 0 }} lg={{ size: 4, offset: 0 }} md={{ size: 8, offset: 2 }} className="d-flex flex-column align-items-center mb-3">
            <p className="mb-0">Est. Annual ROI</p>
            {!!annualRoi ? <p className="mb-0">{annualRoi}</p> : <ClipLoader
              size={35}
              color={'#3F89E8'}
              loading={true}
            />}</Col>
          <Col xl={{ size: 4, offset: 0 }} lg={{ size: 4, offset: 0 }} md={{ size: 8, offset: 2 }} className="d-flex flex-column align-items-center mb-3">
            <p className="mb-0">{priceHeader}</p>
            <div className="d-flex align-items-center justify-content-center">
              {!!nodePrice && ((!!nodePrice.props && !!nodePrice.props.children) || !nodePrice.props) && !refreshing ? <p className="mb-0">{nodePrice}</p> : <ClipLoader
                size={35}
                color={'#3F89E8'}
                loading={true}
              />}
              {!!user && !!nodePrice && ((!!nodePrice.props && !!nodePrice.props.children) || !nodePrice.props) && <Button disabled={refreshing} className="purchasePageRefreshButton" onClick={this.handleRefresh}>Refresh</Button>}
            </div>
          </Col>
          <Col xl={{ size: 4, offset: 0 }} lg={{ size: 4, offset: 0 }} md={{ size: 8, offset: 2 }} className="d-flex flex-column align-items-center mb-3">
            <p className="mb-0">Total Masternodes</p>
            {!!item.masternodes ? <p className="mb-0">{item.masternodes}</p> : <ClipLoader
              size={35}
              color={'#3F89E8'}
              loading={true}
            />}</Col>
        </Row>
      </Col>
    )
  }

  displayPricingInfo(masternode) {
    const { user, refreshing } = this.props
    const { validPrice } = this.state

    let info = <p className="text-center">Node prices fluctuate frequently so you must purchase within the next 3 minutes to guarantee this price.</p>
    if ( !user ) {
      info = <p className="text-center">Node prices fluctuate frequently please login or register to gaurantee a price.</p>
    } else if ( !validPrice ) {
      info = <p className="text-center">Price displayed is no longer valid. Please <span onClick={() => window.location.reload()} className="purchasePageLinkText">reload page</span> to get the latest pricing.</p>
    }
    return (
      <Col xl={{ size: 10, offset: 1 }} lg={{ size: 10, offset: 1 }} md={{ size: 10, offset: 1 }} className="px-0 mt-4">
        {!!user && <h2 className="text-center"><Countdown refreshing={refreshing} timer={masternode.timeLimit} onExpire={this.handleExpire.bind(this)}/></h2>}
        {info}
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
