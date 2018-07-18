import React from 'react'
import LogIn from '../authenticate/login'
import SignUp from '../authenticate/signUp'
import { Row, Col } from 'reactstrap'

export default class AuthForms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: 'login'
    }
    this.changeShowingForm = this.changeShowingForm.bind(this)
  }

  changeShowingForm(name){
    this.setState({showForm: name})
  }

  handleReload() {
    window.location.reload()
  }

  render() {
    const { showForm } = this.state
    return (
      <Row className="d-flex justify-content-center">
        <Col xl={{ size: 4 }} lg={{ size: 6 }} md={{ size: 6 }} className="purchaseNodeAuthPartTabs">
          <Col xl={6} lg={6} md={6} sm={6} xs={12} onClick={() => this.changeShowingForm('login')} className={`${showForm === 'login' ? 'selectedAuthTab' : ''}`}><p>LOGIN</p></Col>
          <Col xl={6} lg={6} md={6} sm={6} xs={12} onClick={() => this.changeShowingForm('register')} className={`${showForm === 'register' ? 'selectedAuthTab' : ''}`}><p>REGISTER</p></Col>
        </Col>
        {showForm === 'login' &&
        <Col xl={12}>
          <LogIn isOnlyForm={true} onSuccess={this.handleReload}/>
        </Col>
        }
        {showForm === 'register' &&
        <Col xl={12}>
          <SignUp onSuccess={this.handleReload}/>
        </Col>
        }
      </Row>
    )
  }
}

