import {Navigate, useNavigate} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Home = () => {
  const navigate = useNavigate()
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Navigate replace to="/ebank/login" />
  }

  const logoutButton = () => {
    Cookies.remove('jwt_token')
    navigate('/ebank/login')
  }

  return (
    <div className="home-container">
      <div className="logo-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button type="button" onClick={logoutButton} className="logoutButton">
          Logout
        </button>
      </div>
      <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
      />
    </div>
  )
}

export default Home
