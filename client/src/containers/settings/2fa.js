import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Col, Button, Alert, Input } from 'reactstrap'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { enable2FA, disable2FA } from '../../reducers/user'

class TwoFactorAuthentication extends Component {
  
  constructor(props) {
    super(props)

    let QRCodeUrl 
    let secret = speakeasy.generateSecret({ length: 20, name: 'Nodebucks' })
    QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
      QRCodeUrl = data_url;
    });

    this.state = {
      userToken: '',
      tokenVerified: false,
      secret,
      QRCodeUrl,
      response: null
    }
  }

  verifyToken = (e) => {
    this.setState({ 
      userToken: e.target.value,
      tokenVerified: speakeasy.totp.verify({ 
        secret: this.state.secret.ascii,
        encoding: 'ascii',
        token: e.target.value 
      })
    })
  }

  handleEnable2FA = () => {
    this.props.enable2FA(this.props.user.slug, this.state.secret.ascii, (response) => {
      this.setState({ response })
    })
  }

  handleDisable2FA = () => {
    this.props.disable2FA(this.props.user.slug, (response) => {
      this.setState({ response })
    })
  }

  render() {
    const { userToken, QRCodeUrl, tokenVerified, response } = this.state

    return (
      <Container fluid className="settingsContainer">
        <div className="contentContainer px-0">
          <Col className="settingsContentContainer px-0" xl={{ size: 12 }} lg={{ size: 12 }} md={{ size: 12 }} sm={{ size: 12 }} xs={{ size: 12 }}>
            <h1 className="settingsTitleText pageTitle">Two Factor Authentication</h1>
            <Col className="changeInputFieldsContainer">
              {response &&
                <Alert color={response.status === 'ok' ? 'success' : 'danger'}>
                  {response.message}
                </Alert>
              }
              { !this.props.user.enabled2FA ?
                <div>
                  <Col className="px-0 settingsPageFieldsPartContainer">
                    <div>Use Google Authenticator to scan the QRCode</div>
                    <img src={QRCodeUrl} alt="QRCode"/>
                  </Col>
                  <Col className="px-0 settingsPageFieldsPartContainer">
                    <div>Enter 6 digit code you get from Google Authenticator</div>
                    <Input
                        name="userToken"
                        placeholder="Enter code here"
                        id="userToken"
                        type='text'
                        autoFocus={true}
                        value={userToken}
                        onChange={this.verifyToken}
                    />
                  </Col>
                  <Col className="d-flex px-0 settingsFooterButtonsContainer justify-content-start">
                    <Button 
                      className="submitButton" 
                      disabled={!tokenVerified}
                      onClick={this.handleEnable2FA}
                    >
                      Enable 2FA
                    </Button>
                  </Col>
                </div> :
                <div>
                  <Col className="d-flex px-0 settingsFooterButtonsContainer justify-content-start">
                    <Button 
                      className="submitButton" 
                      onClick={this.handleDisable2FA}
                    >
                      Disable 2FA
                    </Button>
                  </Col>
                </div>
              }
            </Col>
          </Col>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  enable2FA,
  disable2FA,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwoFactorAuthentication)

