import React, {useContext, useRef, useEffect } from 'react';
import { clearFilter, filterLicenses } from '../../actions/licenseActions'
import { connect } from 'react-redux';

const LicenseFilter = ({licenses: {filtered, }}) => {
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

const mapStateToProps = state = ({
    licenses: state.licenses
});

export default connect(mapStateToProps, { clearFilter, filterLicenses })(LicenseFilter);