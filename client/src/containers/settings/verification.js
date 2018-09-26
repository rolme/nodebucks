import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Form, Col, Button, Alert } from 'reactstrap'
import Dropzone from 'react-dropzone'
import { ClipLoader } from 'react-spinners'
import {
  uploadVerificationImage 
} from '../../reducers/user';

class Verification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      image: null,
      formError: null,
      isUploading: false,
    }
  }

  handleDrop = (files) => {
    this.setState({
      image: files[0],
    })
  }

  uploadImage = () => {
    let formData = new FormData();
    formData.append('user[verification_image]', this.state.image)
    this.props.uploadVerificationImage(this.props.user.slug, formData, () => {
      this.setState({ isUploading: false })
    })
    this.setState({ formError: null, isUploading: true })
  }

  validation = () => {
    const { image } = this.state
    let error = ''

    if(!image) error = "No image to upload!"
    if(image && image.size > 50000000) error = "Image upload size too large!"
    
    if(error) {
      this.setState({ formError: error })
    } else {
      this.uploadImage();
    }
  }

  render() {
    const { user, message, error } = this.props
    const { formError, isUploading } = this.state
    return (
      <Container fluid className="settingsContainer">
        <div className="contentContainer px-0">
          <Col className="settingsContentContainer px-0" xl={{ size: 12 }} lg={{ size: 12 }} md={{ size: 12 }} sm={{ size: 12 }} xs={{ size: 12 }}>
            <h1 className="settingsTitleText pageTitle">Verification</h1>
          </Col>
          <p className="verificationMessage">{user.verified ? 'Your account is already verified!' : 'Please upload a picture of your photo ID or passport.'}</p>
          { !user.verified &&
            <Form className="mt-4">
              <Col className="changeInputFieldsContainer">
                {(!!message) &&
                  <Alert color={error ? 'danger' : 'success'}>
                    { message}
                  </Alert>
                }
                { this.renderImageDropzone() }
              </Col>
              <Col className="d-flex verificationFooterButtonsContainer justify-content-center">
                <Button onClick={this.validation} className="submitButton" disabled={isUploading}>UPLOAD</Button>
              </Col>
              { formError && <p className="verificationFormError">{formError}</p> }
            </Form>
          }
        </div>
      </Container>
    )
  }

  renderImageDropzone() {
    const { image, isUploading } = this.state
    return (
      <div className="avatar-dropzone-container">
        <Dropzone
          onDrop={ this.handleDrop }
          accept="image/jpeg,image/jpg,image/tiff,image/gif,image/svg,image/png"
          multiple={ false }
          className="avatar-dropzone"
        >
          { isUploading ?
            this.renderSpinner() :
            <img src={ image ? image.preview : '/assets/images/user.jpg' } width="200" height="200" alt="preview" />
          }
        </Dropzone>
      </div>
    )
  }

  renderSpinner() {
    return (
      <div className="spinnerContainer">
        <ClipLoader
          size={35}
          color={'#3F89E8'}
          loading={true}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  message: state.user.verificationMessage,
  error: state.user.error,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  uploadVerificationImage,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verification)
