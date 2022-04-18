import { GET_LICENCES, SET_LOADING, LICENSE_ERROR } from './types';
import axios from 'axios'

export const getLogs = () => async dispatch => {

        try {
            // change to mongo DB get request axios
            setLoading();
            const res = await axios.get('/api/waypoints');
            dispatch({
                type: GET_LICENCES,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: LICENSE_ERROR,
                payload: err.response.data
            })
        }

  
}

export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}
