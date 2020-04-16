import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./store";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import App from "./App";
import {routerMiddleware} from "react-router-redux"
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export const store = createStore(
  reducer,
  applyMiddleware(thunk, routerMiddleware(history))
);


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

// import React from "react"
// import ReactDOM from "react-dom"
// import App from "./App"

// ReactDOM.render(
//   <App/>,
//   document.getElementById('root')
// )
