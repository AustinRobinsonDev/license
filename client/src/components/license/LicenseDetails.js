import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getLicenses } from '../../store/actions/licenseActions';
const LicenseDetails = ({ auth, license }) => {
    const { user } = auth;
    const { current, licenses } = license;
    const [localCurrent, setLocalCurrent] = useState(localStorage.getItem('current'));
    useEffect(() => {
        setLocalCurrent(current)
        getLicenses();
    }, [current])
    return (
        <main className='px-2 py-2 license-container'>
            <h1 className='text-center ul'>License Details</h1>
            <section className='user-info'>
                <h2 className='my-1'>License owner: {user && user.fName }{" "}{user && user.lName}</h2>
                <h3 className='my-1'>License owner role:  {user && user.profile}</h3>
                <div>
                    <h4 className='my-1'>Title: { localCurrent.title }</h4>
                    <h4 className='my-1'>Type: { localCurrent.type }</h4>
                    <h4 className='my-1'>Order Id: { localCurrent.orderId }</h4>
                    <h4 className='my-1'>Remaining account balance: { localCurrent.remainingBalance }</h4>
                    <h4 className='my-1'>Has documents: { localCurrent.hasDocuments ? "Yes" : "No" }</h4>
                    <h4 className='my-1'>Date created: {localCurrent.dateCreated && localCurrent.dateCreated.slice(0,10) }</h4>
                </div>
                <div>
                    <h3>Contact</h3>
                    <h4 className='my-1'>First name: { localCurrent.contactFirstName}</h4>
                    <h4 className='my-1'>Last name: { localCurrent.contactLastName }</h4>
                    <h4 className='my-1'>Email address: { localCurrent.emailPrimary }</h4>
                    <h4 className='my-1'>Phone number: { localCurrent.phonePrimary }</h4>
                </div>
                <img className='img-sm' src={localCurrent.image} />
            </section>
        </main>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    license: state.license
});

export default connect(mapStateToProps)(LicenseDetails)