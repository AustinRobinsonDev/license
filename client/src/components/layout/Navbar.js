import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import {logout} from '../../actions/authActions';
import {clearLicense} from '../../actions/licenseActions';

const Navbar = ({license: { auth: isAuthenticated, user}}) => {
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
        </>
    )

    const guestLinks = (
        <>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </>
    )
    return (
        <div className='navbar bg-primary'>
            <h1>License Manager{' '}Icon</h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    license: state.license
});

export default connect(mapStateToProps, { logout, clearLicense })(Navbar);