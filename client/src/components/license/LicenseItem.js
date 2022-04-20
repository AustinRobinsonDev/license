import PropTypes from 'prop-types';
import { deleteLicense, clearCurrent, setCurrent } from '../../actions/licenseActions'
import { connect } from 'react-redux';

const LicenseItem = (props, { licenses: { current }}) => {
    const { _id, name, email, phone, type} = props.license;

    const onDelete = () => {
        deleteLicense(_id);
        clearCurrent();
    }
    const onEdit = () => {
        if (current !== null) {
            console.log('item', current)
        }
    }

    return (
        <div className="card bg-light">
           <h3 className="text-primary text-left">
               {name}{' '} 
               <span style={{ float: 'right'}}
                className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>{type.charAt(0).toUpperCase() + type.slice(1)}
               </span>
           </h3> 
           <ul className="list">
               {name && (<li>
                    {name}
               </li>)}
               {email && (<li>
                    {email}
               </li>)}
               {phone && (<li>
                    {phone}
               </li>)}
           </ul>
           <p>
               <button className='btn btn-dark btn-sm' onClick={() => {
                   setCurrent(props.license);
                    onEdit();
                   }}>Edit</button>
               <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
           </p>
        </div>
    )
}

LicenseItem.propTypes = {
    license: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    licenses: state.licenses
  });

export default connect(mapStateToProps, { deleteLicense, clearCurrent, setCurrent, })(LicenseItem);