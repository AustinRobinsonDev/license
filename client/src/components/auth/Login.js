import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../store/actions/authActions';
import { setAlert } from '../../store/actions/alertActions';
import { useNavigate } from "react-router-dom";

const Login = ({auth, setAlert, login}) => {

  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  useEffect(() => {
    if (auth.error === 'Invalid Credentials') {
      setAlert(auth.error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [auth.error]);
  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      console.log("Login component isAuth: " + auth.isAuthenticated)
      await login({
        email,
        password
      })
      navigate("/")
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

export default connect(mapStateToProps, { setAlert, login })(Login);