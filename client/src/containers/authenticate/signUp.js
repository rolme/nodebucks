import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import InputField from '../../components/elements/inputField'
import SelectField from '../../components/elements/selectField'
import { Container, Col, Button, Alert } from 'reactstrap'
import { capitalize } from '../../lib/helpers'
import './index.css'

import { register, reset } from '../../reducers/user.js'

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first: '',
      last: '',
      email: '',
      password: '',
      confirmPassword: '',
      zipcode: '',
      city: '',
      state: '',
      address: '',
      country: '',
      showPassword: false,
      showConfirmPassword: false,
      stepNumber: 1,
      messages: {
        email: '*Required',
        password: '*Required',
        confirmPassword: '*Required'
      },
      errors: {
        email: false,
        password: false,
        confirmPassword: false
      }
    }
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
    this.onAddonClick = this.onAddonClick.bind(this)
    this.stepOneValidation = this.stepOneValidation.bind(this)
    this.signUp = this.signUp.bind(this)
  }

  componentWillMount() {
    const { user } = this.props
    if ( !!user ) {
      this.props.history.push('/')
      return
    }
    this.props.reset()
  }

  componentWillReceiveProps(nextProps) {
    const { user, message, error } = nextProps
    if ( !!user ) {
      this.props.history.push('/')
    } else if ( message === 'Email has already been taken' ) {
      let messages = { ...this.state.messages }, errors = { ...this.state.errors }
      messages.email = message
      errors.email = error
      this.setState({ stepNumber: 1, messages, errors })
    }
  }

  componentWillUnmount() {
    this.props.reset()
  }

  handleFieldValueChange(newValue, name) {
    this.setState({ [name]: newValue, })
  }

  onAddonClick(name) {
    name = 'show' + capitalize(name)
    this.setState({ [name]: !this.state[ name ] })
  }

  stepOneValidation() {
    const { email, password, confirmPassword } = this.state
    let isValid = true, messages = {...this.state.messages }, errors = { ...this.state.errors }, { stepNumber } = this.state
    const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if ( !email ) {
      messages.email = '*Required'
      errors.email = true
      isValid = false
    } else if ( !re.test(email) ) {
      messages.email = 'Please type valid email address'
      errors.email = true
      isValid = false
    }

    if ( !password ) {
      messages.password = '*Required'
      errors.password = true
      isValid = false
    }

    if ( !confirmPassword ) {
      messages.confirmPassword = '*Required'
      errors.confirmPassword = true
      isValid = false
    }

    if ( !!password && !!confirmPassword && confirmPassword !== password ) {
      messages.confirmPassword = 'The password and confirmation password do not match'
      errors.confirmPassword = true
      isValid = false
    }

    stepNumber = isValid ? stepNumber + 1 : stepNumber

    this.setState({ stepNumber, messages, errors })
  }

  signUp() {
    const { first, last, email, password, confirmPassword, zipcode, city, state, address, country } = this.state

    this.props.register({
      first,
      last,
      email,
      password,
      password_confirmation: confirmPassword,
      zipcode,
      city,
      state,
      address,
      country
    })
  }

  render() {
    const countryOptions = [
      { "value": "Afghanistan", "label": "Afghanistan" }, { "value": "Albania", "label": "Albania" }, { "value": "Algeria", "label": "Algeria" }, { "value": "Andorra", "label": "Andorra" }, { "value": "Angola", "label": "Angola" }, { "value": "Anguilla", "label": "Anguilla" }, { "value": "Antigua &amp; Barbuda", "label": "Antigua &amp; Barbuda" }, { "value": "Argentina", "label": "Argentina" }, { "value": "Armenia", "label": "Armenia" }, {
        "value": "Aruba",
        "label": "Aruba"
      }, { "value": "Australia", "label": "Australia" }, { "value": "Austria", "label": "Austria" }, { "value": "Azerbaijan", "label": "Azerbaijan" }, { "value": "Bahamas", "label": "Bahamas" }, { "value": "Bahrain", "label": "Bahrain" }, { "value": "Bangladesh", "label": "Bangladesh" }, { "value": "Barbados", "label": "Barbados" }, { "value": "Belarus", "label": "Belarus" }, { "value": "Belgium", "label": "Belgium" }, { "value": "Belize", "label": "Belize" }, {
        "value": "Benin",
        "label": "Benin"
      }, { "value": "Bermuda", "label": "Bermuda" }, { "value": "Bhutan", "label": "Bhutan" }, { "value": "Bolivia", "label": "Bolivia" }, { "value": "Bosnia &amp; Herzegovina", "label": "Bosnia &amp; Herzegovina" }, { "value": "Botswana", "label": "Botswana" }, { "value": "Brazil", "label": "Brazil" }, { "value": "British Virgin Islands", "label": "British Virgin Islands" }, { "value": "Brunei", "label": "Brunei" }, { "value": "Bulgaria", "label": "Bulgaria" }, {
        "value": "Burkina Faso",
        "label": "Burkina Faso"
      }, { "value": "Burundi", "label": "Burundi" }, { "value": "Cambodia", "label": "Cambodia" }, { "value": "Cameroon", "label": "Cameroon" }, { "value": "Canada", "label": "Canada" }, { "value": "Cape Verde", "label": "Cape Verde" }, { "value": "Cayman Islands", "label": "Cayman Islands" }, { "value": "Chad", "label": "Chad" }, { "value": "Chile", "label": "Chile" }, { "value": "China", "label": "China" }, { "value": "Colombia", "label": "Colombia" }, {
        "value": "Congo",
        "label": "Congo"
      }, { "value": "Cook Islands", "label": "Cook Islands" }, { "value": "Costa Rica", "label": "Costa Rica" }, { "value": "Cote D Ivoire", "label": "Cote D Ivoire" }, { "value": "Croatia", "label": "Croatia" }, { "value": "Cruise Ship", "label": "Cruise Ship" }, { "value": "Cuba", "label": "Cuba" }, { "value": "Cyprus", "label": "Cyprus" }, { "value": "Czech Republic", "label": "Czech Republic" }, { "value": "Denmark", "label": "Denmark" }, {
        "value": "Djibouti",
        "label": "Djibouti"
      }, { "value": "Dominica", "label": "Dominica" }, { "value": "Dominican Republic", "label": "Dominican Republic" }, { "value": "Ecuador", "label": "Ecuador" }, { "value": "Egypt", "label": "Egypt" }, { "value": "El Salvador", "label": "El Salvador" }, { "value": "Equatorial Guinea", "label": "Equatorial Guinea" }, { "value": "Estonia", "label": "Estonia" }, { "value": "Ethiopia", "label": "Ethiopia" }, { "value": "Falkland Islands", "label": "Falkland Islands" }, {
        "value": "Faroe Islands",
        "label": "Faroe Islands"
      }, { "value": "Fiji", "label": "Fiji" }, { "value": "Finland", "label": "Finland" }, { "value": "France", "label": "France" }, { "value": "French Polynesia", "label": "French Polynesia" }, { "value": "French West Indies", "label": "French West Indies" }, { "value": "Gabon", "label": "Gabon" }, { "value": "Gambia", "label": "Gambia" }, { "value": "Georgia", "label": "Georgia" }, { "value": "Germany", "label": "Germany" }, { "value": "Ghana", "label": "Ghana" }, {
        "value": "Gibraltar",
        "label": "Gibraltar"
      }, { "value": "Greece", "label": "Greece" }, { "value": "Greenland", "label": "Greenland" }, { "value": "Grenada", "label": "Grenada" }, { "value": "Guam", "label": "Guam" }, { "value": "Guatemala", "label": "Guatemala" }, { "value": "Guernsey", "label": "Guernsey" }, { "value": "Guinea", "label": "Guinea" }, { "value": "Guinea Bissau", "label": "Guinea Bissau" }, { "value": "Guyana", "label": "Guyana" }, { "value": "Haiti", "label": "Haiti" }, {
        "value": "Honduras",
        "label": "Honduras"
      }, { "value": "Hong Kong", "label": "Hong Kong" }, { "value": "Hungary", "label": "Hungary" }, { "value": "Iceland", "label": "Iceland" }, { "value": "India", "label": "India" }, { "value": "Indonesia", "label": "Indonesia" }, { "value": "Iran", "label": "Iran" }, { "value": "Iraq", "label": "Iraq" }, { "value": "Ireland", "label": "Ireland" }, { "value": "Isle of Man", "label": "Isle of Man" }, { "value": "Israel", "label": "Israel" }, {
        "value": "Italy",
        "label": "Italy"
      }, { "value": "Jamaica", "label": "Jamaica" }, { "value": "Japan", "label": "Japan" }, { "value": "Jersey", "label": "Jersey" }, { "value": "Jordan", "label": "Jordan" }, { "value": "Kazakhstan", "label": "Kazakhstan" }, { "value": "Kenya", "label": "Kenya" }, { "value": "Kuwait", "label": "Kuwait" }, { "value": "Kyrgyz Republic", "label": "Kyrgyz Republic" }, { "value": "Laos", "label": "Laos" }, { "value": "Latvia", "label": "Latvia" }, {
        "value": "Lebanon",
        "label": "Lebanon"
      }, { "value": "Lesotho", "label": "Lesotho" }, { "value": "Liberia", "label": "Liberia" }, { "value": "Libya", "label": "Libya" }, { "value": "Liechtenstein", "label": "Liechtenstein" }, { "value": "Lithuania", "label": "Lithuania" }, { "value": "Luxembourg", "label": "Luxembourg" }, { "value": "Macau", "label": "Macau" }, { "value": "Macedonia", "label": "Macedonia" }, { "value": "Madagascar", "label": "Madagascar" }, { "value": "Malawi", "label": "Malawi" }, {
        "value": "Malaysia",
        "label": "Malaysia"
      }, { "value": "Maldives", "label": "Maldives" }, { "value": "Mali", "label": "Mali" }, { "value": "Malta", "label": "Malta" }, { "value": "Mauritania", "label": "Mauritania" }, { "value": "Mauritius", "label": "Mauritius" }, { "value": "Mexico", "label": "Mexico" }, { "value": "Moldova", "label": "Moldova" }, { "value": "Monaco", "label": "Monaco" }, { "value": "Mongolia", "label": "Mongolia" }, { "value": "Montenegro", "label": "Montenegro" }, {
        "value": "Montserrat",
        "label": "Montserrat"
      }, { "value": "Morocco", "label": "Morocco" }, { "value": "Mozambique", "label": "Mozambique" }, { "value": "Namibia", "label": "Namibia" }, { "value": "Nepal", "label": "Nepal" }, { "value": "Netherlands", "label": "Netherlands" }, { "value": "Netherlands Antilles", "label": "Netherlands Antilles" }, { "value": "New Caledonia", "label": "New Caledonia" }, { "value": "New Zealand", "label": "New Zealand" }, { "value": "Nicaragua", "label": "Nicaragua" }, {
        "value": "Niger",
        "label": "Niger"
      }, { "value": "Nigeria", "label": "Nigeria" }, { "value": "Norway", "label": "Norway" }, { "value": "Oman", "label": "Oman" }, { "value": "Pakistan", "label": "Pakistan" }, { "value": "Palestine", "label": "Palestine" }, { "value": "Panama", "label": "Panama" }, { "value": "Papua New Guinea", "label": "Papua New Guinea" }, { "value": "Paraguay", "label": "Paraguay" }, { "value": "Peru", "label": "Peru" }, { "value": "Philippines", "label": "Philippines" }, {
        "value": "Poland",
        "label": "Poland"
      }, { "value": "Portugal", "label": "Portugal" }, { "value": "Puerto Rico", "label": "Puerto Rico" }, { "value": "Qatar", "label": "Qatar" }, { "value": "Reunion", "label": "Reunion" }, { "value": "Romania", "label": "Romania" }, { "value": "Russia", "label": "Russia" }, { "value": "Rwanda", "label": "Rwanda" }, { "value": "Saint Pierre &amp; Miquelon", "label": "Saint Pierre &amp; Miquelon" }, { "value": "Samoa", "label": "Samoa" }, {
        "value": "San Marino",
        "label": "San Marino"
      }, { "value": "Satellite", "label": "Satellite" }, { "value": "Saudi Arabia", "label": "Saudi Arabia" }, { "value": "Senegal", "label": "Senegal" }, { "value": "Serbia", "label": "Serbia" }, { "value": "Seychelles", "label": "Seychelles" }, { "value": "Sierra Leone", "label": "Sierra Leone" }, { "value": "Singapore", "label": "Singapore" }, { "value": "Slovakia", "label": "Slovakia" }, { "value": "Slovenia", "label": "Slovenia" }, {
        "value": "South Africa",
        "label": "South Africa"
      }, { "value": "South Korea", "label": "South Korea" }, { "value": "Spain", "label": "Spain" }, { "value": "Sri Lanka", "label": "Sri Lanka" }, { "value": "St Kitts &amp; Nevis", "label": "St Kitts &amp; Nevis" }, { "value": "St Lucia", "label": "St Lucia" }, { "value": "St Vincent", "label": "St Vincent" }, { "value": "St. Lucia", "label": "St. Lucia" }, { "value": "Sudan", "label": "Sudan" }, { "value": "Suriname", "label": "Suriname" }, {
        "value": "Swaziland",
        "label": "Swaziland"
      }, { "value": "Sweden", "label": "Sweden" }, { "value": "Switzerland", "label": "Switzerland" }, { "value": "Syria", "label": "Syria" }, { "value": "Taiwan", "label": "Taiwan" }, { "value": "Tajikistan", "label": "Tajikistan" }, { "value": "Tanzania", "label": "Tanzania" }, { "value": "Thailand", "label": "Thailand" }, { "value": "Timor L'Este", "label": "Timor L'Este" }, { "value": "Togo", "label": "Togo" }, { "value": "Tonga", "label": "Tonga" }, {
        "value": "Trinidad &amp; Tobago",
        "label": "Trinidad &amp; Tobago"
      }, { "value": "Tunisia", "label": "Tunisia" }, { "value": "Turkey", "label": "Turkey" }, { "value": "Turkmenistan", "label": "Turkmenistan" }, { "value": "Turks &amp; Caicos", "label": "Turks &amp; Caicos" }, { "value": "Uganda", "label": "Uganda" }, { "value": "Ukraine", "label": "Ukraine" }, { "value": "United Arab Emirates", "label": "United Arab Emirates" }, { "value": "United Kingdom", "label": "United Kingdom" }, {
        "value": "United States",
        "label": "United States"
      }, { "value": "United States Minor Outlying Islands", "label": "United States Minor Outlying Islands" }, { "value": "Uruguay", "label": "Uruguay" }, { "value": "Uzbekistan", "label": "Uzbekistan" }, { "value": "Venezuela", "label": "Venezuela" }, { "value": "Vietnam", "label": "Vietnam" }, { "value": "Virgin Islands (US)", "label": "Virgin Islands (US)" }, { "value": "Yemen", "label": "Yemen" }, { "value": "Zambia", "label": "Zambia" }, { "value": "Zimbabwe", "label": "Zimbabwe" }
    ]
    const { stepNumber, first, last, email, password, confirmPassword, zipcode, city, state, address, country, showPassword, showConfirmPassword, messages, errors } = this.state
    const { message, error, pending } = this.props

    if ( pending ) {
      return (
        <Container fluid className="bg-white signUpPageContainer">
          <div className="contentContainer d-flex justify-content-center">
            <Col className="signUpContainer">
              <div className="spinnerContainer h-100 d-flex align-items-center justify-content-center">
                <RingLoader
                  size={150}
                  color={'#3F89E8'}
                  loading={pending}
                />
              </div>
            </Col>
          </div>
        </Container>
      )
    }

    return (
      <Container fluid className="bg-white signUpPageContainer">
        <div className="contentContainer d-flex justify-content-center">
          <Col className="signUpContainer">
            {!!message &&
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-1 px-0">
              <Alert color={error ? 'danger' : 'success'}>
                {message}
              </Alert>
            </Col>
            }
            {stepNumber === 1 &&
            <Col xl={{ size: 4, offset: 4 }} lg={{ size: 6, offset: 3 }} md={{ size: 4, offset: 4 }} className="justify-content-center d-flex flex-column align-items-center">
              <img src="/assets/images/signUpFirstStepIcon.png" alt="Step 1"/>
              <p className="signUpStepNumber">Step 1 of 2</p>
              <h2 className="signUpHeader">Let's get started.</h2>
              <InputField label='First Name'
                          name="first"
                          type='text'
                          value={first}
                          message=''
                          error={false}
                          handleFieldValueChange={this.handleFieldValueChange}
              />
              <InputField label='Last Name'
                          name="last"
                          type='text'
                          value={last}
                          message=''
                          error={false}
                          handleFieldValueChange={this.handleFieldValueChange}
              />
              <InputField label='Email Address'
                          name="email"
                          type='email'
                          value={email}
                          message={messages.email}
                          error={errors.email}
                          handleFieldValueChange={this.handleFieldValueChange}
              />
              <InputField label='Password'
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          message={messages.password}
                          error={errors.password}
                          addonIcon={showPassword ? "/assets/images/hidePassword.jpg" : "/assets/images/showPassword.jpg"}
                          handleFieldValueChange={this.handleFieldValueChange}
                          onAddonClick={this.onAddonClick}
              />
              <InputField label='Confirm Password'
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          message={messages.confirmPassword}
                          error={errors.confirmPassword}
                          addonIcon={showConfirmPassword ? "/assets/images/hidePassword.jpg" : "/assets/images/showPassword.jpg"}
                          handleFieldValueChange={this.handleFieldValueChange}
                          onAddonClick={this.onAddonClick}
              />
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="d-flex px-0">
                <Button onClick={this.stepOneValidation} className="submitButton w-100">Next Step</Button>
              </Col>
            </Col>
            }
            {stepNumber === 2 &&
            <Col xl={{ size: 4, offset: 4 }} className="justify-content-center d-flex flex-column align-items-center">
              <img src="/assets/images/signUpSecondStepIcon.png" alt="Step 1"/>
              <p className="signUpStepNumber">Step 2 of 2</p>
              <h2 className="signUpHeader">Where are you from?</h2>
              <SelectField label='Country'
                           name="country"
                           value={country}
                           message=''
                           error={false}
                           options={countryOptions}
                           handleFieldValueChange={this.handleFieldValueChange}
              />
              <InputField label='Zip Code'
                          name="zipcode"
                          type='text'
                          value={zipcode}
                          message=''
                          error={false}
                          handleFieldValueChange={this.handleFieldValueChange}
              />
              <InputField label='City'
                          name="city"
                          type='text'
                          value={city}
                          message=''
                          error={false}
                          handleFieldValueChange={this.handleFieldValueChange}
              />
              <InputField label='State'
                          name="state"
                          type='text'
                          value={state}
                          message=''
                          error={false}
                          handleFieldValueChange={this.handleFieldValueChange}
              />
              <InputField label='Address'
                          name="address"
                          type='text'
                          value={address}
                          message=''
                          error={false}
                          handleFieldValueChange={this.handleFieldValueChange}
              />
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="d-flex px-0">
                <Button onClick={this.signUp} className="submitButton w-100">Sign Up</Button>
              </Col>
            </Col>
            }
          </Col>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  signUpData: state.user.signUpData,
  pending: state.user.pending,
  error: state.user.error,
  message: state.user.message
})

const mapDispatchToProps = dispatch => bindActionCreators({ register, reset }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp))
