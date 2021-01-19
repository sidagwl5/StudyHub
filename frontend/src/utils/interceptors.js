import store from '../store';
import { SET_LOADER, UNSET_LOADER } from '../store/types';

const dispatch = store.dispatch;

const interceptors = (axios) => {
  axios.interceptors.request.use(
    (request) => {
      request.withCredentials = true;

      dispatch({ type: SET_LOADER });

      console.log(request);
      return request;
    },
    (err) => {

      dispatch({ type: UNSET_LOADER });
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response) => {

      dispatch({ type: UNSET_LOADER });
      return Promise.resolve(response);
    },
    (err) => {

      dispatch({ type: UNSET_LOADER });
      return Promise.reject(err);
    }
  );
};

export default interceptors;
