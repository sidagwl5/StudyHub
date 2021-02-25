import store from '../store';
import { SET_LOADER, UNSET_LOADER } from '../store/types';

let countRequest = 0;
const dispatch = store.dispatch;

const interceptors = (axios) => {
  axios.interceptors.request.use(
    (request) => {
      request.withCredentials = true;

      dispatch({ type: SET_LOADER, payload: ++countRequest });
      return request;
    },
    (err) => {

      dispatch({ type: UNSET_LOADER, payload: --countRequest });
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response) => {

      console.log(response);
      dispatch({ type: UNSET_LOADER, payload: --countRequest });
      return response;
    },
    (err) => {

      dispatch({ type: UNSET_LOADER, payload: --countRequest });
      return Promise.reject(err);
    }
  );
};

export default interceptors;
