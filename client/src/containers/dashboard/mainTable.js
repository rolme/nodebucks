import React, { Component } from 'react'
import {Col} from 'reactstrap'

export default class MainTable extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="mainTableContainer">
        <div className="contentContainer">
          <p className="summaryTableTitle">Summary</p>

          <button className="submitButton mt-2 py-3">+ Add Node</button>
        </div>
      </div>
    )
  }
}
