import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <div>
            <Route { ...rest} render={props => !isAuthenticated && !loading ? (
                <Redirect to='/login' />
            ) : (<Component {...props} /> )} />
        </div>
    )
}

export default PrivateRoute