import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { clearErrors, register } from '../../actions/authActions';

const Register = ({ history, auth, setAlert, clearErrors, register}) => {

    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push('/');
        }
        if(auth.error === 'User already exists'){
            setAlert(auth.error, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    },[auth.error, auth.isAuthenticated, history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const onChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === '') {
            setAlert('Please Enter All Fields');
        } else if (password !== password2) {
            setAlert('Passwords do not match')
        } else {
            console.log("User data: ", {name, email, password})
            register({
                name,
                email,
                password
            })
        }
    }

    const { name, email, password, password2 } = user;
    return (
        <div className='form-container'>
            <h1>Account <span className="text-primary">Register</span></h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' value={name} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={email} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" minLength="6" name='password' value={password} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password"  minLength="6" name='password2' value={password2} onChange={onChange} />
                </div>
                <input type="submit" value="register" className="btn btn-primary btn-block" />
            </form>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { clearErrors, setAlert, register })(Register);