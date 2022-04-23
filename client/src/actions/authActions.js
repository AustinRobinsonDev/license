import {REGISTER_SUCCESS,
        REGISTER_FAIL,
        USER_LOADED,
        LOGIN_SUCCESS,
        AUTH_ERROR,
        LOGIN_FAIL,
        LOGOUT,
        CLEAR_ERRORS } from '../actions/types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
export const loadUser = () => async dispatch => {
    setAuthToken(localStorage.token);

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
};
 
export const register = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post('/api/users', formData, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        loadUser();
    } catch (err) {
        console.log("register fail")
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
        });
    }
};

export const login = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post('/api/auth', formData, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        loadUser();
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        });
    }
};

export const logout = () => dispatch => dispatch({ type: LOGOUT });

export const clearErrors = () => dispatch => dispatch({ type: CLEAR_ERRORS });