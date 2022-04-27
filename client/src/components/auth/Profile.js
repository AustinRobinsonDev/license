import { connect } from 'react-redux';
import { loadUser } from '../../store/actions/authActions';
import avatar from '../layout/avatar.png'
const Profile = ({ auth, license }) => {
    const { user } = auth;
    const { licenses } = license;
    return (
        <main className='px-2 py-2 user-container'>
            <h1 className='text-center ul my-2'>User information</h1>
            <section className='user-info'>
                <img className='round-img img-sm' src={avatar} alt="" />
                <h2 className='my-1'>{user && user.fName }{" "}{user && user.lName}</h2>
                <h3 className='my-1'>Role: {user && user.profile}</h3>
                {user.mailingAddr && <h4 className='my-1'>Mailing Address: {user.mailingAddr}</h4>}
                {user.billingAddr && <h4 className='my-1'>Billing Address: {user.billingAddr}</h4>}
                <h4 className='my-1'>Current number of licenses: { licenses.length }</h4>
            </section>
        </main>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    license: state.license
});

export default connect(mapStateToProps, { loadUser })(Profile)
