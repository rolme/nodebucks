import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Metatags from '../../components/metatags'

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
    let { match: { params } } = this.props
    this.props.fetchMasternode(params.slug)
  }

  render() {
    const { data, pending } = this.props

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
            title={`${data.name} (${data.symbol}) Cryptocurrency Price and Information | NodeBucks`}
          />
          <Col className="d-flex justify-content-between align-items-center px-0 flex-wrap">
            <Col xl={{ size: 3, offset: 0 }} lg={{ size: 3, offset: 0 }} md={{ size: 4, offset: 0 }} sm={{ size: 6, offset: 0 }} xs={{ size: 10, offset: 1 }} className="d-flex align-items-center px-0 justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-start justify-content-center">
              <img alt={data.slug} src={`/assets/images/logos/${data.slug}.png`} width="93px"/>
              <div className="coinInfoNameContainer">
                <p className="mb-0">{data.name}</p>
                <a href={data.url} target="_new"> <img alt="logo" src={`/assets/images/globe.png`} width="23px" className="mr-2"/>{cryptoUrlName}</a>
              </div>
            </Col>
            <Col xl={{ size: 3, offset: 1 }} lg={{ size: 3, offset: 1 }} md={{ size: 4, offset: 0 }} sm={{ size: 6, offset: 0 }} xs={{ size: 10, offset: 1 }} className="px-0 mt-xl-0 mt-lg-0 mt-md-0 mt-3">
              <p className="coinInfoHeaderPrice">$ {valueFormat(data.nodePrice, 2)} <span>USD</span></p>
              <NavLink to={`/nodes/${data.slug}/new`}>
                <Button className="buyNodeButton"><img src="/assets/images/plusIcon.png" alt="add" className="mr-2"/> Buy Node</Button>
              </NavLink>
            </Col>
          </Col>
          <Col className="coinInfoMainDataPartContainer px-0">
            <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }} className="d-flex justify-content-between flex-wrap px-0">
              <Col className="coinInfoDataSectionContainer">
                <h6>Annual ROI</h6>
                <p>{valueFormat(data.annualRoiPercentage * 100, 2)} %</p>
              </Col>
              <Col className="coinInfoDataSectionContainer">
                <h6>Yearly return</h6>
                <p>{valueFormat(data.annualRoi, 2)}</p>
              </Col>
              <Col className="coinInfoDataSectionContainer">
                <h6>Monthly return</h6>
                <p>{valueFormat(data.monthlyRoiValue, 2)}</p>
              </Col>
            </Col>
            <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }} className="d-flex justify-content-between flex-wrap px-0 mt-xl-3 mt-lg-3 mt-md-3 mt-sm-3 mt-0">
              <Col className="coinInfoValueSectionContainer">
                <h6>Market cap</h6>
                <p>$ {valueFormat(data.marketCap)} <span>USD</span></p>
              </Col>
              <Col className="coinInfoValueSectionContainer">
                <h6>Volume (24h)</h6>
                <p>{valueFormat(data.volume, 1)} <span>USD</span></p>
              </Col>
              <Col className="coinInfoValueSectionContainer">
                <h6>Circulating Supply</h6>
                <p>{valueFormat(data.availableSupply)} <span>DASH</span></p>
              </Col>
              <Col className="coinInfoValueSectionContainer">
                <h6>Max Supply</h6>
                <p>{valueFormat(data.totalSupply)} <span>DASH</span></p>
              </Col>
            </Col>
          </Col>
          <Col className="coinInfoDescriptionsPartContainer bg-white">
            <div className="coinInfoDescriptionContainer">
              <h6>Profile</h6>
              <p>{data.description}</p>
            </div>
          </Col>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  data: state.masternodes.data,
  pending: state.masternodes.pending
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMasternode
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinInfo))

