import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import About from './pages/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './store';
const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <>
        <Navbar />
        <Routes>
          <PrivateRoute exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </>
    </Router>

    </Provider>
  );
}

export default App;