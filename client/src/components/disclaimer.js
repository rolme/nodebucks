import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Metatags from "./metatags";

export default class Disclaimer extends Component {
  componentDidMount() {
    // Reset to top of window.
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Container>
        <Metatags/>
        <Col xl={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} sm={{ size: 12, offset: 0 }} className="mb-5">
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pageTitle">Disclaimer</p>
            <p className="paragraphText">Before using this site, please make sure that you note the following important information:</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseSectionTitle pb-2">Do your Own Research</p>
            <p className="paragraphText">It is very important to do your own analysis before purchasing masternode servers. You should receive independent financial advice from a certified professional when deciding on what masternodes to purchase.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseSectionTitle pb-2">No Investment Advice</p>
            <p className="paragraphText">Our Website provides masternode services, not buy/sell/hold recommendations. We are not a broker/dealer, we are not an investment advisor, and this is not a place for the giving or receiving of financial advice, advice concerning investment decisions or tax or legal advice. We are not regulated by the Financial Services Authority.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseSectionTitle pb-2">No reliance</p>
            <p className="paragraphText">Accordingly, we will not be liable, whether in contract, tort (including negligence) or otherwise, in respect of any damage, expense or other loss you may suffer arising out of the purchases you make here. </p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseSectionTitle pb-2">Investment Warnings</p>
            <p className="paragraphText">We would like to draw your attention to the following important investment warnings.</p>
            <ul className="disclaimerUnorderedList">
              <li className="paragraphText">The value of cryptocurrencies can go down as well as up;</li>
              <li className="paragraphText">Investors may not get back the amount they invested;</li>
              <li className="paragraphText">Past performance is not a guide to future performance.</li>
            </ul>
          </Row>
        </Col>
      </Container>
    )
  }
}
