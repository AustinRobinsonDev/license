import {GET_LICENSES, 
        DELETE_LICENSE, 
        UPDATE_LICENSE,
        FILTER_LICENSES,
        SET_LOADING, 
        LICENSE_ERROR, 
        ADD_LICENSE, 
        CLEAR_LICENSE, 
        CLEAR_CURRENT,
        CLEAR_FILTER, 
        SET_CURRENT } from './types';
import axios from 'axios'

export const getLicenses = () => async dispatch => {
        try {
            setLoading();
            const res = await axios.get('/api/licenses');
            dispatch({
                type: GET_LICENSES,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: LICENSE_ERROR,
                payload: err.response
            })
        }
}
export const addLicense = (license) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        setLoading();
        const res = await axios.post('/api/licenses', license, config);
        dispatch({
            type: ADD_LICENSE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LICENSE_ERROR,
            payload: err.response
        })
    }
}
export const deleteLicense = (id) => async dispatch => {
    try {
        setLoading();
        await axios.delete(`/api/licenses/${id}`);
        dispatch({
            type: DELETE_LICENSE,
            payload: id
        });
    } catch (err) { 
        dispatch({
            type: LICENSE_ERROR,
            payload: err.response
        })
    }
}
export const updateLicense = (license) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        setLoading();
        const res = await axios.put(`/api/licenses/${license._id}`, license, config);
        dispatch({
            type: UPDATE_LICENSE,
            payload: res.data
        });    
    } catch (err) {
        dispatch({
            type: LICENSE_ERROR,
            payload: err.response
        })
    }
}
export const filterLicenses = (text) => async dispatch => {
    try {
        dispatch({
            type: FILTER_LICENSES,
            payload: text
        });   
    } catch (err) {
        dispatch({
            type: LICENSE_ERROR,
            payload: err.response
        })
    }

}
export const setCurrent = (license) => async dispatch => {
    dispatch({
        type: SET_CURRENT,
        payload: license
    });   
}
export const clearCurrent = (text) => async dispatch => {
    dispatch({
        type: CLEAR_CURRENT,
        payload: text
    });
}
export const clearLicense = () => async dispatch => {
    dispatch({
        type: CLEAR_LICENSE
    });
}
export const clearFilter = () => async dispatch => {
    dispatch({
        type: CLEAR_FILTER
    });
}
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}
