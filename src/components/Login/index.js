import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {
  LoginFormContainer,
  FormContainer,
  InputContainer,
  InputCheck,
  LoginButton,
  LoginWebsiteLogo,
  ErrorMessage,
  UserNameInputField,
  PasswordInputField,
  InputLabel,
  CheckboxInput,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    onSubmitMsg: false,
    errorMsg: '',
  }

  onSubmitFailure = errorMsg => {
    this.setState({onSubmitMsg: true, errorMsg})
  }

  onchangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  onsubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onsubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, onSubmitMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <LoginFormContainer>
        <FormContainer onSubmit={this.onSubmitForm}>
          <LoginWebsiteLogo
            className="netflix-logo "
            alt="img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          />
          <InputContainer>
            <InputLabel htmlFor="user">UserName</InputLabel>
            <UserNameInputField
              type="text"
              id="user"
              value={username}
              onChange={this.onchangeUserName}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="pass">Password</InputLabel>
            <PasswordInputField
              className="input-box"
              type="password"
              id="pass"
              value={password}
              onChange={this.onchangePassword}
            />
          </InputContainer>
          <InputCheck>
            <CheckboxInput id="name" type="checkbox" />
            <InputLabel htmlFor="name">show password</InputLabel>
          </InputCheck>
          <LoginButton className="login-btn" type="submit">
            Login
          </LoginButton>
          {onSubmitMsg && <ErrorMessage>*{errorMsg}</ErrorMessage>}
        </FormContainer>
      </LoginFormContainer>
    )
  }
}

export default Login
