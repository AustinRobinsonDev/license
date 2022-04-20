import { GET_LICENSES, 
        SET_LOADING, 
        LICENSE_ERROR, 
        ADD_LICENSE, 
        UPDATE_LICENSE,
        DELETE_LICENSE,
        CLEAR_LICENSE,
        SET_CURRENT,
        CLEAR_CURRENT,
        FILTER_LICENSES,
        CLEAR_FILTER } from '../actions/types';

const initialState = {
    licenses: null,
    current: null,
    loading: false,
    filtered: null,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_LICENSES:
            return {
                ...state,
                licences: action.payload,
                loading: false
            }
        case ADD_LICENSE:
            return {
                ...state,
                liceses: [...state.licenses, action.payload],
                loading: false
            }
        case UPDATE_LICENSE:
            return {
                ...state,
                licenses: state.licenses.map(license => license._id === action.payload._id ? action.payload : license),
                loading: false
            }
        case DELETE_LICENSE:
            return {
                ...state,
                license: state.license.filter(license => license._id !== action.payload),
                loading: false
            };
        case CLEAR_LICENSE:
            return {
                ...state,
                licenses: null,
                filtered: null,
                current: null,
                error: null
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_LICENSES:
            return {
                ...state,
                filtered: state.licenses.filter(license => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return license.name.match(regex) || license.email.match(regex)
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
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