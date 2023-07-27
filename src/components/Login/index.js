import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Login = () => {
  const navigate = useNavigate()
  const token = Cookies.get('jwt_token')

  const [details, setDetails] = useState({username: '', password: ''})

  const [error, setError] = useState({isError: false, errorMsg: ''})

  const getUsername = event => {
    setDetails(prevState => ({
      ...prevState,
      username: event.target.value,
    }))
  }

  const getPassword = event => {
    setDetails(prevState => ({
      ...prevState,
      password: event.target.value,
    }))
  }

  const verifyUser = async event => {
    event.preventDefault()

    const api = 'https://apis.ccbp.in/ebank/login'

    const userBody = {
      user_id: details.username,
      pin: details.password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userBody),
    }

    const response = await fetch(api, options)
    const data = await response.json()

    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})

      navigate('/')
    } else {
      setError(prevState => ({
        ...prevState,
        errorMsg: data.error_msg,
        isError: true,
      }))
    }
  }

  if (token !== undefined) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="app-container">
      <div className="img-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          alt="website login"
          className="image"
        />
        <form className="form-container" onSubmit={verifyUser}>
          <h1 className="main-heading">Welcome Back!</h1>
          <label className="label" htmlFor="userId">
            USER ID
          </label>
          <input
            onChange={getUsername}
            value={details.username}
            placeholder="Enter User ID"
            className="user-input"
            type="text"
            id="userId"
          />
          <label className="label" htmlFor="pin">
            PIN
          </label>
          <input
            value={details.password}
            onChange={getPassword}
            placeholder="Enter PIN"
            className="user-input"
            type="text"
            id="pin"
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {error.isError && <p className="error">{error.errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
