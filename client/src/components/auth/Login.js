import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';
import {withRouter,useHistory} from 'react-router-dom';

const Login = ({history, auth, setAlert, login}) => {

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/');
    }
    if (auth.error === 'Invalid Credentials') {
      console.log('error invalid credentials')
      setAlert(auth.error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [auth.error, auth.isAuthenticated, history]);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    console.log('onSubmit clicked')
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password
      })
      history.push('/home');
      console.log('login called')
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {setAlert, login})(Login);