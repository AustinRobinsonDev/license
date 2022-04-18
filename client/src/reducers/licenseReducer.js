import { GET_LICENCES, SET_LOADING, LICENSE_ERROR } from '../actions/types';

const initialState = {
    licenses: null,
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_LICENCES:
            return {
                ...state,
                licences: action.payload,
                loading: false
            }
        case SET_LOADING: 
            return {
                ...state,
                loading: true
            }
        case LICENSE_ERROR: 
            console.error(action.payload);
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}