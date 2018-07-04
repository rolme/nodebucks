import React, { Component } from 'react'
import moment from 'moment'

export default class Countdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      display: this.props.display || 'Countdown starting...',
      timer: this.props.timer || 180
    }
  }

  componentWillMount() {
    if(!!this.props.timer){
      this.handleCountDown(this.props.timer)
    } else {
      this.setState({display: "Pending..."})
    }
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.refreshing){
      clearInterval(this.state.interval)
      this.setState({display: "Pending..."})
      return
    }
    this.props.refreshing !== nextProps.refreshing && !!nextProps.timer && this.handleCountDown(nextProps.timer)
  }

  handleCountDown(timer){

    const start = new moment()
    const end   = start.add(timer, 'seconds')

    const interval = setInterval(() => {
      const now      = new moment()
      const distance = moment.duration(end.diff(now))
      const minutes  = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds  = Math.floor((distance % (1000 * 60)) / 1000)

      this.setState({ display: `${minutes}:${seconds.toString().padStart(2, "0")}` })

      if (distance < 0) {
        clearInterval(interval)
        this.setState({ display: 'EXPIRED' })
        this.handleExpire()
      }
    })

    this.setState({ interval: interval })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  handleExpire() {
    this.props.onExpire()
  }

  render() {
    return this.state.display
  }
}
