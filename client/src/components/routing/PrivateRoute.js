import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
const PrivateRoute = ({
    auth,
    redirectPath = '/login',
    children
  }) => {
    const isAuth = localStorage.token;
    const renderComponents = () => {
      console.log("Pr auth: " + auth.isAuthenticated)
      return isAuth ? children : <Navigate to={redirectPath} replace /> 
    }
    return renderComponents();
  };

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);