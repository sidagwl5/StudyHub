import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import history from "./utils/createHistory";
import store from "./store";
import Loader from "./sharedComponents/presentation/loader";
import Alert from "./sharedComponents/container/alert";
import Routes from './utils/routes';

const App = () => {
 
  return (
    <Provider store={store}>
      <Router history={history}>
        <Alert />
          <Routes />
        <Loader />
      </Router>
    </Provider>
  );
};

export default App;
