import React, {useContext, useRef, useEffect } from 'react';

const LicenseFilter = () => {
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

export default LicenseFilter