import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/fontawesome-free-solid'
import { Table } from 'reactstrap'
import './index.css'
import { valueFormat } from "../../lib/helpers";

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
    !!this.props.list && !!this.props.list.length && this.sortTable('annualRoiPercentage')
  }

  componentWillReceiveProps(nextProps) {
    if ( !this.props.list.length && !!nextProps.list && !!nextProps.list.length ) {
      this.sortTable('annualRoiPercentage', nextProps)
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

    return (
      <div className="row">
        <div className="col-12">
          <Table responsive className="cryptosTable">
            <thead>
            <tr className="cryptosTableHeaderRow">
              <th>Coin</th>
              <th className={`${sortedColumnName === 'annualRoiPercentage' ? 'cryptosTableSortedColumnCell' : ''} d-xl-table-cell d-lg-table-cell d-none`}><p onClick={() => this.sortTable('annualRoiPercentage')} className="mb-0">Annual ROI <FontAwesomeIcon onClick={() => this.sortTable('annualRoiPercentage')} icon={sortedColumnName === 'annualRoiPercentage' && !isDescending ? faAngleUp : faAngleDown} color="#9E9E9E" className="ml-2"/></p></th>
              <th className={`${sortedColumnName === 'monthlyRoiValue' ? 'cryptosTableSortedColumnCell' : ''} d-xl-table-cell d-lg-table-cell d-none`}><p onClick={() => this.sortTable('monthlyRoiValue')} className="mb-0">Monthly Return <FontAwesomeIcon onClick={() => this.sortTable('monthlyRoiValue')} icon={sortedColumnName === 'monthlyRoiValue' && !isDescending ? faAngleUp : faAngleDown} color="#9E9E9E" className="ml-2"/></p></th>
              <th className={`${sortedColumnName === 'yearlyRoiValue' ? 'cryptosTableSortedColumnCell' : ''} d-xl-table-cell d-lg-table-cell d-none`}><p onClick={() => this.sortTable('yearlyRoiValue')} className="mb-0">Yearly Return <FontAwesomeIcon onClick={() => this.sortTable('yearlyRoiValue')} icon={sortedColumnName === 'yearlyRoiValue' && !isDescending ? faAngleUp : faAngleDown} color="#9E9E9E" className="ml-2"/></p></th>
              <th className={`${sortedColumnName === 'nodePrice' ? 'cryptosTableSortedColumnCell' : ''}`}><p onClick={() => this.sortTable('nodePrice')} className="mb-0">Node Price <FontAwesomeIcon onClick={() => this.sortTable('nodePrice')} icon={sortedColumnName === 'nodePrice' && !isDescending ? faAngleUp : faAngleDown} color="#9E9E9E" className="ml-2"/></p></th>
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
    let { sortedColumnName } = this.state

    return list.map(item => {
      let nodePrice = (!!item.nodePrice || item.nodePrice === '0') ? '$' + valueFormat(+item.nodePrice) + ' USD' : '-'
      let monthlyRoiValue = (!!item.monthlyRoiValue || item.monthlyRoiValue === '0') ? '$' + valueFormat(+item.monthlyRoiValue) + ' USD' : '-'
      let yearlyRoiValue = (!!item.yearlyRoiValue || item.yearlyRoiValue === '0') ? '$' + valueFormat(+item.yearlyRoiValue) + ' USD' : '-'
      let annualRoi = (!!item.annualRoiPercentage || item.annualRoiPercentage === '0') ? ((+item.annualRoiPercentage) * 100.0).toFixed(1) + ' %' : '-'
      return (
        <tr key={item.slug}>
          <td>
            <div className="d-flex justify-content-center align-items-center cryptosTableCoinCellContainer">
              <img alt="logo" src={`/assets/images/logos/${item.slug}.png`} width="40px"/>
              <p>{item.name}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="d-flex"><img alt="logo" src={`/assets/images/globe.png`} width="21px"/></a>
            </div>
          </td>
          <td className={`${sortedColumnName === 'annualRoiPercentage' ? 'cryptosTableSortedColumnCell' : ''} d-xl-table-cell d-lg-table-cell d-none`}>{annualRoi}</td>
          <td className={`${sortedColumnName === 'monthlyRoiValue' ? 'cryptosTableSortedColumnCell' : ''} d-xl-table-cell d-lg-table-cell d-none`}>{monthlyRoiValue}</td>
          <td className={`${sortedColumnName === 'yearlyRoiValue' ? 'cryptosTableSortedColumnCell' : ''} d-xl-table-cell d-lg-table-cell d-none`}>{yearlyRoiValue}</td>
          <td className={`${sortedColumnName === 'nodePrice' ? 'cryptosTableSortedColumnCell' : ''}`}>{nodePrice}</td>
          <td className="d-flex">
            <NavLink to={`/masternodes/${item.slug}`} className="btn btn-primary addNodeButton"><img src="/assets/images/plusIcon.png" alt="add" className="mr-2"/> Select</NavLink>
          </td>
        </tr>
      )
    })
  }
}

export default withRouter(CryptoTable)
