import {useEffect, useState} from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Home from './pages/Home';
//import Alert from './components/layout/Alert';
import About from './pages/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import setAuthToken from './utils/setAuthToken';
import { Fragment } from 'react';
import { connect } from 'react-redux';

if (localStorage.token){
  setAuthToken(localStorage.token)
} 
const App = ({auth}) => {
  return (
    <div className='container'>
      <Router>
        <Fragment>
        <Navbar />
          <Routes>
            <Route exact 
                path='/' 
                element={
                <PrivateRoute auth={auth}>
                  <Home />
                </PrivateRoute>
            }>
            </Route>
            <Route exact path='/login' element={<Login />}/>
            <Route path='/about' element={<About />} />
            <Route path='/register' element={<Register />} />
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