import React, { Component } from 'react'
import { Container, Col, CardTitle, CardText, Collapse, Card } from 'reactstrap'

import './index.css'

export default class FAQ extends Component {
  constructor(props) {
    super(props)

    this.state = {
      question1: false,
      question2: false,
      question3: false,
      question4: false,
      question5: false,
      question6: false,
      question7: false
    }
    this.toggleQuestion = this.toggleQuestion.bind(this)
  }

  toggleQuestion(name) {
    const questions = this.state
    const openedQuestionName = Object.keys(questions).find(question => questions[ question ])
    !!openedQuestionName ? this.setState({ [name]: !this.state[ name ], [openedQuestionName]: !this.state[ openedQuestionName ] }) : this.setState({ [name]: !this.state[ name ] })
  }

  render() {
    const { question1, question2, question3, question4, question5, question6, question7 } = this.state
    return (
      <Container fluid>
        <div className="contentContainer d-flex flex-column align-items-center">
          <Col xl={12} className="faqPageHeader">
            <p className="faqPageTitle">Frequently Asked Questions </p>
          </Col>
          <Col xl={12}>
            <Card body>
              <CardTitle onClick={() => this.toggleQuestion('question1')} className={question1 ? "faqCardHeader open" : "faqCardHeader"}><img src={question1 ? "/assets/images/down-arrow.svg" : "/assets/images/right-arrow.svg"} alt="Caret" className="faqCaret"/>What is a Masternode?</CardTitle>
              <Collapse isOpen={question1}>
                <CardText className="faqCardText">A masternode is a computer/server that sits on the network (blockchain) and processes transactions. In return for processing transactions, a reward is given.</CardText>
              </Collapse>
            </Card>
            <Card body>
              <CardTitle onClick={() => this.toggleQuestion('question2')} className={question2 ? "faqCardHeader open" : "faqCardHeader"}><img src={question2 ? "/assets/images/down-arrow.svg" : "/assets/images/right-arrow.svg"} alt="Caret" className="faqCaret"/>Do you guarantee 100% uptime of my server?</CardTitle>
              <Collapse isOpen={question2}>
                <CardText className="faqCardText">Although we strive for 100% uptime, all servers crash and all servers need to be upgraded from time to time. We do our best to ensure your server has as little downtime as possible. We make money when your server makes money so we have the same goals!</CardText>
              </Collapse>
            </Card>
            <Card body>
              <CardTitle onClick={() => this.toggleQuestion('question3')} className={question3 ? "faqCardHeader open" : "faqCardHeader"}><img src={question3 ? "/assets/images/down-arrow.svg" : "/assets/images/right-arrow.svg"} alt="Caret" className="faqCaret"/>What are the risks involved?</CardTitle>
              <Collapse isOpen={question3}>
                <CardText className="faqCardText">A coin can always go down in value, which results in a decreased value of the associated masternodes and the returns. The other variable out of our control is the number of masternodes. As more masternodes come online, the ROI will decrease because the rewards are split amongst all masternode owners.</CardText>
              </Collapse>
            </Card>
            <Card body>
              <CardTitle onClick={() => this.toggleQuestion('question4')} className={question4 ? "faqCardHeader open" : "faqCardHeader"}><img src={question4 ? "/assets/images/down-arrow.svg" : "/assets/images/right-arrow.svg"} alt="Caret" className="faqCaret"/>Which Masternode should I use?</CardTitle>
              <Collapse isOpen={question4}>
                <CardText className="faqCardText">Since the beginning of 2018 there has been a dramatic increase in the number of Masternodes. We list many different masternodes, but a listing does not equate to an endorsement of the underlying coin or project. You should do your own research before purchasing. We recommend you visit the website, learn about the team, read the whitepaper, and talk to others in the community.</CardText>
              </Collapse>
            </Card>
            <Card body>
              <CardTitle onClick={() => this.toggleQuestion('question5')} className={question5 ? "faqCardHeader open" : "faqCardHeader"}><img src={question5 ? "/assets/images/down-arrow.svg" : "/assets/images/right-arrow.svg"} alt="Caret" className="faqCaret"/>How is Nodebucks different from an Exchange?</CardTitle>
              <Collapse isOpen={question5}>
                <CardText className="faqCardText">Unlike an exchange, we at Nodebucks do not hold any of your assets nor do we have any control over what price you will pay. We are a full service masternode operator.</CardText>
              </Collapse>
            </Card>
            <Card body>
              <CardTitle onClick={() => this.toggleQuestion('question6')} className={question6 ? "faqCardHeader open" : "faqCardHeader"}><img src={question6 ? "/assets/images/down-arrow.svg" : "/assets/images/right-arrow.svg"} alt="Caret" className="faqCaret"/>What are the fees?</CardTitle>
              <Collapse isOpen={question6}>
                <CardText className="faqCardText">We charge a 1% hosting fee on all rewards that Nodebucks masternodes receive.</CardText>
              </Collapse>
            </Card>
            <Card body>
              <CardTitle onClick={() => this.toggleQuestion('question7')} className={question7 ? "faqCardHeader open" : "faqCardHeader"}><img src={question7 ? "/assets/images/down-arrow.svg" : "/assets/images/right-arrow.svg"} alt="Caret" className="faqCaret"/>How do you determine your masternode price and value?</CardTitle>
              <Collapse isOpen={question7}>
                <CardText className="faqCardText">Nodebucks looks at the order books across several exchanges to determine the best possible price to purchase the required number of coins to setup a masternode. The order books on the exchanges determines the actual price of a masternode when buying it and also determines the value when selling it. </CardText>
              </Collapse>
            </Card>
          </Col>
        </div>
      </Container>
    )
  }
}