import { connect } from 'react-redux';
const Alerts = ({alert}) => {
    return (
        
         alert.length > 0 && alert.map(alerts => (
            <div key={alert.id} className={`alert alert-${alerts.type}` }>
                <h3 className='text-center'>{alerts.msg.charAt(0).toUpperCase() + alerts.msg.slice(1)}</h3>

            </div>
        ))
    )
}

const mapStateToProps = state => ({
    alert: state.alert
})

export default connect(mapStateToProps)(Alerts)