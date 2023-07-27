import {Route, Routes} from 'react-router-dom'

import Login from './components/Login'
// import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'

import './App.css'

// Replace your code here
const App = () => (
  <Routes>
    <Route exact path="/ebank/login" element={<Login />} />
    <Route exact path="/" element={<Home />} />
  </Routes>
)

export default App
