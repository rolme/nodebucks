import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'

class CryptoTable extends Component {
  render() {
    let { list } = this.props

    return(
      <div className="row">
        <div className="offset-1 col-10">
          <h2 className="mt-2">Cryptos ({list.length})</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Coin</th>
                <th>Nodes</th>
                <th>Annual ROI</th>
                <th>Node Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.displayCryptos(list)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  displayCryptos(list) {
    return list.map(item => {
      let nodes = (+item.nodes).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      let nodePrice = (+item.nodePrice).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      let annualRoi = ((+item.annualRoi) * 100.0).toFixed(1)
      return(
        <tr key={item.slug}>
          <td style={{verticalAlign: 'middle'}}>
            <a href={item.url}>{item.name}</a>
          </td>
          <td>{nodes}</td>
          <td>{annualRoi}%</td>
          <td>
            <NavLink to={`/debug/${item.slug}`}>${nodePrice} USD</NavLink>
          </td>
          <td><button className="btn btn-primary">Add Node</button></td>
        </tr>
      )
    })
  }

  displayAvatar(image) {
    if (image === null || image === '') {
      return <img src="/assets/images/user.jpg" alt="avatar" style={{borderRadius: '50%', paddingRight: '5px'}} />
    }

    return <img src={image}  alt="avatar" width="60" height="60" style={{borderRadius: '50%', paddingRight: '5px'}} />
  }
}

export default withRouter(CryptoTable)
