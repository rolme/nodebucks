import { Component } from 'react'
import moment from 'moment'
import axios from 'axios'

export default class Reloader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lastModified: new moment.utc(),
      timer: this.props.timer || 300
    }
  }

  componentDidMount() {
    this.handleCountDown(this.state.timer)
  }

  lastModified(url, wch) {
    const { lastModified, timer } = this.state

    axios.head(url).then(response => {
      const latestModified = moment(response.headers['last-modified']).utc()
      if (latestModified.isAfter(lastModified)) {
        this.props.onExpire()
      } else {
        this.handleCountDown(timer)
      }
    }).catch(err => {
      return err.message
    })
  }

  handleCountDown(timer) {
    const start = new moment()
    const end   = start.add(timer, 'seconds')

    const interval = setInterval(() => {
      const now      = new moment()
      const distance = moment.duration(end.diff(now))

      if (distance < 0) {
        clearInterval(interval)
        this.lastModified(document.location.origin, 'Last-Modified')
      }
    })

    this.setState({ interval: interval })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  render() { return null }
}
