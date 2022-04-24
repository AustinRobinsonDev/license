import React, {useRef, useEffect } from 'react';
import { clearFilter, filterLicenses } from '../../store/actions/licenseActions'
import { connect } from 'react-redux';

const LicenseFilter = ({clearFilter, filterLicenses, license}) => {
    const text = useRef('');
    useEffect(() => {
        if (license.filtered === null) {
            text.current.value = ''
        }
    },[license])
    const onChange = e => {
        if(text.current.value !== '') {
            filterLicenses(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <form>
            <h3 className='text-center'>Filter Licenses</h3>
                <input style={{maxWidth: '400px', margin: '0 auto'}} ref={text} type="text" placeholder="Type something..." onChange={onChange}/>
        </form>
    )
}

const mapStateToProps = state => ({
    license: state.license
});

export default connect(mapStateToProps, { clearFilter, filterLicenses })(LicenseFilter);