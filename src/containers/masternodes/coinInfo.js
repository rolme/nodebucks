import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Metatags from '../../components/metatags'
import ErrorPage404 from '../../components/error_pages/404_error_page'
import { RingLoader } from 'react-spinners'
import { Container, Col, Button } from 'reactstrap'
import './index.css'
import { valueFormat } from "../../lib/helpers"

import {
  fetchMasternode
} from '../../reducers/masternodes'

class CoinInfo extends Component {
  componentWillMount() {
    window.scrollTo(0, 0)
    let { match: { params }, user } = this.props
    this.props.fetchMasternode(params.slug, user ? user.slug : '')
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props
    const { data: nextData } = nextProps
    if ( data.slug !== nextData.slug ) {
      const jsonLdText = JSON.stringify({
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem", "position": 1,
            "name": "Masternodes",
            "item": "https://nodebucks.com/masternodes"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": nextData.name,
            "item": nextData.url
          }
        ]
      })
      this.handleJsonLd(jsonLdText)
    }
  }

  componentWillUnmount() {
    const jsonLdText = JSON.stringify({
      "@context": "http://schema.org",
      "@type": "Corporation",
      "name": "NodeBucks",
      "alternateName": "NodeBucks.com",
      "url": "https://nodebucks.com/",
      "logo": "https://nodebucks.com/assets/images/nodebucks_beta.svg",
      "sameAs": [
        "https://www.facebook.com/nodebucks/",
        "https://twitter.com/nodebucks"
      ]
    })
    this.handleJsonLd(jsonLdText)
  }

  handleJsonLd(text) {
    const existingScripts = document.querySelector('body').getElementsByTagName('script');
    for ( let i = 0; i < existingScripts.length; i++ ) {
      if ( existingScripts[ i ].type === 'application/ld+json' ) {
        existingScripts[ i ].text = text
      }
    }
  }

  render() {
    const { data, pending, error } = this.props

    if ( error ) return <ErrorPage404/>

    if ( pending || !data.slug ) {
      return (
        <Container fluid className="coinInfoContainer">
          <div className="contentContainer d-flex justify-content-center">
            <div className="spinnerContainer h-100 d-flex align-items-center justify-content-center">
              <RingLoader
                size={150}
                color={'#3F89E8'}
                loading={true}
              />
            </div>
          </div>
        </Container>
      )
    }

    const cryptoUrlName = new URL(data.url).host
    return (
      <div className="coinInfoContainer">
        <div className="contentContainer">
          <Metatags
            description={data.description.substring(0, 170)}
            title={`${data.name} (${data.symbol}) Masternode Price and Information | NodeBucks`}
            image={`/assets/images/seo/seo-${data.slug}.jpg`}
            canonical={`https://nodebucks.com/masternodes/${data.slug}`}
          />
          <Col className="d-flex justify-content-between align-items-center px-0 flex-wrap">
            <Col xl={{ size: 6, offset: 0 }} lg={{ size: 6, offset: 0 }} md={{ size: 6, offset: 0 }} sm={{ size: 6, offset: 0 }} xs={{ size: 10, offset: 1 }} className="d-flex align-items-center px-0 justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-start justify-content-center">
              <img alt={data.slug} src={`/assets/images/logos/${data.slug}.png`} width="93px"/>
              <div className="coinInfoNameContainer">
                <h1 className="mb-0">{data.name} ({data.symbol})</h1>
                <a href={data.url} target="_new"> <img alt="logo" src={`/assets/images/globe.png`} width="23px" className="mr-2"/>{cryptoUrlName}</a>
              </div>
            </Col>
            <Col xl={{ size: 3, offset: 1 }} lg={{ size: 3, offset: 1 }} md={{ size: 4, offset: 0 }} sm={{ size: 6, offset: 0 }} xs={{ size: 10, offset: 1 }} className="px-0 mt-xl-0 mt-lg-0 mt-md-0 mt-3">
              <p className="coinInfoHeaderPrice">${valueFormat(data.nodePrice, 2)} <span>USD</span></p>
              {this.displayActionButton(data)}
            </Col>
          </Col>
          <Col className="coinInfoMainDataPartContainer px-0">
            <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }} className="d-flex justify-content-between flex-wrap px-0">
              <Col className="coinInfoDataSectionContainer">
                <h6>Estimated Annual ROI*</h6>
                <p>{valueFormat(data.annualRoiPercentage * 100, 2)}%</p>
              </Col>
              <Col className="coinInfoDataSectionContainer">
                <h6>Estimated Yearly Return*</h6>
                <p>${valueFormat(data.annualRoi, 2)} USD</p>
              </Col>
              <Col className="coinInfoDataSectionContainer">
                <h6>Estimated Monthly Return*</h6>
                <p>${valueFormat(data.monthlyRoiValue, 2)} USD</p>
              </Col>
              <Col className="coinInfoDataSectionContainer">
                <h6>Avg Days till First Reward*</h6>
                <p>{data.firstRewardDays}</p>
              </Col>
            </Col>
            <p className="disclaimerText ml-3">* These values are projections based on current blockchain reward amounts and frequencies and number of masternodes. These estimated values can and will change over time. </p>
            <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }} className="d-flex justify-content-between flex-wrap px-0 mt-xl-3 mt-lg-3 mt-md-3 mt-sm-3 mt-0">
              <Col className="coinInfoValueSectionContainer">
                <h6>Market Cap</h6>
                <p>$ {valueFormat(data.marketCap)} <span>USD</span></p>
              </Col>
              <Col className="coinInfoValueSectionContainer">
                <h6>Volume (24h)</h6>
                <p>{valueFormat(data.volume, 1)} <span>USD</span></p>
              </Col>
              <Col className="coinInfoValueSectionContainer">
                <h6>Circulating Supply</h6>
                <p>{valueFormat(data.availableSupply)} <span>{(data.symbol).toUpperCase()}</span></p>
              </Col>
              <Col className="coinInfoValueSectionContainer">
                <h6>Max Supply</h6>
                <p>{valueFormat(data.totalSupply)} <span>{(data.symbol).toUpperCase()}</span></p>
              </Col>
            </Col>
          </Col>
          <Col className="coinInfoDescriptionsPartContainer bg-white">
            <div className="coinInfoDescriptionContainer">
              <h6>Profile</h6>
              <p dangerouslySetInnerHTML={{ __html: data.profile }}/>
            </div>
          </Col>
        </div>
      </div>
    )
  }

  displayActionButton(masternode) {
    const { user } = this.props

    if ( masternode.purchasableStatus === 'Unavailable' ) {
      return (
        <Button className="infoNodeButton" disabled>Unavailable</Button>
      )
    } else if ( !!user && !user.enabled ) {
      return (
        <NavLink to={'/contact#account-disabled'}>
          <Button className="infoNodeButton"><img src="/assets/images/contactUsIcon.png" alt="contact" className="mr-2"/>Account Disabled</Button>
        </NavLink>
      )
    } else if ( masternode.nodePrice > 10000 && !!user && user.verificationStatus !== 'approved' ) {
      return (
        <NavLink to={'/settings/verification'}>
          <Button className="infoNodeButton"><img src="/assets/images/key.png" alt="key" className="mr-2"/>Verify Account</Button>
        </NavLink>
      )
    } else if ( masternode.purchasableStatus === 'Contact Us' || !masternode.liquidity.buy ) {
      return (
        <NavLink to={'/contact#contact-sales-' + masternode.name}>
          <Button className="infoNodeButton"><img src="/assets/images/contactUsIcon.png" alt="contact" className="mr-2"/> Contact Us</Button>
        </NavLink>
      )
    } else {
      if ( !masternode.purchasable ) {
        return <Button className="infoNodeButton" disabled>Out of Stock</Button>
      } else if ( !user ) {
        return (
          <NavLink to='/sign-up'>
            <Button className="buyNodeButton"><img src="/assets/images/plusIcon.png" alt="add" className="mr-2"/> Buy Node</Button>
          </NavLink>
        )
      } else {
        return (
          <div>
            <NavLink to={`/nodes/${masternode.slug}/new`}>
              <Button disabled={!masternode.exchanges_available} className="buyNodeButton"><img src="/assets/images/plusIcon.png" alt="add" className="mr-2"/> Buy Node</Button>
            </NavLink>
            {!masternode.exchanges_available &&
            <p className="text-center text-danger pl-3 pr-3">Exchanges are not available now, please try later</p>
            }
          </div>
        )
      }
    }
  }
}


const mapStateToProps = state => ({
  data: state.masternodes.data,
  pending: state.masternodes.pending,
  error: state.masternodes.error,
  user: state.user.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMasternode
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinInfo))
