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
      showAlert: false,
    }
  }

  handleDrop = (files) => {
    this.setState({
      image: files[ 0 ],
    })
  }

  uploadImage = () => {
    let formData = new FormData();
    formData.append('user[verification_image]', this.state.image)
    this.props.uploadVerificationImage(this.props.user.slug, formData, () => {
      this.setState({ isUploading: false, showAlert: true })
      setTimeout(() => {
        this.setState({ showAlert: false })
      }, 3000);
    })
    this.setState({ formError: null, isUploading: true })
  }

  validation = () => {
    const { image } = this.state
    let error = ''

    if ( !image ) error = "No image to upload!"
    if ( image && image.size > 50000000 ) error = "Image upload size too large!"

    if ( error ) {
      this.setState({ formError: error })
    } else {
      this.uploadImage();
    }
  }

  render() {
    const { user, message, error, pending } = this.props
    const { formError, isUploading, showAlert } = this.state

    if ( pending ) return <div/>

    return (
      <Container fluid className="settingsContainer">
        <div className="contentContainer px-0">
          <Col className="settingsContentContainer px-0" xl={{ size: 12 }} lg={{ size: 12 }} md={{ size: 12 }} sm={{ size: 12 }} xs={{ size: 12 }}>
            <h1 className="settingsTitleText pageTitle">Verification</h1>
          </Col>
          {(!!message) &&
          <Alert className="mt-1" color={error ? 'danger' : 'success'} isOpen={showAlert}>
            {message}
          </Alert>
          }
          {user.verificationStatus === 'pending' ?
            <p className="verificationMessage">ID verification is pending.</p> :
            <p className="verificationMessage">{user.verified ? 'Your account is already verified!' : 'Click on the image below to upload a photo ID or passport.'}</p>
          }
          {!user.verified &&
          <Form className="mt-4">
            <Col className="changeInputFieldsContainer">
              {user.verificationStatus !== 'pending' && this.renderImageDropzone()}
            </Col>
            {user.verificationStatus !== 'pending' &&
            <Col className="d-flex verificationFooterButtonsContainer justify-content-center">
              <Button onClick={this.validation} className="submitButton" disabled={isUploading}>SUBMIT</Button>
            </Col>
            }
            {user.verificationStatus !== 'pending' && formError && <p className="verificationFormError">{formError}</p>}
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
          onDrop={this.handleDrop}
          accept="image/jpeg,image/jpg,image/tiff,image/gif,image/svg,image/png"
          multiple={false}
          className="avatar-dropzone"
        >
          {isUploading ?
            this.renderSpinner() :
            <div className="uploadPhotoContainer">
              <div className="uploadPhotoLabelContainer">
                <img src="/assets/images/uploadIcon.png" alt="upload"/>
                <p> Upload </p>
                <p> Photo ID </p>
              </div>
              <img src={image ? image.preview : '/assets/images/user.jpg'} width="200" height="200" alt="preview"/>
            </div>
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
  pending: state.user.pending,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  uploadVerificationImage,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verification)
