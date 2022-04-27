import './App.css';
import setAuthToken from './utils/setAuthToken';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Home from './components/pages/Home';
import Alerts from './components/layout/Alerts';
import About from './components/pages/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Profile from './components/pages/Profile';
import LicenseDetails from './components/license/LicenseDetails';
import NotFound from './components/pages/NotFound'

if (localStorage.token){
  setAuthToken(localStorage.token)
}
const App = ({ auth }) => {
  return (
    <div className='container'>
      <Router>
        <Fragment>
        <Navbar />
        <Alerts />
          <Routes>
            <Route exact 
                path='/' 
                element={
                <PrivateRoute auth={auth}>
                  <Home />
                </PrivateRoute>
            }></Route>
            <Route exact 
                path='/user' 
                element={
                <PrivateRoute auth={auth}>
                  <Profile />
                </PrivateRoute>
            }></Route>
            <Route exact 
                path='/licenseDetails' 
                element={
                <PrivateRoute auth={auth}>
                  <LicenseDetails />
                </PrivateRoute>
            }></Route>
            <Route exact path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App);