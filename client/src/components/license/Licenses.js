import React, { useEffect, useState } from 'react';
import { getLicenses } from '../../actions/licenseActions'
import { connect } from 'react-redux';
import LicenseItem from '../license/LicenseItem';

import { CSSTransition, TransitionGroup} from 'react-transition-group';
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
        return <h4>Please add a contact</h4>
    }

    return (
            <>
              {license.licenses !== null && !auth.loading ? (
              <TransitionGroup>
                {license.filtered !== null
                  ? license.filtered.map(license => (
                      <CSSTransition
                        key={license._id}
                        timeout={500}
                        classNames='item'
                      >
                        <LicenseItem setAction={setAction} action={action} licenseItem={license} />
                      </CSSTransition>
                    ))
                  : license.licenses.map(license=> (
                      <CSSTransition
                        key={license._id}
                        timeout={500}
                        classNames='item'
                      >
                        <LicenseItem  setAction={setAction} action={action} licenseItem={license} />
                      </CSSTransition>
                    ))}
              </TransitionGroup>
            ) : (
              <div></div>
            )}
          </>
    )
}

const mapStateToProps = state => ({
  license: state.license,
  auth: state.auth
});

export default connect(mapStateToProps, {getLicenses})(Licenses);