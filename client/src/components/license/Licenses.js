import React, { Fragment, useContext, useEffect, useState } from 'react';
import { getLicenses } from '../../actions/licenseActions'
import { connect } from 'react-redux';
import LicenseItem from '../license/LicenseItem';
// import Spinner from '../layout/Spinner';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

const Licenses = ({license: {licenses, loading, filtered}}) => {
    useEffect(() => {
        getLicenses();
        //eslint-disable-next-line
    },[])
    if (licenses !== null && licenses.length === 0 && !loading){
        return <h4>Please add a contact</h4>
    }
    return (
        <>
        {licenses !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(license => (
                <CSSTransition
                  key={license._id}
                  timeout={500}
                  classNames='item'
                >
                  <LicenseItem license={license} />
                </CSSTransition>
              ))
            : licenses.map(license=> (
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
        <Spinner />
      )}
    </>
    )
}

const mapStateToProps = state => ({
  license: state.license
});

export default connect(mapStateToProps, {getLicense})(Licenses);