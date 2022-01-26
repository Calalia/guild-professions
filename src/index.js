import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "./utils/redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas";
import * as reducers from "./ducks/index";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, [sagaMiddleware]);
sagaMiddleware.run(mySaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
