import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
