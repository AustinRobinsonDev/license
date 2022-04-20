import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, license: {isAuthenticated, loading}, ...rest  }) => {

    return (
        <div>
        <Switch>
            <Route { ...rest} render={props => !isAuthenticated && !loading ? (
                <Redirect from='/' to='/login' />
            ) : (<Component {...props} /> )} />
        </Switch>
        </div>
    )
}

const mapStateToProps = state => ({
    license: state.license
});

export default connect(mapStateToProps,{})(PrivateRoute)