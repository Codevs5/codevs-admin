import * as c from '../constants/statusTypes.js';

const defaultInitState = {
    error: false,
    loading: true,
    updated: c.NOT_UPDATING,
    errorMessage: '',
    loadingImage: false,
    logged: c.NOT_LOGGING
};

export default function statusReducer(state = defaultInitState, action) {
    switch (action.type) {
        case c.START_LOADING:
            return {
                ...state,
                loading: true
            };
        case c.FETCHING_REJECTED:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload
            };
        case c.FETCHING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false
            };
        case c.UPDATE_START:
            return {
                ...state,
                loading: true
            };
        case c.UPDATE_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                updated: c.UPDATED
            };
        case c.UPDATE_REJECTED:
            return {
                ...state,
                loading: false,
                updated: c.ERROR_UPDATED,
                errorMessage: action.payload
            };
        case c.UPLOAD_IMAGE:
            return {
                ...state,
                loadingImage: true
            };
        case c.UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                updated: c.UPDATED,
                loadingImage: false
            };
        case c.UPLOAD_IMAGE_REJECTED:
            return {
                ...state,
                updated: c.ERROR_UPDATED,
                loadingImage: false,
                errorMessage: action.payload
            };
        case c.LOG_OUT:
            return {
                ...state,
                logged: c.NOT_LOGGED,
                loading: false
            };
        case c.LOG_IN:
            return {
                ...state,
                logged: c.LOGGED,
                loading: false
            }
        case c.UPDATE_RESET:
            return {
                ...state,
                updated: c.NOT_UPDATING
            };
        default:
            return state;

    }
}
