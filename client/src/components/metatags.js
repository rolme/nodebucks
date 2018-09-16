import React, { Component } from 'react'
import { Helmet } from "react-helmet"

export default class Metatags extends Component {
  constructor(props) {
    super( props )
    this.state = {
      description: this.props.description || "Nodebucks makes it easy for you to own your own masternodes without the technical expertise involved in setting it up and maintaining it.",
      title: this.props.title || "Nodebucks",
      url: this.props.url || "https://nodebucks.com"
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      description: nextProps.description || "Nodebucks makes it easy for you to own your own masternodes without the technical expertise involved in setting it up and maintaining it.",
      title: nextProps.title || "Nodebucks",
      url: nextProps.url || "https://nodebucks.com"
    })
  }

  render() {
    const { description, title, url } = this.state
    return(
      <Helmet>
        <meta name="description" content={description} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />
        <title>{title}</title>
        {this.props.children}
      </Helmet>
    )
  }
}
