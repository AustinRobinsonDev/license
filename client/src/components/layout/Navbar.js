import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { logout, loadUser } from '../../actions/authActions';
import {clearLicense} from '../../actions/licenseActions';
import {useEffect} from 'react'
const Navbar = ({ auth, logout, clearLicense, loadUser }) => {
    const getUser = () => loadUser();
    const {user} = auth;
    const onLogout = () => {
        logout();
        clearLicense();
    }
    const authLinks = (
        <>
            <li>Hello {user && user.name}</li> 
            <li>
                <a onClick={onLogout} href="#!">
                    <span className="hide-sm">Logout</span>
                </a>  
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <Link to='/'>Home</Link>
            </li>
        </>
    )

    const guestLinks = (
        <>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
        </>
    )
    const renderNav = () => {
        return auth.isAuthenticated ? authLinks : guestLinks;
    }
    useEffect(() => {
        if (auth.isAuthenticated || !auth.user) getUser();
        renderNav();
    }, [auth.isAuthenticated])  
    console.log("navbar auth: " + auth.isAuthenticated)
    console.log("navbar user: " + auth.user)

    return (
        <div className='navbar bg-primary'>
            <h1>License Manager{' '}Icon</h1>
            <ul>
                {renderNav()}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout, clearLicense, loadUser })(Navbar);