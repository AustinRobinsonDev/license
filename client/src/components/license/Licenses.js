import React, { useEffect } from 'react';
import { getLicenses } from '../../actions/licenseActions'
import { connect } from 'react-redux';
import LicenseItem from '../license/LicenseItem';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

const Licenses = ({license, auth, getLicenses}) => {
    useEffect(() => {
        getLicenses();
        //eslint-disable-next-line
    },[])
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
                  <LicenseItem license={license} />
                </CSSTransition>
              ))
            : license.licenses.map(license=> (
                <CSSTransition
                  key={license._id}
                  timeout={500}
                  classNames='item'
                >
                  <LicenseItem license={license} />
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