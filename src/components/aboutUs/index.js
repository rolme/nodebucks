import React, { Component } from 'react'
import { Container, Col } from 'reactstrap'
import LazyLoad from 'react-lazyload'
import Metatags from "./../metatags"

import "./index.css"

export default class AboutUs extends Component {
  componentDidMount() {
    // Reset to top of window.
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Container fluid>
        <Metatags/>
        <div className="contentContainer px-0">
          <h1 className="aboutUsTitle">About Us</h1>
          <p className="aboutUsParagraph">Nodebucks.com is comprised of a small team of cryptocurrency enthusiasts who believe in the future of blockchain. All of the founders have been investing in and studying cryptocurrency for many years. </p>
          <p className="aboutUsParagraph"> Most of our team members personally own and operate masternodes for themselves and their family members. We all experienced the difficulty in setting up and managing these servers. The industry needed a better full service solution for non crypto-enthusiasts, and the idea of Nodebucks was born. </p>
          <p className="aboutUsParagraph"> Our goal is to lower the barrier of entry for users who want to own and operate their own masternode. </p>
          <Col xl={12} lg={12} md={12} sm={12} xs={12} className="d-flex flex-wrap">
            <Col xl={4} lg={4} md={4} className="d-flex flex-column align-items-center justify-content-center">
              <LazyLoad height={130}>
                <img src="/assets/images/aboutUsImages/ceo.jpg" alt="ceo"/>
              </LazyLoad>
              <p className="memberName">Jay Severson <sup><a href="https://www.linkedin.com/in/jayseverson/" target="_blank" rel="noopener noreferrer"> <i className="socialButtonIcon linkedIn">&#xf0e1;</i></a></sup></p>
              <p className="memberPosition">CEO</p>
            </Col>
            <Col xl={4} lg={4} md={4} className="d-flex flex-column align-items-center justify-content-center">
              <LazyLoad height={130}>
                <img src="/assets/images/aboutUsImages/cto.jpg" alt="cto"/>
              </LazyLoad>
              <p className="memberName">Roland Parnaso <sup><a href="https://www.linkedin.com/in/rparnaso/" target="_blank" rel="noopener noreferrer"> <i className="socialButtonIcon linkedIn">&#xf0e1;</i></a></sup></p>
              <p className="memberPosition">CTO</p>
            </Col>
            <Col xl={4} lg={4} md={4} className="d-flex flex-column align-items-center justify-content-center">
              <LazyLoad height={130}>
                <img src="/assets/images/aboutUsImages/pos.jpg" alt="pos"/>
              </LazyLoad>
              <p className="memberName">Richard Jackman <sup><a href="https://www.linkedin.com/in/richardjackmanmedicaldevicerep/" target="_blank" rel="noopener noreferrer"> <i className="socialButtonIcon linkedIn">&#xf0e1;</i></a></sup></p>
              <p className="memberPosition">President of Sales</p>
            </Col>
          </Col>
        </div>
      </Container>
    )
  }
}
