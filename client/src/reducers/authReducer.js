import {REGISTER_SUCCESS,
        REGISTER_FAIL,
        USER_LOADED,
        LOGIN_SUCCESS,
        AUTH_ERROR,
        LOGIN_FAIL,
        LOGOUT,
        CLEAR_ERRORS } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: []
    };

export default (state = initialState, action) => {
        switch(action.type) {
            case USER_LOADED:
                return {
                    ...state,
                    isAuthenticated: true,
                    loading: false,
                    user: action.payload
                }
            case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
                localStorage.setItem('token', action.payload.token);
                return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    loading: false
                }
            case REGISTER_FAIL:
            case AUTH_ERROR:
            case LOGIN_FAIL:
            case LOGOUT:
                localStorage.removeItem('token');
                return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                    user: null,
                    error: action.payload
                }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }
            default: 
            return state;
        }
      }
