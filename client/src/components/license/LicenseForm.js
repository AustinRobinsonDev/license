import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addLicense, updateLicense, clearCurrent } from '../../actions/licenseActions'
const LicenseForm = ({addLicense, updateLicense, license: {current}}) => {
    const [license, setLicense] = useState({
        name: '',
        email: '',
        phone: '',
        type: ''
    });
    const { name, email, phone, type} = license;
    const onChange = e => {
        setLicense({ ...license, [e.target.name]: e.target.value});
    }
    useEffect(() => {
        if(current !== null) {
            setLicense(current);
            console.log(current);
        } else {
            setLicense({        
                name: '',
                email: '',
                phone: '',
                type: ''
            })
        }
    }, [current]);

    const onSubmit = e => {
        e.preventDefault(); 
        if(current === null){
            addLicense(license);

        } else {
            updateLicense(license);
        } 
        clearAll();
    };

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{current ? 'Edit' : 'Add Waypoint'}</h2>
            <input type="text" placeholder="name" name="name" value={name} onChange={onChange}/>
            <input type="text" placeholder="email" name="email" value={email} onChange={onChange}/>
            <input type="text" placeholder="phone" name="phone" value={phone} onChange={onChange}/>
            <input type="text" placeholder="type" name="type" value={type} onChange={onChange}/>
            <h5>License Type</h5>
            <div>
                <input type="submit" value={current ? 'Update' : 'Add License'} className="btn btn-primary btn-block"/>
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
            </div>}
        </form>
    )
}

const mapStateToProps = state => ({
    license: state.license
});

export default connect(mapStateToProps, { addLicense, updateLicense, clearCurrent })(LicenseForm);