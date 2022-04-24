import {useEffect} from 'react'
import { connect } from 'react-redux';
import { loadUser } from '../../store/actions/authActions';

const Profile = ({auth, loadUser}) => {
    console.log('profile auth: ', JSON.stringify(auth))
    const {user} = auth;
    return (
        <div className='px-2 py-2'>
            <h1 className='my-1 avatar '>Avatar</h1>
            <h2 className='my-1'>{user && user.fName }{" "}{user && user.lName}</h2>
            <h3 className='my-1'>{user && user.profile}</h3>
            <h4 className='my-1'>Number of licenses by type?</h4>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(Profile)
