import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Metatags from "./metatags";

export default class Privacy extends Component {
  componentDidMount() {
    // Reset to top of window.
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Container>
        <Metatags
          description="This privacy notice discloses the privacy practices for Nodebucks.com. This privacy notice applies solely to information collected by this website. It will notify you of the following."
          title="Privacy Notice - NodeBucks"
          canonical="https://nodebucks.com/privacy"
        />
        <Col xl={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} sm={{ size: 12, offset: 0 }} className="mb-5">
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pageTitle">Privacy Notice</p>
            <p className="paragraphText">This privacy notice discloses the privacy practices for Nodebucks.com. This privacy notice applies solely to information collected by this website. It will notify you of the following:</p>
            <ul className="disclaimerUnorderedList">
              <li>What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.</li>
              <li>What choices are available to you regarding the use of your data.</li>
              <li>The security procedures in place to protect the misuse of your information.</li>
              <li>How you can correct any inaccuracies in the information.</li>
            </ul>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseSectionTitle pb-2">Information Collection, Use, and Sharing</p>
            <p className="paragraphText">Our content is intended to be used and must be used for informational purposes only. It is very important to do your own analysis before making any investments. You should receive independent financial advice from a certified professional when deciding on what investments you make.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseSectionTitle pb-2">Your Access to and Control Over Information</p>
            <p className="paragraphText">You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address on our website:</p>
            <ul className="disclaimerUnorderedList">
              <li>See what data we have about you, if any.</li>
              <li>Change/correct any data we have about you.</li>
              <li>Have us delete any data we have about you.</li>
              <li>Express any concern you have about our use of your data.</li>
            </ul>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseSectionTitle pb-2">Security</p>
            <p className="paragraphText">We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.</p>
            <p className="paragraphText">Wherever we collect sensitive information (such as credit card data), that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a lock icon in the address bar and looking for "https" at the beginning of the address of the Web page.</p>
            <p className="paragraphText">While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment.</p>
          </Row>
        </Col>
      </Container>
    )
  }
}
