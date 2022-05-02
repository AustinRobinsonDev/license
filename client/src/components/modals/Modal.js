import React from 'react';
import { connect } from 'react-redux';
import "./Modal.css";
import { deleteLicense } from '../../store/actions/licenseActions';
import { setAlert } from '../../store/actions/alertActions';
const Modal = ({ setAction, deleteId, setShowModal, deleteLicense, setAlert }) => {
    const onDelete = async () => {
        setAction('deleting')
        setShowModal(false);
        await deleteLicense(deleteId);
        setAlert('deleted', 'danger');
        setAction('deleted')
    }
  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
        <div className='titleCloseBtn'>
            <button onClick={() => setShowModal(false)}>X</button>
        </div>
            <div className='body'>            
                <h3>Are you sure you want to delete {deleteId}?</h3>
            </div>
            <div className='footer'>
                <button onClick={() => onDelete()} id='deleteBtn'>Delete</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
        </div>

    </div>
  )
}

const mapStateToProps = state => ({
    license: state.license
})

export default connect(mapStateToProps, { deleteLicense, setAlert })(Modal)