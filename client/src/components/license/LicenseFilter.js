import React, {useRef, useEffect } from 'react';
import { clearFilter, filterLicenses } from '../../store/actions/licenseActions'
import { connect } from 'react-redux';

const LicenseFilter = ({setSelectMultiple, selectMultiple, clearFilter, filterLicenses, license}) => {
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

    const selectBtn = () => {
        if (selectMultiple) {
            setSelectMultiple(false)
        } else {
            setSelectMultiple(true)
        }
        console.log(selectMultiple)
    }

    return (
        <section className='flex-form-container px-1'>

            <form>
                    <input style={{minWidth: '500px', margin: '0 auto 20px'}} ref={text} type="text" placeholder="Filter licenses..." onChange={onChange}/>
            </form>
            <div className='box'>
                <button style={{margin: '1.2rem 0'}} className='btn' onClick={() => selectBtn()}>Select Multiple</button>
                {selectMultiple && <button style={{margin: '1.2rem 0'}} className='btn btn-danger'>Delete Selected</button>}
            </div>

        </section>

    )
}

const mapStateToProps = state => ({
    license: state.license
});

export default connect(mapStateToProps, { clearFilter, filterLicenses })(LicenseFilter);