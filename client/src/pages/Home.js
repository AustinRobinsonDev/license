import LicenseForm from '../components/license/LicenseForm';
import LicenseFilter from '../components/license/LicenseFilter';
import Licenses from '../components/license/Licenses';
import { connect } from 'react-redux';
import { loadUser } from '../actions/authActions';
import {useEffect} from 'react'
const Home = ({auth, loadUser}) => {
    useEffect(() => {
        if (auth.isAuthenticated) loadUser();
    }, [auth.isAuthenticated])  
    return (
        <div className='grid-2'>
            <div>
                <LicenseForm />
            </div>
            <div>
                <LicenseFilter />
                <Licenses />
            </div>
        </div>
    )
}

const mapStateToProps= state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {loadUser})(Home)