import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'

import './index.css'

import Metatags from "../metatags"

class Article extends Component {
  constructor(props) {
    super(props);
    this.whatIsMasternode = React.createRef();
    this.powVsPos = React.createRef();
    this.benefitsOfMasternode = React.createRef();
    this.fairnessInGovernment = React.createRef();
    this.rationalBehindStaking = React.createRef();
    this.getStarted = React.createRef();
    this.scrollToSection = this.scrollToSection.bind(this);
    this.changeTheHash = this.changeTheHash.bind(this);
  }

  componentDidMount() {
    this.props.history.listen(location => !!location.hash && this.scrollToSection(location.hash.split('#')[ 1 ]))
    !!this.props.location.hash && this.scrollToSection(this.props.location.hash.split('#')[ 1 ])
  }


  scrollToSection(name) {
    const scrollNode = !!this[ name ] && this[ name ].current
    setTimeout(() => window.scrollTo(0, !!scrollNode ? scrollNode.offsetTop : 0), 5)
  }

  changeTheHash(name) {
    this.props.history.replace('/what-are-masternodes#' + name)
  }

  render() {
    const { whatIsMasternode, powVsPos, benefitsOfMasternode, fairnessInGovernment, rationalBehindStaking, getStarted } = this
    return (
      <Container fluid className="articleContainer">
        <div className="contentContainer px-0">
          <Metatags
            description="What is a Masternode? Learn the main concepts and how you can create your own masternode step by step. See the differences between them and the easiest way to get started."
            image="/assets/images/article/articleThumbnail.jpg"
            title="What is a masternode in Cryptocurrency? - Nodebucks"
            url="https://nodebucks.com/what-are-masternodes"
            canonical="https://nodebucks.com/what-are-masternodes"
          />
          <h2 className="articleHeader mt-3 text-center"><b>What is a masternode</b></h2>
          <h2 className="articleHeader mb-2 text-center"><b>In Cryptocurrency</b></h2>
          <img src="/assets/images/article/articleThumbnail.jpg" alt="What is a Masternode? Step by Step Guide - Nodebucks"/>
          <p className="articleParagraph"> If you’re looking for ways to make money in the world of cryptocurrencies, you should know that there are quite a few. </p>
          <p className="articleParagraph"> You can strategically buy and sell cryptocurrencies through online exchanges using technical analysis, also known as day trading. However, this is very difficult and most day traders do not outperform the general market. You would need to be well-informed and thoroughly understand both the projects and how to read charts. </p>
          <p className="articleParagraph"> You could invest long term, the buy and hold strategy, also known as HODL’ing, but this won’t yield you much money in the short term. This is a multi year strategy. </p>
          <p className="articleParagraph">You could invest in cryptocurrency mining equipment. </p>
          <img src="/assets/images/article/farmMining.jpg" alt="CRYPTO MINING"/>
          <p className="articleParagraph">Still, that is a very expensive investment with no promise of a return on investment. There is no guarantee of breaking even either, considering the financial market volatility of cryptocurrencies like Bitcoin. Due to the release of ASIC chips and the production of large mining facilities throughout the world, mining from home has become less and less feasible over the years.</p>
          <p className="articleParagraph">Or...<b>you can invest in a masternode</b></p>
          <p className="articleParagraph">Let’s take a look:</p>
          <ul>
            <li onClick={() => this.changeTheHash('whatIsMasternode')} className="articleParagraph articleClickable">What is a masternode?</li>
            <li onClick={() => this.changeTheHash('powVsPos')} className="articleParagraph articleClickable">PoW Vs PoS</li>
            <li onClick={() => this.changeTheHash('benefitsOfMasternode')} className="articleParagraph articleClickable">Benefits of Masternode</li>
            <li onClick={() => this.changeTheHash('fairnessInGovernment')} className="articleParagraph articleClickable">Fairness in Governance</li>
            <li onClick={() => this.changeTheHash('rationalBehindStaking')} className="articleParagraph articleClickable">The Rationale Behind Staking</li>
            <li onClick={() => this.changeTheHash('getStarted')} className="articleParagraph articleClickable">How to Get Started</li>
          </ul>
          <h2 ref={whatIsMasternode} className="articleHeader">What is a masternode?</h2>
          <p className="articleParagraph">They are more pragmatic alternatives to cryptocurrency mining. <NavLink to="/masternodes">Masternodes</NavLink> are crucially vital to maintaining the transactional viability of a cryptocurrency network. The best way to think of a masternode is as a globally reaching digital latticework of computers that ensures the transactional integrity of a cryptocurrency’s main network. </p>
          <img src="/assets/images/article/blockchainCryptocurrency.jpg" alt="Cryptocurrency Network"/>
          <p className="articleParagraph">Blockchain networks, which are the core of cryptocurrencies, are decentralized. That means there isn’t one system or governing body that’s controlling such systems. These systems widely distribute their functionalities, processes and transactions.</p>
          <p className="articleParagraph">Each node is a computer, or more specifically, a distributed network of computers. These computers are run perpetually by network users all over the world. A masternode runs a full copy of the network’s core system, aka the blockchain. This way, there is no centralization and the blockchain is duplicated and entirely redundant and immune to failures and even natural disasters. </p>
          <h2 ref={powVsPos} className="articleHeader">PoW Vs PoS</h2>
          <p className="articleParagraph">The most popular blockchains run under a proof of work algorithm program. To gain a Bitcoin, for example, you need a mining rig. These are advanced computers and programs with high computing and processing power. They are used to solve complex mathematical algorithms. Once solved, Bitcoins are rewarded. Proof of work (PoW) validates the creation of new blocks via the work of mining rigs, in the most basic sense.</p>
          <img src="/assets/images/article/blockchainBitcoin.jpg" alt="Bitcoin Crypto "/>
          <p className="articleParagraph">However, mining rigs are a significant financial investment. They also use up a lot of energy, since they are always running. Each progressive mathematical algorithm that must be solved to gain a Bitcoin becomes more complex, which in turn progressively requires more computing power.</p>
          <p className="articleParagraph">Masternode programming is governed by proof of stake (PoS). When a masternode is collateralized, or staked, it is rewarded for the continued and efficient running of the system. Dash was the first cryptocurrency network to popularize the masternode model, and a single <NavLink to="/masternodes/dash"> Dash masternode </NavLink> is worth over $200k as of this writing.</p>
          <img src="/assets/images/article/dashCrypto.png" alt="Dash Crypto "/>
          <p className="articleParagraph text-center"><i>Dash Crypto Profile at Nodebucks</i></p>
          <h2 ref={benefitsOfMasternode} className="articleHeader">Benefits of a Masternode</h2>
          <p className="articleParagraph">The job of a masternode is also significantly more involved in enabling and protecting the process of the network core. The number and wide-ranging distribution of masternodes helps to increase processing speeds to near instantaneous levels. The cloaking of information and privacy of users is also better enforced. Budgeting systems and network treasuries are also protected by masternodes. </p>
          <p className="articleParagraph">Masternodes also extend the reach and capabilities of the core network. Masternodes can merge and/or act independently of the core network. They can increase scalability, relieve network processing glut and cut down on transaction delays.</p>
          <h2 ref={fairnessInGovernment} className="articleHeader">Fairness in Governance</h2>
          <p className="articleParagraph">Cryptocurrency miners, depending on their ambition and scale of operations, can hoard and manipulate a large number of cryptocurrencies. They can also be paid to expedite transactions in networks with scalability issues. Miners, in the right situations, can amass a lot of manipulative influence and power over a cryptocurrency or network</p>
          <img src="/assets/images/article/cryptocurrencyNetwork.jpg" alt="Cryptocurrency Network "/>
          <p className="articleParagraph">Masternodes are also used to level out the playing field when it comes to voting and governance in a cryptocurrency network. Network users usually vote on how a network runs. However, one must have a cache of cryptocurrencies to take part in governance. How much depends on the network.</p>
          <h2 ref={rationalBehindStaking} className="articleHeader">The Rationale Behind Staking</h2>
          <p className="articleParagraph">Staking is a way to passively generate income in exchange for running a masternode. Users are rewarded with varying amounts or percentages of cryptocurrency for every transaction, block creation and/or successful processing functionality of the network. The idea is that if you run a masternode, you are less likely to cheat or manipulate the system, since you have your own stake in the system.</p>
          <p className="articleParagraph">That is essentially the basics of a masternode. It is a more efficient way to run a cryptocurrency network. This is a system that highly incentivizes users to run them via staking. They may also be the future of how cryptocurrency networks function, given the increasing scaling, powering and investment issues plaguing PoW-powered networks.</p>
          <h2 ref={getStarted} className="articleHeader">How to Get Started</h2>
          <p className="articleParagraph">In the past running a masternode was a complex process. You had to open accounts on several exchanges, buy Bitcoins, then use those Bitcoins to secure the required amount of masternode coins on the exchange. Once that was done, you had to setup a VPS using a cloud hosting provider, install a bunch of software on it, and hope you didn’t mess up any of the commands along the way. Then you have to edit a bunch of configs on your VPS server, do something
            similar on your local desktop computer running your wallet, sync them up, and then just HOPE it all worked. Usually, it took several tries to get it right.</p>
          <p className="articleParagraph">Now, it’s really as <NavLink to="/masternodes">simple as selecting which masternode</NavLink> you want to operate on Nodebucks, and purchasing it with PayPal. Then, after a couple days, your masternode will be up and running and operating on the blockchain, earning you rewards as the operator/owner.</p>
          <img src="/assets/images/article/cryptoMasternode.png" alt="Crypto Masternode"/>
          <p className="articleParagraph text-center"><i>NodeBucks Masternodes comparison as of 19th September 2018.</i></p>
          <p className="articleParagraph"><b>We’ll handle everything else! </b></p>
        </div>
      </Container>
    )
  }
}

export default withRouter(Article)
