import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { logout } from '../../actions/authActions';
import {clearLicense} from '../../actions/licenseActions';

const Navbar = ({history, auth, logout, clearLicense}) => {
    console.log("navbar isauth: " + auth.isAuthenticated);

    const registerLink =(e) => {
        history.push('/register');
    }
    const onLogout = () => {
        logout();
        clearLicense();
    }
    const authLinks = (
        <>
            <li>Hello {auth.user && auth.user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <span className="hide-sm">Logout</span>
                </a>  
            </li>
        </>
    )

    const guestLinks = (
        <>
            <li>
                <Link onClick={() => registerLink()} to='/register'>Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </>
    )
    return (
        <div className='navbar bg-primary'>
            <h1>License Manager{' '}Icon</h1>
            <ul>
                {auth.isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout, clearLicense })(Navbar);