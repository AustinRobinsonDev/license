import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLicenses } from '../../store/actions/licenseActions';
const LicenseDetails = ({ auth, license }) => {
    const { user } = auth;
    const { current, licenses } = license;
    useEffect(() => {
        getLicenses();
    }, [current])
    return (
        <main className='px-2 py-2 user-container'>
            <h1 className='text-center ul'>License Details</h1>
            <section className='user-info'>
                <h2 className='my-1'>{user && user.fName }{" "}{user && user.lName}</h2>
                <h3 className='my-1'>{user && user.profile}</h3>
                <div>
                    <h4 className='my-1'>Title: { current.title }</h4>
                    <h4 className='my-1'>Type: { current.type }</h4>
                    <h4 className='my-1'>Order Id: { current.orderId }</h4>
                    <h4 className='my-1'>Remaining account balance: { current.remainingBalance }</h4>
                    <h4 className='my-1'>Has documents: { current.hasDocuments ? "Yes" : "No" }</h4>
                    <h4 className='my-1'>Date created: { current.dateCreated }</h4>
                </div>
                <div>
                    <h3>Contact</h3>
                    <h4 className='my-1'>First name: { current.contactFirstName}</h4>
                    <h4 className='my-1'>Last name: { current.contactLastName }</h4>
                    <h4 className='my-1'>Email address: { current.emailPrimary }</h4>
                    <h4 className='my-1'>Phone number: { current.phonePrimary }</h4>
                </div>
            </section>
        </main>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    license: state.license
});

export default connect(mapStateToProps)(LicenseDetails)