import React, { useEffect, useState } from 'react';
import { getLicenses } from '../../store/actions/licenseActions'
import { connect } from 'react-redux';
import LicenseItem from '../license/LicenseItem';
import { loading } from '../layout/Loading';
const Licenses = ({ setAction, action, license, auth, getLicenses}) => {
    const [licenseList, setLicenseList] = useState([]);
    const getAllLicenses = async () => {
      const allLicenses = await getLicenses();
      if (allLicenses) setLicenseList(allLicenses);
    }
    useEffect(() => {
        getAllLicenses();
        //eslint-disable-next-line
    },[action])
    if (license.licenses !== null && license.licenses.length === 0 && !auth.loading){
        return <h4 style={{marginBottom: '40px'}} className='my-2 text-center'>Please add a license</h4>
    }

    return (
            <div className='grid-4 container flex-container p-1 licenses-container'>
              {license.licenses !== null && !auth.loading ? (
                license.filtered !== null
                  ? license.filtered.map(license => (
                        <LicenseItem key={license._id} setAction={setAction} action={action} licenseItem={license} />
                    ))
                  : license.licenses.map(license=> (
                        <LicenseItem key={license._id} setAction={setAction} action={action} licenseItem={license} />
                    ))
            ) : (
              <p></p>
            )}
          </div>
    )
            
}

const mapStateToProps = state => ({
  license: state.license,
  auth: state.auth
});

export default connect(mapStateToProps, {getLicenses})(Licenses);