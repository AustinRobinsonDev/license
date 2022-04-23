import PropTypes from 'prop-types';
import { deleteLicense, clearCurrent, setCurrent } from '../../actions/licenseActions'
import { connect } from 'react-redux';
const LicenseItem = ({setAction, deleteLicense, clearCurrent, setCurrent, licenseItem }) => {
    const onDelete = async () => {
        setAction('delete');
        await deleteLicense(licenseItem._id);
        clearCurrent();
        setAction('clear delete');
    }
    const onEdit = () => {
        setCurrent(licenseItem);
        setAction('edit');
    }

    return (
        <div className="card bg-light">
           <h3 className="text-primary text-left">
               {licenseItem.name}{' '} 
               <span style={{ float: 'right'}}
                className={'badge ' + (licenseItem.type === 'professional' ? 'badge-success' : 'badge-primary')}>{licenseItem.type ? licenseItem.type.charAt(0).toUpperCase() + licenseItem.type.slice(1) : ""}
               </span>
           </h3> 
           <ul className="list text-primary">
               {licenseItem.name && 
               (<li>
                    {licenseItem.name}
               </li>)}
               {licenseItem.email && 
               (<li>
                    {licenseItem.email}
               </li>)}
               {licenseItem.phone && 
               (<li>
                    {licenseItem.phone}
               </li>)}
           </ul>
           <p>
               <button className='btn btn-dark btn-sm' onClick={() => onEdit()}>Edit</button>
               <button name='delete' className='btn btn-danger btn-sm' onClick={() => onDelete()}>Delete</button>
           </p>
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