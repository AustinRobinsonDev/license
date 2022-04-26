import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { deleteLicense, clearCurrent, setCurrent } from '../../store/actions/licenseActions'
import { connect } from 'react-redux';
const LicenseItem = ({setAction, deleteLicense, clearCurrent, setCurrent, licenseItem }) => {
    const onDelete = async () => {
        setAction('delete');
        await deleteLicense(licenseItem._id);
        clearCurrent();
        setAction('clear delete');
    }
    const onEdit = async () => {
        setAction('setting current')
        await setCurrent(licenseItem);
        setAction('current set');
    }
    const moreInfo = async () => {
        setAction('setting current')
        await setCurrent(licenseItem);
        setAction('current set');
    }

    return (
        <div className="card bg-dark">
           <h3 className="text-primary text-left">
               {licenseItem.title}{' '} 
               <span style={{ float: 'right'}}
                className={'badge ' + (licenseItem.type === 'Corp' ? 'badge-success' : 'badge-primary')}>{licenseItem.type && licenseItem.type.charAt(0).toUpperCase() + licenseItem.type.slice(1)}
               </span>
           </h3> 
           <ul className="list text-primary">
               {licenseItem.contactFirstName && 
               (<li>
                    {licenseItem.contactFirstName}{" "}{licenseItem.contactLastName ? licenseItem.contactLastName : ""}
               </li>)}
               {licenseItem.phonePrimary && 
               (<li>
                    {licenseItem.phonePrimary}
               </li>)}
               {licenseItem.emailPrimary && 
               (<li>
                    {licenseItem.emailPrimary}
               </li>)}
               {licenseItem.hasDocuments ? 
               (<li>
                    <p>Has Documents: Yes</p>
               </li>) : (<li>
                    <p>Has Documents: No</p>
               </li>)}
            </ul>
            <div className='flex-container'>
                <div>
                        <button className='btn btn-dark btn-sm' onClick={() => onEdit()}>Edit</button>
                        <button name='delete' className='btn btn-danger btn-sm' onClick={() => onDelete()}>Delete</button>
                </div>
                <Link className='btn btn-light btn-sm' to='/profile' >More info</Link>
            </div>

        </div>
    )
}

LicenseItem.propTypes = {
    license: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    license: state.license
  });

export default connect(mapStateToProps, { deleteLicense, clearCurrent, setCurrent, })(LicenseItem);