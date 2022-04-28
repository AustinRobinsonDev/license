import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addLicense, updateLicense, clearCurrent } from '../../store/actions/licenseActions';
const LicenseForm = ({ addLicense, updateLicense, license, clearCurrent, setAction, action }) => {
    const [localLicense, setLocalLicense] = useState(license.current);
    const [states, setStates] = useState(["Alabama", "Georgia", "Mississippi", "Florida", "North Carolina"]);
    const [document, setDocument] = useState(null);
    const [show, setShow] = useState(false);
    const [license2, setLicense2] = useState({
        title: '',
        hasDocuments: null, 
        contactFirstName: '',
        contactLastName: '',
        image: '',
        emailPrimary: '',
        phonePrimary: '',
        type: '',
        state: ''
    });

    const { title, hasDocuments, contactFirstName, contactLastName, emailPrimary, phonePrimary, type, state} = license2;
    const onChange = e => {
        setLicense2({ ...license2, image: document, [e.target.name]: e.target.value});
    }
    useEffect(() => {
        console.log("license 2",license2)
        setAction('formRendered')
        setLocalLicense(license.current)
        if(license.current !== null) {
            setLicense2(license.current);
        } 
        if (license.current === null) {
            setLicense2({
                title: '',
                hasDocuments: false, 
                contactFirstName: '',
                contactLastName: '',
                image: '',
                emailPrimary: '',
                phonePrimary: '',
                type: '',
                state: ''
            });
        }
    }, [action, localLicense]);

    const clearAll = () => {
        clearCurrent();
        setLicense2({        
            title: '',
            hasDocuments: false, 
            contactFirstName: '',
            contactLastName: '',
            image: '',
            emailPrimary: '',
            phonePrimary: '',
            type: '',
            state: ''
        })
    }

    const onSubmit = async e => {
        e.preventDefault(); 
        if(license.current === null){
            setAction('added');
            // await convertImg();
            await addLicense(license2);
            clearAll();
            setAction('clear added');
            console.log("onsubmit: ", license2)
        } else {
            setAction('updated');
            await updateLicense(license2);
            clearAll()
            setAction('clear updated');
        } 
    };

    const btnVisibility = () => {
        if (show === false) setShow(true);
        if (show === true) setShow(false);
    }

    // save img
    const saveImage = async e => {
        const file = e.target.files[0];
        const base64Img = await convertBase64(file);
        setDocument(base64Img);
    }
    const convertBase64 = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            if(file) {
            fileReader.readAsDataURL(file);
            }
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const renderInput = () => {
        if (hasDocuments || document) {
            return <input type='file' onChange={(e) => saveImage(e)} />
        } else {
            return <p></p>
        }
    }

    return (
        <>
        <h2 className='text-primary text-center my-1'>{license.current ? 'Edit License' : 'Add New License'}</h2>
        <form className='grid-2' onSubmit={onSubmit}>
            <div className='p-2'>
                <input type="text" required placeholder="License title" name="title" value={title} onChange={onChange}/>
                <input type="text" placeholder="First Name" name="contactFirstName" value={contactFirstName} onChange={onChange}/>
                <input type="text" placeholder="Last Name" name="contactLastName" value={contactLastName} onChange={onChange}/>
                <input type="text" placeholder="Email address" name="emailPrimary" value={emailPrimary} onChange={onChange}/>
                <input type="text" placeholder="Phone Number" name="phonePrimary" value={phonePrimary} onChange={onChange}/>
            </div>
            <div className='p-2'>
                <select style={{marginBottom: '1rem'}} placeholder="State" name="state" value={state} onChange={onChange}>
                    <option value="" defaultValue>State that issued license</option>
                    <option value={states[0]}>{states[0]}</option>
                    <option value={states[1]}>{states[1]}</option>
                    <option value={states[2]}>{states[2]}</option>
                    <option value={states[3]}>{states[3]}</option>
                    <option value={states[4]}>{states[4]}</option>
                </select>
                <h3>Type</h3>
                <div className=''>
                <label style={{ fontSize: '17px'}}>
                Corp{" "}
                    <input type="radio" name="type" value='Corp' onChange={onChange} checked={type ==='Corp'}/>
                </label>
                <label style={{ fontSize: '17px'}}>
                   LLC{" "}
                    <input type="radio" name="type" value='LLC' onChange={onChange} checked={type ==='LLC'}/>
                </label>
                <label style={{ fontSize: '17px'}}>
                  Non-Profit{" "}
                    <input type="radio" name="type" value='Non-Profit' onChange={onChange} checked={type ==='Non-Profit'}/>
                </label>
                </div>
                <h3>Has Documents</h3>
                <label style={{ fontSize: '17px'}}>
                    Yes{" "}
                    <input type="radio" name="hasDocuments" value='true' onChange={onChange} checked={hasDocuments==='true'} />
                </label>
                <label style={{ fontSize: '17px'}}>
                    No{" "}
                    <input type="radio" name="hasDocuments" value='false'onChange={onChange} checked={hasDocuments==='false'}/>
                </label>
                <br />
                <label>
                    {hasDocuments && <p>Documents: </p>}
                    {renderInput()}
                    {document ? <button onClick={() => btnVisibility()}>{show ? "Hide document" : "Show document"}</button> : <p></p>}
                    {show && <img src={document} />}

                </label>
            </div>
            <div className='px-2'>
                <input type="submit" value={license.current ? 'Update' : 'Add License'} className="btn btn-primary btn-block"/>
            </div>
            {license.current && 
                <div className='px-2'>
                    <button style={{color: 'white'}}className="text-white btn btn-dark btn-test btn-block" onClick={() => clearAll()}>Clear</button>
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