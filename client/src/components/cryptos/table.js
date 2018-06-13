import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/fontawesome-free-solid'
import { Table } from 'reactstrap'
import './index.css'

class CryptoTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortedColumnName: '',
      isDescending: true,
      sortedList: null
    }

    this.sortTable = this.sortTable.bind(this)
  }

  sortTable(columnName) {
    let { list } = this.props
    let { sortedColumnName, isDescending } = this.state

    isDescending = sortedColumnName === columnName && !isDescending

    let sortedList = [].concat(list)

    sortedList.sort((a, b) => {
      if ( isDescending ) {
        return a[ columnName ] > b[ columnName ]
      }
      return a[ columnName ] < b[ columnName ]
    })

    this.setState({ sortedList, sortedColumnName: columnName, isDescending })

  }


  render() {
    let { sortedList, isDescending, sortedColumnName } = this.state

    let list = !!sortedList ? sortedList : this.props.list

    return (
      <div className="row">
        <div className="col-12">
          <Table responsive className="cryptosTable">
            <thead>
            <tr className="cryptosTableHeaderRow">
              <th>Coin</th>
              <th>Nodes <FontAwesomeIcon onClick={() => this.sortTable('nodes')} icon={sortedColumnName === 'nodes' && !isDescending ? faAngleUp : faAngleDown} color="#9E9E9E"/></th>
              <th>Annual ROI <FontAwesomeIcon onClick={() => this.sortTable('annualRoi')} icon={sortedColumnName === 'annualRoi' && !isDescending ? faAngleUp : faAngleDown} color="#9E9E9E"/></th>
              <th>Purchasable Price <FontAwesomeIcon onClick={() => this.sortTable('price')} icon={sortedColumnName === 'price' && !isDescending ? faAngleUp : faAngleDown} color="#9E9E9E"/></th>
              <th>Node Price <FontAwesomeIcon onClick={() => this.sortTable('nodePrice')} icon={sortedColumnName === 'nodePrice' && !isDescending ? faAngleUp : faAngleDown} color="#9E9E9E"/></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {this.displayCryptos(list)}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }

  displayCryptos(list) {
    return list.map(item => {
      let nodes = (!!item.nodes || item.nodes === '0') ? (+item.nodes).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : '-'
      let purchasablePrice = (!!item.price || item.price === '0') ? '$' + (+item.price).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' USD' : '-'
      let nodePrice = (!!item.nodePrice || item.nodePrice === '0') ? '$' + (+item.nodePrice).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' USD' : '-'
      let annualRoi = (!!item.annualRoi || item.annualRoi === '0') ? ((+item.annualRoi) * 100.0).toFixed(1) + ' %' : '-'
      return (
        <tr key={item.slug}>
          <td>
            <a href={item.url}>{item.name}</a>
          </td>
          <td>{nodes}</td>
          <td>{annualRoi}</td>
          <td>
            <NavLink to={`/debug/${item.slug}`}>{purchasablePrice}</NavLink>
          </td>
          <td>{nodePrice}</td>
          <td className="d-flex">
            <button className="btn btn-primary addNodeButton">+ Add Node</button>
          </td>
        </tr>
      )
    })
  }
}

export default withRouter(CryptoTable)
