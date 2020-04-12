import { Provider, Reac } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./store";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import { routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history";
import { ConnectedRouter } from 'connected-react-router'


const history = createBrowserHistory()

export const store = createStore(reducer(history), applyMiddleware(thunk,routerMiddleware(history)));

const StoreContext = React.createContext(null);

ReactDOM.render(
  <Provider store={store} context={StoreContext}>
        <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
      </ConnectedRouter>
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