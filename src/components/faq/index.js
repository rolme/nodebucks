import React, { Component } from 'react'
import { Container, Col } from 'reactstrap'

import './index.css'

import Metatags from "./../metatags"

export default class FAQ extends Component {

  componentDidMount() {
    // Reset to top of window.
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Container fluid>
        <Metatags
          description="Do you have questions about Masternodes? How they work and which one you should use? Check out our Frequently Asked Questions that will provide you with all the answers."
          title="Masternodes | Frequently Asked Questions - NodeBucks"
          image="/assets/images/seo/faq.jpg"
          canonical="https://nodebucks.com/faq"
        />
        <div className="contentContainer faqContentContainer d-flex flex-column align-items-center">
          <Col xl={12} className="faqPageHeader">
            <h1 className="faqPageTitle pageTitle">Frequently Asked Questions </h1>
          </Col>
          <Col xl={12} className="d-flex flex-xl-row flex-lg-row flex-column">
            <Col xl={6}>
              <h2 className="faqQuestionHeader">What is a Masternode?</h2>
              <p className="faqQuestionText">A masternode is a computer/server that sits on the network (blockchain) and processes transactions. In return for processing transactions, a reward is given.</p>

              <h2 className="faqQuestionHeader">What are the risks involved?</h2>
              <p className="faqQuestionText">A coin can always go down in value, which results in a decreased value of the associated masternodes and the returns. The other variable out of our control is the number of masternodes. As more masternodes come online, the ROI will decrease because the rewards are split amongst all masternode owners.</p>

              <h2 className="faqQuestionHeader">How is Nodebucks different from an Exchange?</h2>
              <p className="faqQuestionText">Unlike an exchange, we at Nodebucks do not hold any of your assets nor do we have any control over what price you will pay. We are a full service masternode operator.</p>

              <h2 className="faqQuestionHeader">How do you determine your masternode price and value?</h2>
              <p className="faqQuestionText">Nodebucks looks at the order books across several exchanges to determine the best possible price to purchase the required number of coins to setup a masternode. The order books on the exchanges determines the actual price of a masternode when buying it and also determines the value when selling it.</p>

              <h2 className="faqQuestionHeader">What type of server/hardware do you use?</h2>
              <p className="faqQuestionText">The hardware used depends on the blockchain of the masternode. Each coin has different requirements and we use the minimum hardware specs as defined by the core team of that coin or whatever is recommended in the documentation.</p>

              <h2 className="faqQuestionHeader">When can I sell my masternode?</h2>
              <p className="faqQuestionText">Once you have verified your identity, and your masternode is up and running, you may liquidate it at any time as long as the underlying markets are operational. Since the markets are outside of our control, we cannot guarantee that your masternode can be sold at any time.</p>
            </Col>
            <Col xl={6}>
              <h2 className="faqQuestionHeader">Do you guarantee 100% uptime of my server?</h2>
              <p className="faqQuestionText">Although we strive for 100% uptime, all servers crash and all servers need to be upgraded from time to time. We do our best to ensure your server has as little downtime as possible. We make money when your server makes money so we have the same goals!</p>

              <h2 className="faqQuestionHeader">Which Masternode should I use?</h2>
              <p className="faqQuestionText">Since the beginning of 2018 there has been a dramatic increase in the number of Masternodes. We list many different masternodes, but a listing does not equate to an endorsement of the underlying coin or project. You should do your own research before purchasing. We recommend you visit the website, learn about the team, read the whitepaper, and talk to others in the community.</p>

              <h2 className="faqQuestionHeader">What are the fees?</h2>
              <p className="faqQuestionText">We take pride in the quality of our masternodes and strive hard to achieve 100% uptime to maximize your rewards. This means that we have staff members available 24x7 to monitor and handle any alerts. Nodebucks also covers the cost of the hardware, rack space fees, electricity, and bandwidth. In exchange for these services, we take out a 15% fee on all rewards received by Nodebucks masternodes. We make money when you make money.</p>

              <h2 className="faqQuestionHeader">Do you accept Bitcoin or other cryptocurrencies as payment?</h2>
              <p className="faqQuestionText">Yes! Please <a href="/contact" target="_blank" rel="noopener noreferrer">contact us</a> with the node(s) you would like to purchase, the cryptocurrency you would like to use as payment, and we will arrange a payment wallet for the transaction.</p>

              <h2 className="faqQuestionHeader">Do I have to pay taxes on my gains?</h2>
              <p className="faqQuestionText">We are not a certified tax agency and we recommend that you consult with a tax professional to determine your tax liability. </p>
            </Col>
          </Col>
        </div>
      </Container>
    )
  }
}
