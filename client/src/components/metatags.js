import React, { Component } from 'react'
import { Helmet } from "react-helmet"

export default class Metatags extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: this.props.description || "Nodebucks makes it easy for you to own your own masternodes without the technical expertise involved in setting it up and maintaining it.",
      image: this.props.image || "/assets/images/og_nodebucks.png",
      title: this.props.title || "Nodebucks",
      url: this.props.url || "https://nodebucks.com",
      noIndex: false,
      siteName: this.props.siteName || "Nodebucks",
      canonical: this.props.canonical || "https://nodebucks.com/"
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      description: nextProps.description || "Nodebucks makes it easy for you to own your own masternodes without the technical expertise involved in setting it up and maintaining it.",
      image: nextProps.image || "/assets/images/og_nodebucks.png",
      title: nextProps.title || "Nodebucks",
      url: nextProps.url || "https://nodebucks.com",
      siteName: nextProps.siteName || "Nodebucks",
      canonical: nextProps.canonical || "https://nodebucks.com/",
      noIndex: (nextProps.noIndex === true) ? true : false
    })
  }

  render() {
    const { description, title, url, image, noIndex, canonical, siteName } = this.state
    return (
      <Helmet>
        <meta name="keywords" content="masternodes masternode node blockchain"/>
        <meta name="description" content={description}/>
        <meta property="og:locale" content="en_US"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={title}/>
        <meta property="og:url" content={url}/>
        <meta property="og:site_name" content={siteName}/>
        <meta property="og:image" content={`https://nodebucks.com${image}`}/>
        <meta property="og:description" content={description}/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:image" content={`https://nodebucks.com${image}`}/>
        <meta name="twitter:description" content={description}/>
        {noIndex && <meta name="ROBOTS" content="NOINDEX"/>}
        <link rel="canonical" href={canonical}/>
        <title>{title}</title>
        {this.props.children}
      </Helmet>
    )
  }
}
