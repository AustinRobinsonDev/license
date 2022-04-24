import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alertActions';
import { clearErrors, register } from '../../store/actions/authActions';
import { useNavigate } from "react-router-dom";

const Register = ({ auth, setAlert, clearErrors, register}) => {
    let navigate = useNavigate();

    useEffect(() => {
        if(auth.error === 'User already exists'){
            setAlert(auth.error, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    },[auth.error])

    const [user, setUser] = useState({
        fName: '',
        lName: '',
        profile: '',
        mailingAddr: '',
        billingAddr: '',
        email: '',
        password: '',
        password2: ''
    });

    const onChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }
    const {fName, lName, profile, mailingAddr, billingAddr, email, password, password2} = user;
    const onSubmit = async e => {
        e.preventDefault();
        if(fName === '' ||  email === '' || billingAddr === '' || password === '') {
            setAlert('Please Enter All Fields');
        } else if (password !== password2) {
            setAlert('Passwords do not match')
        } else {
            await register({
                fName,
                lName,
                profile,
                mailingAddr,
                billingAddr,
                email,
                password
            })
            navigate("/")
        }
    }

    return (
        <div className='form-container'>
            <h1>Account <span className="text-primary">Register</span></h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">First Name</label>
                    <input type="text" name='fName' value={fName} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="name">Last Name</label>
                    <input type="text" name='lName' value={lName} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="name">Profile</label>
                    <input type="text" name='profile' value={profile} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="name">Mailing Address</label>
                    <input type="text" name='mailingAddr' value={mailingAddr} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="name">Billing Address</label>
                    <input type="text" name='billingAddr' value={billingAddr} onChange={onChange} />
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