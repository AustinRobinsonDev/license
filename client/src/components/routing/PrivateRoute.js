import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest  }) => {
    let history = useHistory();
    if(!auth.isAuthenticated) {
        history.push('/login')
    }
    console.log("auth: " + auth.isAuthenticated)
    return (
        <div>
        <Switch>
            <Route { ...rest} render={props => !auth.isAuthenticated && !auth.loading ? (
                <Redirect push to='/login' />
            ) : (<Component {...props} /> )} />
        </Switch>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);