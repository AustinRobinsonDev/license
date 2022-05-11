import { connect } from 'react-redux';
import { loadUser } from '../../store/actions/authActions';
import { clearCurrent } from '../../store/actions/licenseActions';
import { useEffect, useState } from 'react';
import { loading } from '../layout/Loading';
import Modal from '../modals/Modal';
import LicenseForm from '../license/LicenseForm';
import LicenseFilter from '../license/LicenseFilter';
import Licenses from '../license/Licenses';
const Home = ({ auth, loadUser, clearCurrent, license }) => {

    const [action, setAction] = useState('list');
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [selectMultiple, setSelectMultiple] = useState(false);
    const [deleteList, setDeleteList] = useState([]);
    useEffect(() => {
        console.log(deleteList)
        window.onpopstate = () => {
            clearCurrent();
          }
        if (auth.isAuthenticated) loadUser();
        //eslint-disable-next-line
    }, [action, deleteId, selectMultiple])  
    if (auth.loading) {
        return (
            <div className='loading-container'>{loading()}</div>
            );
    }
    if (showModal) {
        return (
            <Modal setAction={setAction} setShowModal={setShowModal} deleteId={deleteId} />
        )
    }
    return (
        <>  
            <div className='container px-3'>
                <div>
                    <LicenseForm 
                    action={action}
                    setAction={setAction} />
                </div>
            </div>
            <hr className='m-2'/>    
             <div className='px-3'>
                <LicenseFilter selectMultiple={selectMultiple} setSelectMultiple={setSelectMultiple} />
                <Licenses 
                    selectMultiple={selectMultiple}
                    setShowModal={setShowModal}
                    setDeleteId={setDeleteId}
                    deleteList={deleteList}
                    setDeleteList={setDeleteList}
                    action={action}
                    setAction={setAction} />
            </div>
        </>
    )
}

const mapStateToProps= state => ({
    auth: state.auth,
    license: state.license
});

export default connect(mapStateToProps, { loadUser, clearCurrent })(Home)