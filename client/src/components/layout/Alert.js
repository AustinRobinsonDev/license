

const Alerts = () => {

    return (
        alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</div>
        ))
    )
}

export default Alerts