import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addLicense, updateLicense, clearCurrent } from '../../actions/licenseActions';
const LicenseForm = ({ addLicense, updateLicense, license, clearCurrent, setAction, action }) => {
    const [license2, setLicense2] = useState({
        name: '',
        email: '',
        phone: '',
        type: ''
    });
    const { name, email, phone, type} = license2;
    const onChange = e => {
        setLicense2({ ...license2, [e.target.name]: e.target.value});
    }
    useEffect(() => {
        if(license.current !== null) {
            setLicense2(license.current);
        } 
    }, [ setLicense2, action]);
    const clearAll = () => {
        clearCurrent();
        setLicense2({        
            name: '',
            email: '',
            phone: '',
            type: ''
        })
    }

    const onSubmit = async e => {
        e.preventDefault(); 
        if(license.current === null){
            setAction('added');
            await addLicense(license2);
            clearAll();
            setAction('clear added');
        } else {
            setAction('updated');
            await updateLicense(license2);
            clearAll()
            setAction('clear updated');
        } 
    };

    return (
        <>
        <h2 className='text-primary text-center'>{license.current ? 'Edit License' : 'Add New License'}</h2>

        <form className='grid-2' onSubmit={onSubmit}>
            <div className='p-2'>
                <input type="text" placeholder="name" name="name" value={name} onChange={onChange}/>
                <input type="text" placeholder="email" name="email" value={email} onChange={onChange}/>
                <input type="text" placeholder="phone" name="phone" value={phone} onChange={onChange}/>
                <input type="text" placeholder="type" name="type" value={type} onChange={onChange}/>
                <h5>License Type</h5>
            </div>
            <div className='p-2'>
                <input type="text" placeholder="name" name="name" value={name} onChange={onChange}/>
                <input type="text" placeholder="email" name="email" value={email} onChange={onChange}/>
                <input type="text" placeholder="phone" name="phone" value={phone} onChange={onChange}/>
                <input type="text" placeholder="type" name="type" value={type} onChange={onChange}/>
                <h5>License Type</h5>
            </div>
            <div>
                <input type="submit" value={license.current ? 'Update' : 'Add License'} className="btn btn-primary btn-block"/>
            </div>
            {license.current && 
                <div>
                    <button style={{color: 'white'}}className="text-white btn btn-light btn-test btn-block" onClick={() => clearAll()}>Clear</button>
                </div>
            }
        </form>
    </>
    )
}

const mapStateToProps = state => ({
    license: state.license
});

export default connect(mapStateToProps, { addLicense, updateLicense, clearCurrent })(LicenseForm);