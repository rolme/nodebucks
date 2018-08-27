import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { Alert, Button, Container, Col, Row, Tooltip } from 'reactstrap'
import './index.css'

import Countdown from '../../components/countdown'
import PaymentMethod from './paymentForm'
import AuthForms from './authForms'
import { Elements } from 'react-stripe-elements'
import { fetchCrypto } from '../../reducers/cryptos'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/fontawesome-free-solid'

import {
  purchaseNode,
  reserveNode
} from '../../reducers/nodes'

import { valueFormat } from "../../lib/helpers"


class NewNode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showReloadAlert: false,
      validPrice: true,
      spreadTooltipOpen: false,
      purchasing: false,
      purchased: false,
    }
    this.handleRefresh = this.handleRefresh.bind(this)
    this.handlePurchase = this.handlePurchase.bind(this)
    this.toggleTooltip = this.toggleTooltip.bind(this)
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
    this.togglePurchasingStatus()
    this.props.purchaseNode(slug)
  }

  togglePurchasingStatus = () => {
    this.setState({
      purchasing: !this.state.purchasing
    })
  }

  setAsPurchased = () => {
    this.setState({
      purchased: !this.state.purchased
    })
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
    const { validPrice, showReloadAlert, purchasing, purchased } = this.state
    
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
            <h1 className="pt-3 text-center purchasePageHeader pageTitle">
              {!!masternode.cryptoSlug && <img alt="logo" src={`/assets/images/logos/${masternode.cryptoSlug}.png`} width="60px" className="p-1"/>}
              Purchase {!!masternode.name ? masternode.name : ''} Masternode
            </h1>
            {!!masternode && !!masternode.url && !!masternode.name &&
            <Col xl={12} className="d-flex justify-content-center purchasePageLinksContainer">
              <a href={masternode.url} target="_new"> <img alt="logo" src={`/assets/images/globe.png`} width="26px" className="mr-2"/>{masternode.name} Homepage</a>
              <a href={`https://coinmarketcap.com/currencies/${masternode.cryptoSlug}/`} target="_new"><img alt="logo" src={`/assets/images/chartLine.png`} width="23px" className="mr-2"/> {masternode.name} Market Info</a>
            </Col>
            }
            <Col xl={12} className="d-flex px-0 flex-wrap">
              { !purchased && !purchasing && this.displayCryptoData(masternode, purchasing, purchased)}
              { !purchased && !purchasing && this.displayPricingInfo(masternode)}
              {!!user && validPrice && !!masternode.nodePrice  && this.displayPaymentForm(masternode, purchasing)}
              {!user && <AuthForms/>}
            </Col>
          </div>
        </div>
      </Container>
    )
  }

  displayPaymentForm(item, purchasing) {
    const { refreshing } = this.props
    return (
      <Col xl={12} className="px-0 pt-2">
        <div className='purchasePagePaymentFormContainer'>
          <Elements>
            <PaymentMethod 
              slug={item.nodeSlug} 
              onPurchase={this.handlePurchase} 
              setAsPurchased={this.setAsPurchased}
              togglePurchasingStatus={this.togglePurchasingStatus}
              refreshing={refreshing}
              purchasing={purchasing}
            />
          </Elements>
        </div>
      </Col>
    )
  }

  toggleTooltip(name) {
    name = name + 'TooltipOpen'
    this.setState({ [name]: !this.state[ name ] })
  }

  displayCryptoData(item) {
    const { user, refreshing, node, nodePending, cryptoPending } = this.props
    const { validPrice, spreadTooltipOpen } = this.state

    let nodePrice = (!!item.nodePrice || item.nodePrice === '0') ? '$' + valueFormat(+item.nodePrice) : ''
    const spread =  (!!node.cost && node.value) ? '$' + valueFormat(+node.cost - node.value) : ''
    const annualRoi = (!!item.annualRoi || item.annualRoi === '0') ? ((+item.annualRoi) * 100.0).toFixed(1) + ' %' : ''
    const priceHeader = (!!user) ? 'Price' : 'Est. Price'

    if ( !!user ) {
      nodePrice = (validPrice) ? nodePrice : (<s>{nodePrice}</s>)
    }

    return (
      <Col xl={12} lg={12} md={12} className="px-0 pt-2">
        <Row className="purchasePageCrpytoDataContainer">
          <Col xl={{ size: 4, offset: 0 }} lg={{ size: 4, offset: 0 }} md={{ size: 8, offset: 2 }} className="d-flex flex-column align-items-center mb-3">
            <h6 className="mb-0">Est. Annual ROI</h6>
            {!!annualRoi && !nodePending && !cryptoPending ? <p className="mb-0">{annualRoi}</p> : <ClipLoader
              size={35}
              color={'#3F89E8'}
              loading={true}
            />}</Col>
          <Col xl={{ size: 4, offset: 0 }} lg={{ size: 4, offset: 0 }} md={{ size: 8, offset: 2 }} className="d-flex flex-column align-items-center mb-3">
            <h6 className="mb-0">{priceHeader}</h6>
            <div className="d-flex align-items-center justify-content-center">
              {!!nodePrice && !nodePending && !cryptoPending && ((!!nodePrice.props && !!nodePrice.props.children) || !nodePrice.props) && !refreshing ? <p className="mb-0">{nodePrice}</p> : <ClipLoader
                size={35}
                color={'#3F89E8'}
                loading={true}
              />}
            </div>
          </Col>
          <Col xl={{ size: 4, offset: 0 }} lg={{ size: 4, offset: 0 }} md={{ size: 8, offset: 2 }} className="d-flex flex-column align-items-center mb-3">
            <h6 className="mb-0">Total Masternodes</h6>
            {!!item.masternodes && !nodePending && !cryptoPending ? <p className="mb-0">{item.masternodes}</p> : <ClipLoader
              size={35}
              color={'#3F89E8'}
              loading={true}
            />}</Col>
        </Row>
        {!!nodePrice && !!spread && !nodePending && !cryptoPending && ((!!nodePrice.props && !!nodePrice.props.children) || !nodePrice.props) && !refreshing &&
        <Row>
          <Col xl={{ size: 4, offset: 4 }} lg={{ size: 4, offset: 4 }} md={{ size: 8, offset: 2 }} className="d-flex align-items-center justify-content-center">
            <p className="mb-0 purchasePageSpreadText">*Spread: {spread} <span id="spreadTooltip">?</span></p>
            <Tooltip placement="top-end" isOpen={spreadTooltipOpen} target="spreadTooltip" className="spreadTooltipContainer" toggle={() => this.toggleTooltip('spread')}>
              <span>The spread is the difference between the buy and sell price of this masternode.</span> <br/>It is determined by the exchange order books. A spread of $100 means you will lose $100 if you sell your node immediately after purchasing it.
            </Tooltip>
          </Col>
        </Row>
        }
      </Col>
    )
  }

  displayPricingInfo(masternode) {
    const { user, refreshing, nodePending, cryptoPending } = this.props
    const { validPrice } = this.state
    let nodePrice = (!!masternode.nodePrice || masternode.nodePrice === '0')

    let info = <p className="purchasePagePriceInfo text-center">Node prices fluctuate frequently so you must purchase within the next 3 minutes to guarantee this price.</p>
    if ( !user ) {
      info = <p className="purchasePagePriceInfo text-center">Node prices fluctuate frequently. Login or register to guarantee a price. </p>
    } else if ( !validPrice ) {
      info = <p className="purchasePagePriceInfo text-center">Price displayed is no longer valid. Please <span onClick={() => window.location.reload()} className="purchasePageLinkText">reload page</span> to get the latest pricing.</p>
    }
    return (
      <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} className="px-0 purchasePagePricingInfoPartContainer">
        <Col xl={{ size: 10, offset: 1 }} lg={{ size: 10, offset: 1 }} md={{ size: 10, offset: 1 }} className="px-0 d-flex align-items-center justify-content-center flex-column">
          {!!user && <h2 className="purchasePageCountDown text-center"><Countdown refreshing={refreshing || !!nodePending || !!cryptoPending} timer={masternode.timeLimit} onExpire={this.handleExpire.bind(this)}/></h2>}
          {info}
          {!!user && !nodePending && !cryptoPending && nodePrice && <Button disabled={refreshing} className="purchasePageRefreshButton" onClick={this.handleRefresh}> <FontAwesomeIcon icon={faSyncAlt} color="#4D91CD" className="mr-2"/>Refresh</Button>}
        </Col>
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
