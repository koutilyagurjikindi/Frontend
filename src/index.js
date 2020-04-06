import ReactDOM from "react-dom";
import { Provider } from "react-redux"
import React from "react";
import { createStore } from "redux";
import App from "./App"

const defaultstate = {
  appName:"conduit",
  articles:null
};

const reducer = function (state = defaultstate, action) {
  return {...state}
};

const store = createStore(reducer);


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
