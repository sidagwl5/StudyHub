import store from '../store';
import { SET_LOADER, UNSET_LOADER } from '../store/types';

const dispatch = store.dispatch;

const interceptors = (axios) => {
  axios.interceptors.request.use(
    (request) => {
      request.withCredentials = true;

      dispatch({ type: SET_LOADER });
      return request;
    },
    (err) => {

      dispatch({ type: UNSET_LOADER });
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response) => {

      console.log(response);
      dispatch({ type: UNSET_LOADER });
      return response;
    },
    (err) => {

      dispatch({ type: UNSET_LOADER });
      return Promise.reject(err);
    }
  );
};

export default interceptors;
