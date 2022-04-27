import LicenseForm from '../components/license/LicenseForm';
import LicenseFilter from '../components/license/LicenseFilter';
import Licenses from '../components/license/Licenses';
import { connect } from 'react-redux';
import { loadUser } from '../store/actions/authActions';
import { clearCurrent } from '../store/actions/licenseActions';
import { useEffect, useState } from 'react'
const Home = ({ auth, loadUser, clearCurrent, license }) => {
    const [action, setAction] = useState('list');
    useEffect(() => {
        if (auth.isAuthenticated) loadUser();
        //eslint-disable-next-line
    }, [action])  
    return (
        <>
            <div className='container px-3'>
                <div>
                    <LicenseForm 
                    action={action}
                    setAction={setAction} />
                </div>
            </div>
            <hr className='m-2'/>
            <div className='px-3'>
                <LicenseFilter />
                <Licenses 
                    action={action}
                    setAction={setAction} />
            </div>
        </>
    )
}

const mapStateToProps= state => ({
    auth: state.auth,
    license: state.license
});

export default connect(mapStateToProps, { loadUser, clearCurrent })(Home)