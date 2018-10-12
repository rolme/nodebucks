import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { Col, Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'

import './index.css'

import Metatags from "../../components/metatags"

class Affiliate extends Component {

  render() {
    const { user } = this.props

    const affiliateLink = !!user ? '/dashboard/affiliate' : '/sign-up'
    const affiliateLinkText = !!user ? 'Affiliate Dashboard' : 'SIGN UP'

    return (
      <div className="affiliateContainer">
        <Metatags
          description="What is a Masternode? Learn the main concepts and how you can create your own masternode step by step. See the differences between them and the easiest way to get started."
          image="/assets/images/article/articleThumbnail.jpg"
          title="Affiliate Program - Nodebucks"
          url="https://nodebucks.com/affiliate"
          canonical="https://nodebucks.com/affiliate"
        />
        <div className='affiliateHeaderContainer'>
          <div className="contentContainer">
            <h5 className="affiliateHeaderText">Nodebucks Affiliate Program</h5>
            <Col className="d-flex justify-content-center">
              <NavLink to={affiliateLink} className="affiliateFooterButton">{affiliateLinkText}</NavLink>
            </Col>
          </div>
        </div>
        <div>
          <div className="contentContainer">
            <Col xl={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 3 }} md={{ size: 8, offset: 2 }} sm={{ size: 10, offset: 1 }} className="affiliateSectionContentContainer">
              <h5 className="affiliateSectionHeaderText">How it works</h5>
              <p className="affiliateSectionHeaderParagraph">Refer your friends and family by sending them your <a href={affiliateLink}>affiliate link</a></p>
              <ol className="affiliateHowItWorksList">
                <li>Your visitor clicks the link and creates an account on Nodebucks.com.</li>
                <li>We track their purchases by using a long lasting cookie that keeps their IP.</li>
                <li>We will verify all purchases and review every order.</li>
                <li>Once verified, commissions* will be sent to your account.</li>
              </ol>
            </Col>
          </div>
        </div>
        <div className='affiliateTierLevelsContainer'>
          <div className="contentContainer">
            <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} sm={{ size: 12, offset: 0 }} className="affiliateSectionContentContainer">
              <h5 className="affiliateSectionHeaderText">Tier Levels</h5>
              <Col className="d-flex justify-content-between affiliateTierCardsContainer">
                <Card className="affiliateTierCard">
                  <CardHeader>Tier 1</CardHeader>
                  <CardBody>
                    <CardTitle>Direct referrals</CardTitle>
                    <CardText>20%*</CardText>
                  </CardBody>
                </Card>
                <Card className="affiliateTierCard">
                  <CardHeader>Tier 2</CardHeader>
                  <CardBody>
                    <CardTitle>Second indirect referrals</CardTitle>
                    <CardText>10%*</CardText>
                  </CardBody>
                </Card>
                <Card className="affiliateTierCard">
                  <CardHeader>Tier 3</CardHeader>
                  <CardBody>
                    <CardTitle>Third indirect referrals</CardTitle>
                    <CardText>5%</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Col>
          </div>
        </div>
        <div>
          <div className="contentContainer">
            <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} sm={{ size: 12, offset: 0 }} className="affiliateSectionContentContainer">
              <Col xl={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 3 }} md={{ size: 8, offset: 2 }} sm={{ size: 10, offset: 1 }}>
                <h5 className="affiliateSectionHeaderText">Maximizing Commission</h5>
                <p className="affiliateSectionHeaderParagraph">Obviously, the more people you bring in the more you’re going to make. Below are a few tips from several successful affiliate marketers:</p>
              </Col>
              <div className="affiliateCommissionContentContainer">
                <Col className="d-flex align-items-center flex-wrap-reverse">
                  <Col xl={{ size: 6, offset: 2 }} lg={{ size: 6, offset: 2 }} md={{ size: 8, offset: 2 }} sm={{ size: 10, offset: 1 }} xs={{ size: 12, offset: 0 }} className="affiliateCommissionSectionParagraphContainer">
                    <p className="affiliateCommissionSectionParagraph mb-xl-0 mb-lg-0 mb-3">Be honest with the people you refer, you might want to experience for yourself what it is like to be a Nodebucks customer.</p>
                  </Col>
                  <Col xl={{ size: 2, offset: 0 }} lg={{ size: 2, offset: 0 }} md={{ size: 4, offset: 4 }} sm={{ size: 4, offset: 4 }} xs={{ size: 4, offset: 4 }} className="d-flex justify-content-xl-start justify-content-lg-start justify-content-center mb-xl-0 mb-lg-0 mb-3">
                    <img src="/assets/images/affiliateCommission1.png" alt="Maximizing Commission" className="ml-xl-3 ml-lg-3 ml-0"/>
                  </Col>
                </Col>
                <Col>
                  <Col xl={{ size: 6, offset: 2 }} lg={{ size: 6, offset: 2 }} className="affiliateCommissionDotesImageContainer">
                    <img src="/assets/images/affiliateCommissionDotes1.png" alt="Maximizing Commission"/>
                  </Col>
                </Col>
                <Col className="d-flex align-items-center flex-wrap">
                  <Col xl={{ size: 2, offset: 2 }} lg={{ size: 2, offset: 2 }} md={{ size: 4, offset: 4 }} sm={{ size: 4, offset: 4 }} xs={{ size: 4, offset: 4 }} className="d-flex justify-content-xl-start justify-content-lg-start justify-content-center mb-xl-0 mb-lg-0 mb-3">
                    <img src="/assets/images/affiliateCommission2.png" alt="Maximizing Commission" className="ml-xl-3 ml-lg-3 ml-lg-0"/>
                  </Col>
                  <Col xl={{ size: 6, offset: 0 }} lg={{ size: 6, offset: 0 }} md={{ size: 8, offset: 2 }} sm={{ size: 10, offset: 1 }} xs={{ size: 12, offset: 0 }}>
                    <p className="affiliateCommissionSectionParagraph">Personal notes and emails are a great touch for people to read what you're sending them instead of tossing your note into the recycle bin.</p>
                  </Col>
                </Col>
                <Col>
                  <Col xl={{ size: 6, offset: 2 }} lg={{ size: 6, offset: 2 }} className="affiliateCommissionDotesImageContainer">
                    <img src="/assets/images/affiliateCommissionDotes2.png" alt="Maximizing Commission"/>
                  </Col>
                </Col>
                <Col className="d-flex align-items-center flex-wrap-reverse">
                  <Col xl={{ size: 6, offset: 2 }} lg={{ size: 6, offset: 2 }} md={{ size: 8, offset: 2 }} sm={{ size: 10, offset: 1 }} xs={{ size: 12, offset: 0 }} className="affiliateCommissionSectionParagraphContainer">
                    <p className="affiliateCommissionSectionParagraph">Use multiple traffic sources to promote the site. Stay current with new methods and techniques.</p>
                  </Col>
                  <Col xl={{ size: 2, offset: 0 }} lg={{ size: 2, offset: 0 }} md={{ size: 4, offset: 4 }} sm={{ size: 4, offset: 4 }} xs={{ size: 4, offset: 4 }} className="d-flex justify-content-xl-start justify-content-lg-start justify-content-center mb-xl-0 mb-lg-0 mb-3">
                    <img src="/assets/images/affiliateCommission3.png" alt="Maximizing Commission" className="ml-2"/>
                  </Col>
                </Col>
              </div>
            </Col>
          </div>
        </div>
        <div className='affiliateFooterContainer'>
          <div className="contentContainer">
            <Col xl={{ size: 10, offset: 1 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} sm={{ size: 12, offset: 0 }}>
              <h5 className="affiliateFooterTitle">Thank you for your support!</h5>
            </Col>
            <Col className="d-flex justify-content-center">
              <NavLink to={affiliateLink} className="affiliateFooterButton">SIGN UP</NavLink>
            </Col>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
})


export default withRouter(connect(
  mapStateToProps,
)(Affiliate))
