import LicenseForm from '../components/license/LicenseForm';
import LicenseFilter from '../components/license/LicenseFilter';
import Licenses from '../components/license/Licenses';
import { connect } from 'react-redux';
import { loadUser } from '../actions/authActions';
import { getLicenses } from '../actions/licenseActions';
import {useEffect, useState} from 'react'
const Home = ({auth, loadUser}) => {
    const [action, setAction] = useState('list')
    useEffect(() => {
        if (auth.isAuthenticated) loadUser();
        getLicenses();
        //eslint-disable-next-line
    }, [action])  
    return (
        <div className='grid-2'>
            <div>
                <LicenseForm 
                action={action}
                setAction={setAction} />
            </div>
            <div>
                <LicenseFilter />
                <Licenses 
                action={action}
                setAction={setAction} />
            </div>
        </div>
    )
}

const mapStateToProps= state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {loadUser})(Home)