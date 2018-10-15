import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import { ClipLoader } from 'react-spinners'
import { Alert, Container, Col, Row, Tooltip, Button, } from 'reactstrap'
import './index.css'
import { isEmpty } from 'lodash'
import Countdown from '../../components/countdown'
import PaymentMethod from './paymentForm'
import AuthForms from './authForms'
import { fetchCrypto } from '../../reducers/cryptos'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/fontawesome-free-solid'

import {
  purchaseNode,
  reserveNode,
  fetchNodes,
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
      this.props.history.push('/login')
    }
    this.checkPriceDataAvailability()
  }


  componentWillReceiveProps(nextProps) {
    const { node, crypto } = nextProps
    let buyLiquidity = true
    if ( !!node && !!node.crypto && !!node.crypto.liquidity ) {
      buyLiquidity = node.crypto.liquidity.buy
    } else if ( !!crypto && !!crypto.liquidity ) {
      buyLiquidity = crypto.liquidity.buy
    }
    !buyLiquidity && this.props.history.push('/dashboard')

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
      masternode.annualRoiPercentage = item.annualRoiPercentage
      masternode.cryptoSlug = item.slug
      masternode.masternodes = item.masternodes
      masternode.name = item.name
      masternode.nodePrice = item.nodePrice
      masternode.url = item.url
    } else {
      masternode.annualRoi = item.crypto.annualRoi
      masternode.annualRoiPercentage = item.crypto.annualRoiPercentage
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

  handlePurchase(paymentResponse) {
    const { node } = this.props
    this.togglePurchasingStatus()
    this.props.purchaseNode(paymentResponse, node.slug, () => {
      this.props.fetchNodes()
    })
  }

  togglePurchasingStatus = () => {
    this.setState({
      purchasing: !this.state.purchasing
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
    const { crypto, node, nodeMessage, user, nodePending, cryptoPending } = this.props
    const { validPrice, showReloadAlert, purchasing } = this.state

    if (purchasing) return <Redirect to='/dashboard'/>

    if (cryptoPending || nodePending) {
      return <div className="spinnerContainer pageLoaderContainer"><RingLoader size={100} color={'#3F89E8'} loading={true}/></div>
    }

    if (!isEmpty(crypto) && ['Unavailable', 'Contact Us'].includes(crypto.purchasableStatus)) return <Redirect to={`/masternodes/${crypto.slug}`} />
    if (!isEmpty(node) && ['Unavailable', 'Contact Us'].includes(node.crypto.purchasableStatus)) return <Redirect to={`/masternodes/${node.crypto.slug}`} />

    const masternode = this.convertToMasternode((!!user) ? node : crypto)
    if (!!user && !user.enabled) return <Redirect to={`/masternodes/${masternode.name.toLowerCase()}`} />
    if (!!user && user.verificationStatus !== 'approved' && +masternode.nodePrice > 10000.0) return <Redirect to={`/masternodes/${masternode.name.toLowerCase()}`} />

    return (
      <Container fluid className="purchasePageContainer">
        {showReloadAlert && !masternode.nodePrice &&
        <div className="contentContainer purchasePageContentContainer">
          <Alert color='danger'>
            This is taking longer than usual. Please try again.
          </Alert>
        </div>
        }
        <div className="contentContainer purchasePageContentContainer">
          <p onClick={this.handleGoBack} className="purchasePageBackButton"><img src="/assets/images/backArrow.png" alt="Back"/>Back</p>
          <div className="purchasePageMainContentContainer">
            <h1 className="pt-3 text-center purchasePageHeader pageTitle">
              {!!masternode.cryptoSlug && !nodePending && !cryptoPending && <img alt="logo" src={`/assets/images/logos/${masternode.cryptoSlug}.png`} width="60px" className="p-1"/>}
              {
                !!nodePending || !!cryptoPending
                  ? 'Calculating latest pricing ...'
                  : `Purchase ${masternode.name} Masternode`
              }
            </h1>
            {
              nodeMessage === 'Node price is 0. Purchase rejected.' &&
              <Alert color='danger'>
                {nodeMessage}
              </Alert>
            }
            <Col xl={12} className="d-flex px-0 flex-wrap justify-content-center">
              {
                !!nodePending || !!cryptoPending
                  ? <div className="loadingSnipperContainer">
                    <ClipLoader
                      size={35}
                      color={'#3F89E8'}
                      loading={true}
                    />
                  </div>
                  : this.displayCryptoData(masternode)
              }
              {!nodePending && !purchasing && this.displayPricingInfo(masternode)}
              {!!user && validPrice && !!masternode.nodePrice && !nodePending && this.displayPaymentForm(masternode, purchasing)}
              {!user && <AuthForms/>}
              <p className="purchasePageWithCryptoPaymentMessage">Want to pay with crypto? <a href="/contact" target="_blank" rel="noopener noreferrer">Contact us for payment details.</a></p>
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
          <PaymentMethod
            slug={item.nodeSlug}
            onPurchase={this.handlePurchase}
            togglePurchasingStatus={this.togglePurchasingStatus}
            refreshing={refreshing}
            purchasing={purchasing}
            node={this.props.node}
          />
        </div>
      </Col>
    )
  }

  toggleTooltip(name) {
    name = name + 'TooltipOpen'
    this.setState({ [ name ]: !this.state[ name ] })
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

  renderSpreadWarning() {
    const { node } = this.props
    let difference = +node.value / node.cost
    if ( difference < 0.85 ) {
      const sellValue = valueFormat(+node.value, 2)
      difference = '-' + (valueFormat((1 - difference)*100, 2)) + '%'
      return (
        <Col xl={{ size: 8, offset: 2 }} lg={{ size: 4, offset: 4 }} md={{ size: 8, offset: 2 }} className="spreadWarningMessageContainer d-flex flex-column align-items-center justify-content-center">
          <p>Warning: Due to low liquidity on exchanges, the resell value of this masternode is well below the purchase price. </p>
          <p>Sell Value: ${sellValue} ({difference})</p>
        </Col>
      )
    }
  }

  displayCryptoData(item) {
    const { user, refreshing, node, nodePending, cryptoPending } = this.props

    const { validPrice, spreadTooltipOpen, purchasing } = this.state

    let nodePrice = (!!item.nodePrice || item.nodePrice === '0') ? '$' + valueFormat(+item.nodePrice) : ''

    const spread = (!!node.cost && node.value) ? '$' + valueFormat(+node.cost - node.value) : ''
    const annualRoi = (!!item.annualRoiPercentage || item.annualRoiPercentage === '0') ? (valueFormat((+item.annualRoiPercentage) * 100, 2) + ' %') : ''
    const priceHeader = (!!user) ? 'Price' : 'Est. Price'

    if ( !!user ) {
      nodePrice = (validPrice) ? nodePrice : (<s>{nodePrice}</s>)
    }

    if ( purchasing ) {
      return null;
    }

    return (
      <Col xl={12} lg={12} md={12} className="px-0 pt-2">
        <Row className="purchasePageCrpytoDataContainer">
          <Col xl={{ size: 4, offset: 0 }} lg={{ size: 4, offset: 0 }} md={{ size: 8, offset: 2 }} className="d-flex flex-column align-items-center mb-3">
            <h6 className="mb-0">Estimated Annual ROI</h6>
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
          {this.renderSpreadWarning(item)}
        </Row>
        }
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
  reserveNode,
  fetchNodes,
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNode))
