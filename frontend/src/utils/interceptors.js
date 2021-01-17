const interceptors = (axios) => {
  axios.interceptors.request.use(
    (request) => {
      request.withCredentials = true;

      return request;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};

export default interceptors;
