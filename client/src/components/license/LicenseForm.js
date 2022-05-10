import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alertActions';
import { addLicense, updateLicense, clearCurrent } from '../../store/actions/licenseActions';
const LicenseForm = ({ setAlert, addLicense, updateLicense, license, clearCurrent, setAction, action }) => {
    const [localLicense, setLocalLicense] = useState(license.current)
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
    const { title, hasDocuments, image, contactFirstName, contactLastName, emailPrimary, phonePrimary, type, state} = license2;
    const onChange = e => {
        setLicense2({ ...license2, [e.target.name]: e.target.value});
    }

    useEffect(() => {
 //       setAction('formRendered')
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
            await addLicense(license2);
            clearAll();
            setAction('License added');
            setAlert("Added successfully", "success");
            console.log("object sent to add license: ", + license2)
        } else {
            setAction('updated');
            await updateLicense(license2);
            clearAll()
            setAction('clear updated');
        } 
    };

    const btnVisibility = (e) => {
        e.preventDefault();
        setShow(!show);
    }

    // save img as base64 for Buffer
    const saveImage = async e => {
        e.preventDefault();
        const file = e.target.files[0];
        const base64Img = await convertBase64(file);
        setDocument(base64Img);
        console.log("base64 img: " + document)
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

    // const renderInput = () => {
    //     if (hasDocuments || document) {
    //         return <input type='file' onChange={(e) => saveImage(e)} />
    //     } else {
    //         return <p></p>
    //     }
    // }

    return (
        <>
        <h2 className='text-primary text-center my-1'>{license.current ? 'Edit License' : 'Add New License'} </h2> 

        <form className='grid-2' onSubmit={onSubmit}>
            <div className='p-2'>
                <input type="text" required placeholder="License title" name="title" value={title} onChange={onChange}/>
                <input type="text" placeholder="First Name" name="contactFirstName" value={contactFirstName} onChange={onChange} required/>
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
                    <p>Documents: </p>
                    <input type='file' onChange={(e) => saveImage(e)} />
                    {document ? <button onClick={(e) => btnVisibility(e)}>{show ? "Hide document" : "Show document"}</button> : <p></p>}
                </label>
                {show && <img className='img-sm' src={document} />}

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

export default connect(mapStateToProps, { addLicense, updateLicense, clearCurrent, setAlert })(LicenseForm);