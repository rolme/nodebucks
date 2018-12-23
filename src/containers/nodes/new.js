import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import { ClipLoader } from 'react-spinners'
import { Alert, Container, Col, Table } from 'reactstrap'
import './index.css'
import { isEmpty } from 'lodash'
import PaymentMethod from './paymentForm'
import AuthForms from './authForms'
import { fetchCrypto } from '../../reducers/cryptos'

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
      purchasing: false,
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
      this.props.history.push('/login')
    }
    this.checkPriceDataAvailability()
  }


  componentWillReceiveProps(nextProps) {
    const { user, node, crypto, nodePending, refreshing, nodeError } = nextProps
    if ( node.status === 'new' ) {
      this.props.history.push('/purchase_success')
      return
    }

    if ( nodeError ) {
      this.props.history.push('/dashboard')
      return
    }

    let buyLiquidity = true
    if ( !!node && !!node.crypto && !!node.crypto.liquidity ) {
      buyLiquidity = node.crypto.liquidity.buy
    } else if ( !!crypto && !!crypto.liquidity ) {
      buyLiquidity = crypto.liquidity.buy
    }

    !buyLiquidity && this.props.history.push('/dashboard')

    if ( !!user && !!node.cost && !nodePending && !refreshing ) {
      const that = this
      setTimeout(() => {
        that.handleExpire()
      }, node.timeLimit * 1000)
    }

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
      masternode.flatSetupFee = item.flatSetupFee
      masternode.masternodes = item.masternodes
      masternode.name = item.name
      masternode.nodePrice = item.nodePrice
      masternode.purchasable = item.purchasable
      masternode.sellPrice = item.sellPrice
      masternode.url = item.url
    } else {
      masternode.annualRoi = item.crypto.annualRoi
      masternode.annualRoiPercentage = item.crypto.annualRoiPercentage
      masternode.cryptoSlug = item.crypto.slug
      masternode.flatSetupFee = item.flatSetupFee
      masternode.masternodes = item.crypto.masternodes
      masternode.name = item.crypto.name
      masternode.nodePrice = item.cost
      masternode.nodeSlug = item.slug
      masternode.purchasable = item.crypto.purchasable
      masternode.sellPrice = item.sellPrice
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
    this.props.purchaseNode(paymentResponse, node.slug, () => {})
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

  render() {
    const { crypto, node, nodeMessage, user, nodePending, cryptoPending } = this.props
    const { showReloadAlert, purchasing } = this.state

    if ( cryptoPending || nodePending ) {
      return <div className="spinnerContainer pageLoaderContainer"><RingLoader size={100} color={'#3F89E8'} loading={true}/></div>
    }

    if ( !isEmpty(crypto) && [ 'Unavailable', 'Contact Us' ].includes(crypto.purchasableStatus) ) return <Redirect to={`/masternodes/${crypto.slug}`}/>
    if ( !isEmpty(node) && [ 'Unavailable', 'Contact Us' ].includes(node.crypto.purchasableStatus) ) return <Redirect to={`/masternodes/${node.crypto.slug}`}/>

    const masternode = this.convertToMasternode((!!user) ? node : crypto)
    if ( !!user && !user.enabled ) return <Redirect to={`/masternodes/${masternode.name.toLowerCase()}`}/>
    if ( !!user && user.verificationStatus !== 'approved' && +masternode.nodePrice > 10000.0 ) return <Redirect to={`/masternodes/${masternode.name.toLowerCase()}`}/>
    if ( !!masternode.name && !masternode.purchasable ) return <Redirect to={`/masternodes/${masternode.name.toLowerCase()}`}/>

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
          <div className="purchasePageMainContentContainer">
            <Col className="d-flex align-items-center px-0">
              {!!masternode.cryptoSlug && !nodePending && !cryptoPending && <img alt="logo" src={`/assets/images/logos/${masternode.cryptoSlug}.png`} width="95px" className="p-1"/>}
              <Col className="d-flex flex-column">
                <h1 className="purchasePageHeader pageTitle">
                  {
                    !!nodePending || !!cryptoPending
                      ? 'Calculating latest pricing ...'
                      : `${masternode.name} (${!!masternode.cryptoSlug ? (masternode.cryptoSlug).toUpperCase() : ''})`
                  }
                </h1>
              </Col>
            </Col>
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
              {!!user && !!masternode.nodePrice && !nodePending && this.displayPaymentForm(masternode, purchasing)}
              {!user && <AuthForms/>}
              <p className="purchasePageWithCryptoPaymentMessage"><a href="/contact" target="_blank" rel="noopener noreferrer">Contact Us</a> if you would like to pay with cryptocurrency.</p>
            </Col>
          </div>
        </div>
      </Container>
    )
  }

  displayPaymentForm(item, purchasing) {
    const { refreshing } = this.props
    const { validPrice } = this.state
    return (
      <Col xl={12} className="px-0 pt-2 mt-4">
        <div className='purchasePagePaymentFormContainer'>
          <PaymentMethod
            slug={item.nodeSlug}
            onPurchase={this.handlePurchase}
            togglePurchasingStatus={this.togglePurchasingStatus}
            refreshing={refreshing}
            purchasing={purchasing}
            node={this.props.node}
            price={item.sellPrice}
          />
          {!validPrice &&
          <p className="purchasePagePriceInfo text-center text-danger">Price displayed is no longer valid. Please <span onClick={() => window.location.reload()} className="purchasePageLinkText">reload page</span> to get the latest pricing.</p>
          }
        </div>
      </Col>
    )
  }

  displayCryptoData(item) {
    const { user, nodePending, cryptoPending, refreshing } = this.props

    const { purchasing } = this.state

    let nodePrice = !!item.nodePrice ? '$' + valueFormat(+item.nodePrice, 2) : ''

    const priceHeader = (!!user) ? 'Price' : 'Est. Price'
    const fee = !!item.flatSetupFee ? '$' + valueFormat(+item.flatSetupFee, 2) : '$0'
    let total = '$' + valueFormat((!!item.flatSetupFee ? +item.flatSetupFee : 0) + (!!item.nodePrice ? +item.nodePrice : 0), 2)

    if ( purchasing ) {
      return null;
    }

    const ready = !!nodePrice && !nodePending && !cryptoPending && ((!!nodePrice.props && !!nodePrice.props.children) || !nodePrice.props) && !refreshing

    return (
      <Col xl={12} lg={12} md={12} className="purchasePageCryptoDataTableContainer mt-4 bg-white">
        <Table borderless className="mb-0">
          <thead>
          <tr>
            <th className="text-center">Qty</th>
            <th>Item</th>
            <th><p className="priceColumn">{priceHeader}</p></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td className="text-center">1</td>
            <td>{item.name} Masternode</td>
            <td className="bold">
              <div className="priceColumn">
                {ready ? nodePrice :
                  <ClipLoader
                    size={35}
                    color={'#3F89E8'}
                    loading={true}
                  />}
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>One-Time Setup Fee</td>
            <td className="bold">
              <div className="priceColumn">
                {ready ? fee :
                  <ClipLoader
                    size={35}
                    color={'#3F89E8'}
                    loading={true}
                  />}
              </div>
            </td>
          </tr>
          <tr className="totalRow">
            <td></td>
            <td className="bold">Total Amount</td>
            <td className="bold">
              <div className="priceColumn">
                {ready ? total :
                  <ClipLoader
                    size={35}
                    color={'#3F89E8'}
                    loading={true}
                  />}
              </div>
            </td>
          </tr>
          </tbody>
        </Table>
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
