import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faChartLine, faGlobe } from '@fortawesome/fontawesome-free-solid'
import { Table } from 'reactstrap'
import './index.css'

class CryptoTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortedColumnName: '',
      isDescending: false,
      sortedList: []
    }

    this.sortTable = this.sortTable.bind(this)
  }

  componentWillMount() {
    !!this.props.list && !!this.props.list.length && this.sortTable('annualRoi')
  }

  componentWillReceiveProps(nextProps) {
    if ( !this.props.list.length && !!nextProps.list && !!nextProps.list.length ) {
      this.sortTable('annualRoi', nextProps)
    }
  }

  sortTable(columnName, props) {
    let { list } = !!props ? props : this.props
    let { sortedColumnName, isDescending } = this.state

    isDescending = sortedColumnName === columnName && !isDescending

    let sortedList = [].concat(list)

    sortedList.sort((a, b) => {
      if ( isDescending ) {
        return +a[ columnName ] > +b[ columnName ]
      }
      return +a[ columnName ] < +b[ columnName ]
    })

    this.setState({ sortedList, sortedColumnName: columnName, isDescending })

  }

  render() {
    let { sortedList, isDescending, sortedColumnName } = this.state

    //let list = !!sortedList ? sortedList : this.props.list

    return (
      <div className="row">
        <div className="col-12">
          <Table responsive className="cryptosTable">
            <thead>
            <tr className="cryptosTableHeaderRow">
              <th>Coin</th>
              <th>Annual ROI <FontAwesomeIcon onClick={() => this.sortTable('annualRoi')} icon={sortedColumnName === 'annualRoi' && !isDescending ? faAngleUp : faAngleDown} color="#9E9E9E"/></th>
              <th>Node Price <FontAwesomeIcon onClick={() => this.sortTable('nodePrice')} icon={sortedColumnName === 'nodePrice' && !isDescending ? faAngleUp : faAngleDown} color="#9E9E9E"/></th>
              <th>Monthly <FontAwesomeIcon onClick={() => this.sortTable('monthlyRoiValue')} icon={sortedColumnName === 'monthlyRoiValue' && !isDescending ? faAngleUp : faAngleDown} color="#9E9E9E"/></th>
              <th>Yearly <FontAwesomeIcon onClick={() => this.sortTable('yearlyRoiValue')} icon={sortedColumnName === 'yearlyRoiValue' && !isDescending ? faAngleUp : faAngleDown} color="#9E9E9E"/></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {this.displayCryptos(sortedList)}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }

  displayCryptos(list) {
    return list.map(item => {
      let nodePrice = (!!item.nodePrice || item.nodePrice === '0') ? '$' + (+item.nodePrice).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' USD' : '-'
      let monthlyRoiValue = (!!item.monthlyRoiValue || item.monthlyRoiValue === '0') ? '$' + (+item.monthlyRoiValue).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' USD' : '-'
      let yearlyRoiValue = (!!item.yearlyRoiValue || item.yearlyRoiValue === '0') ? '$' + (+item.yearlyRoiValue).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' USD' : '-'
      let annualRoi = (!!item.annualRoi || item.annualRoi === '0') ? ((+item.annualRoi) * 100.0).toFixed(1) + ' %' : '-'
      return (
        <tr key={item.slug}>
          <td>
            {item.name}
            <a href={`https://masternodes.pro/stats/${item.symbol}/statistics`} target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faChartLine} color="#3D58E7"/></a>
            <a href={item.url} target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faGlobe} color="#3D58E7"/></a>
          </td>
          <td>{annualRoi}</td>
          <td>{nodePrice}</td>
          <td>{monthlyRoiValue}</td>
          <td>{yearlyRoiValue}</td>
          <td className="d-flex">
            {+item.nodePrice < 50000 &&
            <button className="btn btn-primary addNodeButton">+ Add Node</button>
            }
            {+item.nodePrice > 50000 &&
            <NavLink to='/contact' className="btn btn-primary addNodeButton">Contact Sales</NavLink>
            }
          </td>
        </tr>
      )
    })
  }
}

export default withRouter(CryptoTable)
