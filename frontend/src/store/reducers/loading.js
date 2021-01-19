import { SET_LOADER, UNSET_LOADER } from '../types';

export default (state=false, action) => {

    const { type } = action;

    switch (type) {
        case SET_LOADER:
            return true;

        case UNSET_LOADER:
            return false;    
    
        default:
            return state;
    }
}