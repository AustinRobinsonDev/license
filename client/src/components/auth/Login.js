import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';
const Login = ({history, license: { auth: isAuthenticated, error }}) => {
  console.log(isAuthenticated)
  console.log(error)

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    if (error === 'Invalid Credentials') {
      console.log('error invalid credentials')
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);
  const [user1, setUser1] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user1;

  const onChange = e => setUser1({ ...user1, [e.target.name]: e.target.value });

  const onSubmit = e => {
    console.log('onSubmit clicked')
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password
      });
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
  license: state.license
});

export default connect(mapStateToProps, {setAlert, login})(Login);