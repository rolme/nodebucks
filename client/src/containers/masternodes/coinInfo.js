import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import { Col, Button } from 'reactstrap'
import './index.css'

class CoinInfo extends Component {
  componentWillMount() {
    window.scrollTo(0, 0)
  }

  render() {
    let { match: { params } } = this.props
    return (
      <div className="coinInfoContainer">
        <div className="contentContainer">
          <Col className="d-flex justify-content-between align-items-center px-0 flex-wrap">
            <Col xl={{ size: 3, offset: 0 }} lg={{ size: 3, offset: 0 }} md={{ size: 4, offset: 0 }} sm={{ size: 6, offset: 0 }} xs={{ size: 10, offset: 1 }} className="d-flex align-items-center px-0 justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-start justify-content-center">
              <img alt={params.slug} src={`/assets/images/logos/${params.slug}.png`} width="93px"/>
              <div className="coinInfoNameContainer">
                <p className="mb-0">Dash</p>
                <a href='https://www.dash.org/' target="_new"> <img alt="logo" src={`/assets/images/globe.png`} width="23px" className="mr-2"/>www.dash.org</a>
              </div>
            </Col>
            <Col xl={{ size: 3, offset: 1 }} lg={{ size: 3, offset: 1 }} md={{ size: 4, offset: 0 }} sm={{ size: 6, offset: 0 }} xs={{ size: 10, offset: 1 }} className="px-0 mt-xl-0 mt-lg-0 mt-md-0 mt-3">
              <p className="coinInfoHeaderPrice">$ 1,525.52 <span>USD</span></p>
              <NavLink to={`/nodes/${params.slug}/new`}>
                <Button className="buyNodeButton"><img src="/assets/images/plusIcon.png" alt="add" className="mr-2"/> Buy Node</Button>
              </NavLink>
            </Col>
          </Col>
          <Col className="coinInfoMainDataPartContainer px-0">
            <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }} className="d-flex justify-content-between flex-wrap px-0">
              <Col className="coinInfoDataSectionContainer">
                <h6>Annual ROI</h6>
                <p>2500</p>
              </Col>
              <Col className="coinInfoDataSectionContainer">
                <h6>Yearly return</h6>
                <p>2500</p>
              </Col>
              <Col className="coinInfoDataSectionContainer">
                <h6>Monthly return</h6>
                <p>172.5 <span>%</span></p>
              </Col>
            </Col>
            <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }} className="d-flex justify-content-between flex-wrap px-0 mt-xl-3 mt-lg-3 mt-md-3 mt-sm-3 mt-0">
              <Col className="coinInfoValueSectionContainer">
                <h6>Market cap</h6>
                <p>$1,823393,714 <span>USD</span></p>
              </Col>
              <Col className="coinInfoValueSectionContainer">
                <h6>Volume (24h)</h6>
                <p>176,493,215.7 <span>USD</span></p>
              </Col>
              <Col className="coinInfoValueSectionContainer">
                <h6>Circulating Supply</h6>
                <p>8,302,962 <span>DASH</span></p>
              </Col>
              <Col className="coinInfoValueSectionContainer">
                <h6>Max Supply</h6>
                <p>8,302,962 <span>DASH</span></p>
              </Col>
            </Col>
          </Col>
          <Col className="coinInfoDescriptionsPartContainer bg-white">
            <div className="coinInfoDescriptionContainer">
              <h6>Profile</h6>
              <p>Dash is one of the most popular cryptocurrencies on the market today. A shortened version of “digital cash”, Dash was originally called Xcoin and later DarkCoin before being known by its current name. Designed as a peer-to-peer digital coin to help make transactions as efficient and streamlined as possible, Dash was launched in 2014 by Evan Duffield. Dash remained largely out of the limelight until recently where it’s popularity has soared and has grown into a team of more than
                78 employees (although some still chose to retain their anonymity).</p>
            </div>
            <div className="coinInfoDescriptionContainer">
              <h6>Premise</h6>
              <p>According to their whitepaper, Dash describes itself as “a cryptocurrency based on Bitcoin, the work of Satoshi Nakamoto, with various improvements such as a two-tier incentivized network, known as the masternode network.” The paper adds that Dash features other </p>
            </div>
          </Col>
        </div>
      </div>
    )
  }
}

export default withRouter(CoinInfo)
