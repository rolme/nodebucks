import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { valueFormat } from "../../lib/helpers";

import CryptoTable from '../../components/cryptos/table'

import { Col } from 'reactstrap'
import './index.css'

import {
  fetchCryptos
} from '../../reducers/cryptos'

class Masternodes extends Component {

  componentWillMount() {
    window.scrollTo(0, 0)
    const { cryptos } = this.props

    if ( cryptos.length === 0 ) {
      this.props.fetchCryptos()
    }
  }

  renderCoinsInfo(cryptos) {
    return cryptos.sort((a, b) => a.name > b.name).map((crypto, index) => {
      const logoUrl = !!crypto.logo_url ? crypto.logo_url : `/assets/images/logos/${crypto.slug}.png`
      const cryptoUrlName = new URL(crypto.url).host
      const nodePrice = valueFormat(crypto.nodePrice, 0)
      const annualRoi = valueFormat(crypto.annualRoiPercentage * 100, 2)
      const yearlyRoiValue = valueFormat(crypto.yearlyRoiValue, 0)
      const monthlyRoiValue = valueFormat(crypto.monthlyRoiValue, 0)
      return (
        <Col key={index} className="masternodesListingCoinInfoContainer">
          <Col xl={{ size: 2, offset: 0 }} lg={{ size: 2, offset: 0 }} md={{ size: 2, offset: 0 }} sm={{ size: 6, offset: 3 }} className="d-flex flex-xl-column flex-lg-column flex-md-column flex-row align-items-center justify-content-center px-0">
            <img alt="logo" src={logoUrl} width="95px"/>
            <div className="d-flex justify-content-center flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-start ml-xl-0 ml-lg-0 ml-md00 ml-3">
              <p className="masternodesListingCoinName">{crypto.name}</p>
              <a href={crypto.url} target="_new" className="masternodesListingCoinLink"> <img alt="logo" src={`/assets/images/globe.png`} width="20px" className="mr-2"/>{cryptoUrlName}</a>
            </div>
          </Col>
          <Col xl={{ size: 7, offset: 0 }} lg={{ size: 7, offset: 0 }} md={{ size: 7, offset: 0 }} className="masternodesListingCoinInfoDescriptionPartContainer">
            <p className="masternodesListingCoinInfoDescription">{crypto.description}</p>
            <Col className="d-flex justify-content-between flex-wrap">
              <div className="masternodesListingCoinInfoDescriptionDataContainer">
                <h6>Annual ROI</h6>
                <p>{annualRoi} %</p>
              </div>
              <div className="masternodesListingCoinInfoDescriptionDataContainer">
                <h6>Yearly Return</h6>
                <p>$ {yearlyRoiValue} USD</p>
              </div>
              <div className="masternodesListingCoinInfoDescriptionDataContainer">
                <h6>Monthly Return</h6>
                <p>$ {monthlyRoiValue} USD</p>
              </div>
            </Col>
          </Col>
          <Col xl={{ size: 3, offset: 0 }} lg={{ size: 3, offset: 0 }} md={{ size: 3, offset: 0 }} className="d-flex flex-column align-items-center justify-content-center px-0">
            <p className="masternodesListingCoinInfoPriceLabel">Node Price</p>
            <p className="masternodesListingCoinInfoPrice">$ {nodePrice} USD</p>
            <NavLink to={`/masternodes/${crypto.slug}`} className="btn btn-primary masternodesListingCoinInfoButton addNodeButton"><img src="/assets/images/plusIcon.png" alt="add" className="mr-2"/> Select</NavLink>
          </Col>
        </Col>
      )
    })

  }

  render() {
    const { cryptos, user, bgColor } = this.props
    console.log(this.props)
    return (
      <div className={`${!!bgColor ? bgColor : ""} masternodesContainer`}>
        <div className="contentContainer">
          {!!user &&
          <div>
            <h1 className="masternodesSectionHeader">Select a Masternode</h1>
            {this.renderCoinsInfo(cryptos)}
          </div>
          }
          {!!user &&
          <h1 className="masternodesSectionHeader">Compare Masternodes</h1>
          }
          <CryptoTable list={cryptos} user={user}/>
          <NavLink to="/contact" className="masternodesPageBottomLink" target="_blank" rel="noopener noreferrer">Click here to request a new masternode coin listing on Nodebucks</NavLink>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cryptos: state.cryptos.list,
  user: state.user.data
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCryptos
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Masternodes)
