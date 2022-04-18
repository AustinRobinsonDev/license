import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const Navbar = ({ title, icon }) => {
    const onLogout = () => {
        logout();
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
            <h1>{title}{' '}{icon}</h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element
}

Navbar.defaultProps = {
    title: 'License System',
    icon: <FontAwesome className="fa-solid fa-map" name="map"/>
}

export default Navbar;