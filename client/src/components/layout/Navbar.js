import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { logout, loadUser } from '../../store/actions/authActions';
import {clearLicense} from '../../store/actions/licenseActions';
import {useEffect} from 'react'
const Navbar = ({ auth, logout, clearLicense, loadUser }) => {
    const getUser = () => loadUser();
    const {user} = auth;
    const onLogout = () => {
        logout();
        clearLicense();
    }
    // const fixName = () => {
    //     let capNames = user.name.split(" ")
    //     let newArray;
    //     capNames.forEach(name => {
    //        newArray.push(name.charAt(0).toUpperCase() + user.name.slice(1));
    //     })
    //   //  return newArray[0] + " " + newArray[1]

    // }
    const authLinks = (
        <>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/about'>About</Link>
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
            <h1 className='text-light'>License Manager</h1>
            <h2 style={{paddingRight: '2rem'}}>{user && "Hello " + user.fName.charAt(0).toUpperCase() + user.fName.slice(1) + " " +  user.lName.charAt(0).toUpperCase() + user.lName.slice(1) + " "}</h2> 
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