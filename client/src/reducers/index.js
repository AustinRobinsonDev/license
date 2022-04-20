import { combineReducers } from 'redux';
 import licenseReducer from './licenseReducer';
 import authReducer from './authReducer';
 import alertReducer from './alertReducer';
export default combineReducers({ license: licenseReducer, auth: authReducer, alert: alertReducer });