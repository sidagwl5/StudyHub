import { GET_SPECIFIC_UPLOAD, LOGOUT_SUCCESS, NOT_RECOGNIZED } from '../types';

const initialState = {
    allFilesData: [],
    specificFileData: null
}

export default (state=initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case GET_SPECIFIC_UPLOAD:
            return { ...state, specificFileData: payload };

        case LOGOUT_SUCCESS, NOT_RECOGNIZED:
            return null;    
    
        default:
            return state;
    }
}