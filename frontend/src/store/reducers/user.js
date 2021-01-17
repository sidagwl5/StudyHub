import { LOGIN_SUCCESS, LOGOUT_SUCCESS, NOT_RECOGNIZED } from '../types';

export default (state=null, action) => {

    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return payload;

        case LOGOUT_SUCCESS, NOT_RECOGNIZED:
            return null;    
    
        default:
            return state;
    }
}