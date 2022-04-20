import React, {useRef, useEffect } from 'react';
import { clearFilter, filterLicenses } from '../../actions/licenseActions'
import { connect } from 'react-redux';

const LicenseFilter = ({clearFilter, filterLicenses, license: {filtered}}) => {
    const text = useRef('');
    useEffect(() => {
        if (filtered === null) {
            text.current.value = ''
        }
    })
    const onChange = e => {
        if(text.current.value !== '') {
            filterLicenses(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <form>
            <input ref={text}type="text" placeholder="filter licenses" onChange={onChange}/>
        </form>
    )
}

const mapStateToProps = state => ({
    license: state.license
});

export default connect(mapStateToProps, { clearFilter, filterLicenses })(LicenseFilter);