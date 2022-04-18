import { combineReducers } from 'redux';
 import licenseReducer from './licenseReducer';
export default combineReducers({ license: licenseReducer });