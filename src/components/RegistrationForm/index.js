import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    showErrorFirstName: false,
    showErrorLastName: false,
    submitted: false,
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
      showErrorFirstName: false,
      showErrorLastName: false,
    })
  }

  onSubmitSuccess = () => {
    this.setState({submitted: true})
  }

  validateSubmit = () => {
    const {firstname, lastname} = this.state
    const showErrorFirstName = firstname === ''
    const showErrorLastName = lastname === ''

    this.setState({
      showErrorFirstName,
      showErrorLastName,
    })

    return !(showErrorFirstName || showErrorLastName)
  }

  handleBlur = field => {
    const {firstname, lastname} = this.state
    let showErrorFirstName = false
    let showErrorLastName = false

    if (field === 'firstname') {
      showErrorFirstName = firstname === ''
    } else if (field === 'lastname') {
      showErrorLastName = lastname === ''
    }

    this.setState({
      showErrorFirstName,
      showErrorLastName,
    })
  }

  submitForm = event => {
    event.preventDefault()

    if (this.validateSubmit()) {
      this.onSubmitSuccess()
    }
  }

  renderInputField = (
    label,
    type,
    id,
    value,
    onChange,
    placeholder,
    showError,
  ) => (
    <>
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`text-input-field ${showError ? 'error' : ''}`}
        value={value}
        onChange={e => onChange(id, e.target.value)}
        onBlur={() => this.handleBlur(id)}
        placeholder={placeholder}
      />
      {showError && <p className="error-message">Required</p>}
    </>
  )

  renderForm = () => {
    const {
      submitted,
      firstname,
      lastname,
      showErrorFirstName,
      showErrorLastName,
    } = this.state

    if (submitted) {
      return (
        <div className="submit-another-response-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
            alt="success"
            className="tick-image"
          />
          <p>Submitted successfully!</p>
          <button
            type="button"
            className="submit-another-response"
            onClick={() =>
              this.setState({
                submitted: false,
                firstname: '',
                lastname: '',
              })
            }
          >
            Submit another Response
          </button>
        </div>
      )
    }

    return (
      <form className="form-container" onSubmit={this.submitForm}>
        <div className="input-container">
          {this.renderInputField(
            'FIRST NAME',
            'text',
            'firstname',
            firstname,
            this.handleInputChange,
            'First Name',
            showErrorFirstName,
          )}
        </div>
        <div className="input-container">
          {this.renderInputField(
            'LAST NAME',
            'text',
            'lastname',
            lastname,
            this.handleInputChange,
            'Last Name',
            showErrorLastName,
          )}
        </div>
        <button type="submit" className="login-button">
          Submit
        </button>
      </form>
    )
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Registration</h1>
        <div className="registration-form-container">{this.renderForm()}</div>
      </div>
    )
  }
}

export default RegistrationForm
