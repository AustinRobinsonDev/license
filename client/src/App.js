import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from './components/routing/PrivateRoute';
import Home from './pages/Home';
//import Alert from './components/layout/Alert'
import About from './pages/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import store from './store';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token){
  setAuthToken(localStorage.token)
} 

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <>
      <Navbar />

        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </>
    </Router>

    </Provider>
  );
}

export default App;