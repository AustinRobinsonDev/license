import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, loadUser } from '../../store/actions/authActions';
import { clearLicense, clearCurrent } from '../../store/actions/licenseActions';
import { useEffect } from 'react';
const Navbar = ({ auth, logout, clearLicense, loadUser, clearCurrent }) => {
    const getUser = () => loadUser();
    const { user } = auth;
    const onLogout = () => {
        logout();
        clearLicense();
    }
    const authLinks = (
        <>
            <li>
                <Link to='/' onClick={() => clearCurrent()}>Home</Link>
            </li>
            <li>
                <Link to='/user' onClick={() => clearCurrent()}>Profile</Link>
            </li>
            <li>
                <Link to='/about' onClick={() => clearCurrent()}>About</Link>
            </li>
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

    return (
        <div className='navbar bg-primary'>
        <Link to={'/'}><h1 className='text-dark'>License Manager</h1></Link>
            <h2 className='text-center p-2'>{user && "Hello " + user.fName.charAt(0).toUpperCase() + user.fName.slice(1) + " " +  user.lName.charAt(0).toUpperCase() + user.lName.slice(1) + " "}</h2> 
            <ul>
                {renderNav()}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout, clearLicense, loadUser, clearCurrent })(Navbar);